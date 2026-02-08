/*
  # Create Leads Table for Calvia Real Estate

  1. New Types
    - `lead_type` enum with values 'buyer' and 'seller'

  2. New Tables
    - `leads`
      - `id` (uuid, primary key, auto-generated)
      - `type` (lead_type enum: buyer or seller)
      - `details` (jsonb, stores all form fields: name, email, phone, village, budget/price, property type, features, timeline, notes, etc.)
      - `lead_score` (integer, nullable, computed after insert)
      - `ref_code` (text, unique, auto-generated referral code)
      - `created_at` (timestamptz, default now())

  3. Security
    - Enable RLS on `leads` table
    - Add INSERT-only policy for anonymous users (so the public form can submit leads)
    - No SELECT/UPDATE/DELETE policies for anonymous users (data is protected)

  4. Functions
    - `generate_ref_code()` trigger function to auto-generate a unique short referral code on insert
    - `compute_lead_score()` trigger function to auto-score leads based on budget, timeline, and data completeness

  5. Notes
    - Budget minimum filter (300k) is enforced on the frontend; the database accepts all values for flexibility
    - Lead scoring: Immediate timeline = 30pts, 1-3 months = 25pts, 3-6 months = 15pts, 6-12 months = 5pts, just browsing = 0pts
    - Budget scoring: 2M+ = 40pts, 1M-2M = 30pts, 500k-1M = 20pts, 300k-500k = 10pts
    - Completeness: each filled optional field adds 2pts (up to ~30pts)
*/

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_type') THEN
    CREATE TYPE lead_type AS ENUM ('buyer', 'seller');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type lead_type NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  lead_score integer,
  ref_code text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous lead submissions"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated lead submissions"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION generate_ref_code()
RETURNS TRIGGER AS $$
DECLARE
  new_code text;
  code_exists boolean;
BEGIN
  LOOP
    new_code := 'REF-' || upper(substr(md5(random()::text), 1, 6));
    SELECT EXISTS(SELECT 1 FROM leads WHERE ref_code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  NEW.ref_code := new_code;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_ref_code ON leads;
CREATE TRIGGER trigger_generate_ref_code
  BEFORE INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION generate_ref_code();

CREATE OR REPLACE FUNCTION compute_lead_score()
RETURNS TRIGGER AS $$
DECLARE
  score integer := 0;
  budget_val numeric;
  timeline_val text;
  details_obj jsonb;
BEGIN
  details_obj := NEW.details;

  IF NEW.type = 'buyer' THEN
    budget_val := COALESCE((details_obj->>'budget')::numeric, 0);
  ELSE
    budget_val := COALESCE((details_obj->>'askingPrice')::numeric, 0);
  END IF;

  IF budget_val >= 2000000 THEN
    score := score + 40;
  ELSIF budget_val >= 1000000 THEN
    score := score + 30;
  ELSIF budget_val >= 500000 THEN
    score := score + 20;
  ELSIF budget_val >= 300000 THEN
    score := score + 10;
  END IF;

  timeline_val := COALESCE(details_obj->>'timeline', '');
  IF timeline_val = 'Immediate' THEN
    score := score + 30;
  ELSIF timeline_val = '1-3 Months' THEN
    score := score + 25;
  ELSIF timeline_val = '3-6 Months' THEN
    score := score + 15;
  ELSIF timeline_val = '6-12 Months' THEN
    score := score + 5;
  END IF;

  IF details_obj->>'name' IS NOT NULL AND details_obj->>'name' != '' THEN score := score + 2; END IF;
  IF details_obj->>'email' IS NOT NULL AND details_obj->>'email' != '' THEN score := score + 2; END IF;
  IF details_obj->>'phone' IS NOT NULL AND details_obj->>'phone' != '' THEN score := score + 2; END IF;
  IF details_obj->>'village' IS NOT NULL AND details_obj->>'village' != '' THEN score := score + 2; END IF;
  IF details_obj->'propertyType' IS NOT NULL AND jsonb_array_length(details_obj->'propertyType') > 0 THEN score := score + 2; END IF;
  IF details_obj->'features' IS NOT NULL AND jsonb_array_length(details_obj->'features') > 0 THEN score := score + 2; END IF;
  IF details_obj->>'notes' IS NOT NULL AND details_obj->>'notes' != '' THEN score := score + 2; END IF;

  NEW.lead_score := score;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_compute_lead_score ON leads;
CREATE TRIGGER trigger_compute_lead_score
  BEFORE INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION compute_lead_score();
