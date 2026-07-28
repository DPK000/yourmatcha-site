-- ─── WEEK 1 FIXES ───────────────────────────────────────────
-- Voer dit uit in de Supabase SQL editor (of via `supabase db push`).
-- 1) Kortingscode-validatie via RPC (veilig: geen publieke read op discount_codes nodig)
-- 2) Teller voor gebruikte kortingscodes (alleen service role)

-- ─── 1. VALIDATE DISCOUNT CODE (RPC) ────────────────────────
-- Exacte match op code; geeft alleen iets terug als de code geldig is.
-- Security definer zodat anon geen select op de tabel zelf nodig heeft.
create or replace function public.validate_discount_code(p_code text)
returns table (
  code           text,
  discount_type  text,
  discount_value numeric,
  min_order      numeric
)
language sql
security definer
set search_path = public
stable
as $$
  select dc.code, dc.discount_type, dc.discount_value, coalesce(dc.min_order, 0)
  from public.discount_codes dc
  where upper(dc.code) = upper(trim(p_code))
    and dc.enabled
    and (dc.expires_at is null or dc.expires_at > now())
    and (dc.max_uses is null or dc.uses < dc.max_uses);
$$;

grant execute on function public.validate_discount_code(text) to anon, authenticated;

-- ─── 2. INCREMENT USES (alleen backend) ─────────────────────
create or replace function public.increment_discount_uses(p_code text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.discount_codes
  set uses = uses + 1
  where upper(code) = upper(p_code);
$$;

revoke execute on function public.increment_discount_uses(text) from public, anon, authenticated;

-- ─── 3. RLS AANSCHERPEN ─────────────────────────────────────
-- Voorheen stond bijna alles op using(true): orders (met klantgegevens),
-- kortingscodes en nieuwsbrief waren publiek leesbaar via de anon key.
-- Nieuw model:
--   - Storefront (anon): alleen products lezen, nieuwsbrief/partner inserts,
--     kortingscode valideren via RPC hierboven.
--   - Admin-paneel: Supabase-auth (authenticated role).
--   - Checkout/orders: edge functions met service role (bypassen RLS).
-- LET OP: maak eerst een admin-gebruiker aan in Supabase Dashboard →
-- Authentication → Users → Add user, anders kun je niet meer in het admin-paneel.

-- Products: publiek lezen blijft, schrijven alleen ingelogd
drop policy if exists "Admin write products" on public.products;
drop policy if exists "Auth write products" on public.products;
create policy "Auth write products" on public.products
  for all to authenticated using (true) with check (true);

-- Orders: niet meer publiek; inserts lopen via edge functions (service role)
drop policy if exists "Public read orders" on public.orders;
drop policy if exists "Public insert orders" on public.orders;
drop policy if exists "Admin update orders" on public.orders;
drop policy if exists "Admin delete orders" on public.orders;
drop policy if exists "Auth read orders" on public.orders;
create policy "Auth read orders" on public.orders for select to authenticated using (true);
drop policy if exists "Auth update orders" on public.orders;
create policy "Auth update orders" on public.orders for update to authenticated using (true);
drop policy if exists "Auth delete orders" on public.orders;
create policy "Auth delete orders" on public.orders for delete to authenticated using (true);

-- Order items: idem
drop policy if exists "Public read order_items" on public.order_items;
drop policy if exists "Public insert order_items" on public.order_items;
drop policy if exists "Admin delete order_items" on public.order_items;
drop policy if exists "Auth read order_items" on public.order_items;
create policy "Auth read order_items" on public.order_items for select to authenticated using (true);
drop policy if exists "Auth delete order_items" on public.order_items;
create policy "Auth delete order_items" on public.order_items for delete to authenticated using (true);

-- Activity log: alleen admin + service role
drop policy if exists "Full access order_activity_log" on public.order_activity_log;
drop policy if exists "Auth all order_activity_log" on public.order_activity_log;
create policy "Auth all order_activity_log" on public.order_activity_log
  for all to authenticated using (true) with check (true);

-- Kortingscodes: niet meer publiek leesbaar (validatie via RPC)
drop policy if exists "Public read discount_codes" on public.discount_codes;
drop policy if exists "Admin write discount_codes" on public.discount_codes;
drop policy if exists "Auth all discount_codes" on public.discount_codes;
create policy "Auth all discount_codes" on public.discount_codes
  for all to authenticated using (true) with check (true);

-- Nieuwsbrief: publiek inschrijven blijft, lezen alleen ingelogd
drop policy if exists "Admin read newsletter" on public.newsletter_subscribers;
drop policy if exists "Auth read newsletter" on public.newsletter_subscribers;
create policy "Auth read newsletter" on public.newsletter_subscribers
  for select to authenticated using (true);
drop policy if exists "Auth write newsletter" on public.newsletter_subscribers;
create policy "Auth write newsletter" on public.newsletter_subscribers
  for update to authenticated using (true);
drop policy if exists "Auth delete newsletter" on public.newsletter_subscribers;
create policy "Auth delete newsletter" on public.newsletter_subscribers
  for delete to authenticated using (true);

-- Partner-aanvragen: publiek insturen blijft, lezen alleen ingelogd
drop policy if exists "Admin read partners" on public.partner_applications;
drop policy if exists "Auth read partners" on public.partner_applications;
create policy "Auth read partners" on public.partner_applications
  for select to authenticated using (true);

-- Verzendzones: publiek lezen blijft, schrijven alleen ingelogd
drop policy if exists "Admin write shipping_zones" on public.shipping_zones;
drop policy if exists "Auth write shipping_zones" on public.shipping_zones;
create policy "Auth write shipping_zones" on public.shipping_zones
  for all to authenticated using (true) with check (true);

-- Valuta-instellingen: publiek lezen blijft, schrijven alleen ingelogd
drop policy if exists "Auth write currency_settings" on public.currency_settings;
create policy "Auth write currency_settings" on public.currency_settings
  for all to authenticated using (true) with check (true);

-- ─── 4. BESTAANDE CODES BEHOUDEN ────────────────────────────
-- Deze stonden voorheen hardcoded in de frontend; nu via de DB.
insert into public.discount_codes (code, discount_type, discount_value, min_order)
values
  ('MATCHA10', 'percentage', 10, 0),
  ('WELKOM5', 'fixed', 5, 0)
on conflict (code) do nothing;
