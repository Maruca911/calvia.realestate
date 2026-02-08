/*
  # Fix Auth DB Connection Strategy

  1. Configuration Change
    - Switch Auth DB connection strategy from fixed number to percentage-based allocation
    - This allows the connection pool to scale automatically with instance size

  2. Changes Made
    - Update auth.config to use percentage-based connection allocation
    - Set to 10% of total available connections (recommended default)

  3. Important Notes
    - Percentage-based allocation scales automatically with database instance upgrades
    - This prevents connection pool exhaustion as traffic grows
    - The default 10% provides good balance for typical workloads
*/

-- Configure Auth to use percentage-based connection pooling
-- This updates the gotrue configuration to use a percentage of available connections
DO $$
BEGIN
  -- Check if the auth schema and config table exist
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'config') THEN
    -- Update auth config to use percentage-based connections (10%)
    UPDATE auth.config 
    SET db_pool_size = NULL,
        db_pool_percentage = 10
    WHERE true;
  END IF;
END $$;