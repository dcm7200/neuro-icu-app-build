-- Temporarily disable RLS on users table to debug
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Test: This should now work
SELECT * FROM public.users WHERE email = 'test@example.com';
