-- ============================================================
-- SECURITY + CURRENCY FIX — uitvoeren in Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/exniwwddrdreihvwjokq/sql
-- ============================================================

-- 1) Currency kolom toevoegen aan orders (nodig voor NOK betalingen)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'EUR';

-- 2) RLS fix: verwijder publieke leestoegang tot bestellingen (GDPR)
DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Public read order_items" ON public.order_items;

-- Orders: alleen de service_role mag lezen + beheren
-- (checkout-flow schrijft via service_role in Edge Functions)
CREATE POLICY "Service read orders" ON public.orders
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Service read order_items" ON public.order_items
  FOR SELECT USING (auth.role() = 'service_role');

-- 3) Controleer of het gelukt is
SELECT
  column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'orders' AND column_name = 'currency';

SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('orders','order_items')
ORDER BY tablename, policyname;
