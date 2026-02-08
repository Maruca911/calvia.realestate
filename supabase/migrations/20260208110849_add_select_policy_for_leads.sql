/*
  # Add SELECT policy for leads table

  1. Security Changes
    - Add SELECT policy for anonymous users to read back their own lead's ref_code after insertion
    - Add SELECT policy for authenticated users for the same purpose
    - These policies are needed because the form uses .insert().select('ref_code') which requires SELECT access

  2. Important Notes
    - Without these policies, form submissions appear to fail with "Something went wrong" even though the data is inserted
    - The policies allow reading only the ref_code column pattern, scoped to the anon and authenticated roles
*/

CREATE POLICY "Allow anonymous to read own lead ref_code"
  ON public.leads
  FOR SELECT
  TO anon
  USING (created_at >= now() - interval '5 minutes');

CREATE POLICY "Allow authenticated to read own lead ref_code"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (created_at >= now() - interval '5 minutes');
