/*
  # Fix Security Issues

  1. Security Improvements
    - Fix function search_path mutability for `generate_ref_code()` and `compute_lead_score()`
    - Replace overly permissive RLS policies with validated INSERT policies
    - Add proper validation to ensure data integrity and prevent abuse

  2. Changes Made
    - Add `SET search_path = ''` to both functions to prevent search path manipulation
    - Drop and recreate INSERT policies with proper validation checks:
      - Ensure type field is valid (buyer or seller)
      - Ensure details is a valid jsonb object
      - Ensure required fields exist in details
    - Keep SELECT policies as-is (they're already properly scoped by time window)

  3. Important Notes
    - Functions now explicitly reference schema-qualified objects
    - INSERT policies validate data structure before allowing insertion
    - This prevents malformed data and potential injection attacks
*/

-- Drop existing INSERT policies
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated lead submissions" ON public.leads;

-- Create new INSERT policies with proper validation
CREATE POLICY "Allow anonymous lead submissions with validation"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (
    type IN ('buyer', 'seller')
    AND details IS NOT NULL
    AND jsonb_typeof(details) = 'object'
    AND details->>'email' IS NOT NULL
    AND details->>'email' != ''
  );

CREATE POLICY "Allow authenticated lead submissions with validation"
  ON public.leads
  FOR INSERT
  TO authenticated
  WITH CHECK (
    type IN ('buyer', 'seller')
    AND details IS NOT NULL
    AND jsonb_typeof(details) = 'object'
    AND details->>'email' IS NOT NULL
    AND details->>'email' != ''
  );

-- Fix function search_path mutability for generate_ref_code
CREATE OR REPLACE FUNCTION public.generate_ref_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  new_code text;
  code_exists boolean;
BEGIN
  LOOP
    new_code := 'REF-' || upper(substr(md5(random()::text), 1, 6));
    SELECT EXISTS(SELECT 1 FROM public.leads WHERE ref_code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  NEW.ref_code := new_code;
  RETURN NEW;
END;
$$;

-- Fix function search_path mutability for compute_lead_score
CREATE OR REPLACE FUNCTION public.compute_lead_score()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;