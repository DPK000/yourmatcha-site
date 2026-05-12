-- ============================================================
-- E-Commerce Starter — Supabase Schema
-- Run this in your Supabase SQL Editor to set up all tables
-- ============================================================

-- ─── EXTENSIONS ─────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─── PRODUCTS TABLE ─────────────────────────────────────────
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text not null unique,
  category        text not null check (category in ('main', 'accessories', 'bundle')),
  price           numeric(10,2) not null,
  original_price  numeric(10,2),
  image           text not null,
  description     text not null default '',
  short_description text not null default '',
  rating          numeric(3,1) not null default 4.5,
  review_count    integer not null default 0,
  badge           text,
  in_stock        boolean not null default true,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ─── ORDERS TABLE ───────────────────────────────────────────
create table if not exists public.orders (
  id                 uuid primary key default gen_random_uuid(),
  order_number       text not null unique,
  email              text not null,
  first_name         text not null,
  last_name          text not null,
  address            text not null,
  city               text not null,
  postal_code        text not null,
  country            text not null default 'NL',
  phone              text,
  status             text not null default 'pending'
                       check (status in ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  payment_method     text,
  payment_intent_id  text,
  paypal_order_id    text,
  paypal_capture_id  text,
  subtotal           numeric(10,2) not null default 0,
  shipping           numeric(10,2) not null default 0,
  discount_amount    numeric(10,2) default 0,
  discount_code      text,
  total              numeric(10,2) not null default 0,
  notes              text,
  tracking_code      text,
  tracking_carrier   text,
  refund_reason      text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz
);

-- ─── ORDER_ITEMS TABLE ──────────────────────────────────────
create table if not exists public.order_items (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid not null references public.orders(id) on delete cascade,
  product_id     uuid,
  product_name   text not null,
  product_image  text not null default '',
  price          numeric(10,2) not null,
  quantity       integer not null default 1,
  created_at     timestamptz not null default now()
);

-- ─── ORDER_ACTIVITY_LOG TABLE ───────────────────────────────
create table if not exists public.order_activity_log (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  action      text not null,
  description text not null,
  created_at  timestamptz not null default now()
);

-- ─── ADMIN_USERS TABLE ──────────────────────────────────────
create table if not exists public.admin_users (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ─── DISCOUNT_CODES TABLE ───────────────────────────────────
create table if not exists public.discount_codes (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,
  discount_type   text not null default 'percentage' check (discount_type in ('percentage','fixed','free_shipping')),
  discount_value  numeric(10,2) not null,
  min_order       numeric(10,2) default 0,
  max_uses        integer,
  uses            integer not null default 0,
  enabled         boolean not null default true,
  expires_at      timestamptz,
  created_at      timestamptz not null default now()
);

-- ─── SHIPPING_ZONES TABLE ───────────────────────────────────
create table if not exists public.shipping_zones (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  country_codes     text[] not null default '{}',
  shipping_cost_eur numeric(10,2) not null default 0,
  free_threshold_eur numeric(10,2),
  estimated_days_min int not null default 1,
  estimated_days_max int not null default 3,
  tax_rate          numeric(5,2) not null default 21,
  tax_included      boolean default true,
  is_enabled        boolean default true,
  sort_order        int default 0,
  created_at        timestamptz default now()
);

-- ─── CURRENCY_SETTINGS TABLE ────────────────────────────────
create table if not exists public.currency_settings (
  id              uuid primary key default gen_random_uuid(),
  currency_code   text unique not null,
  currency_symbol text not null,
  exchange_rate   numeric(10,6) not null default 1.0,
  rounding_mode   text default 'x.95' check (rounding_mode in ('x.95','x.99','round','none')),
  enabled         boolean default true,
  updated_at      timestamptz default now()
);

-- ─── NEWSLETTER_SUBSCRIBERS TABLE ───────────────────────────
create table if not exists public.newsletter_subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text not null unique,
  name         text,
  source       text default 'footer',
  subscribed   boolean default true,
  created_at   timestamptz not null default now()
);

-- ─── PARTNER_APPLICATIONS TABLE ─────────────────────────────
create table if not exists public.partner_applications (
  id              uuid primary key default gen_random_uuid(),
  type            text not null,
  first_name      text not null,
  last_name       text not null,
  email           text not null,
  city            text,
  country         text,
  company_name    text,
  website         text,
  motivation      text,
  status          text default 'pending' check (status in ('pending','approved','rejected')),
  created_at      timestamptz default now()
);

-- ─── ENABLE RLS ─────────────────────────────────────────────
alter table public.products              enable row level security;
alter table public.orders                enable row level security;
alter table public.order_items           enable row level security;
alter table public.order_activity_log    enable row level security;
alter table public.admin_users           enable row level security;
alter table public.discount_codes        enable row level security;
alter table public.shipping_zones        enable row level security;
alter table public.currency_settings     enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.partner_applications  enable row level security;

-- ─── RLS POLICIES ───────────────────────────────────────────
-- NOTE: These are permissive demo policies. For production, restrict
-- write access to service_role and authenticated users only.

-- Products: public read, admin write
create policy "Public read products" on public.products for select using (true);
create policy "Admin write products" on public.products for all using (true);

-- Orders: public read + insert (checkout creates orders), admin update/delete
create policy "Public read orders" on public.orders for select using (true);
create policy "Public insert orders" on public.orders for insert with check (true);
create policy "Admin update orders" on public.orders for update using (true);
create policy "Admin delete orders" on public.orders for delete using (true);

-- Order items: public read + insert
create policy "Public read order_items" on public.order_items for select using (true);
create policy "Public insert order_items" on public.order_items for insert with check (true);
create policy "Admin delete order_items" on public.order_items for delete using (true);

-- Activity log: full access (demo)
create policy "Full access order_activity_log" on public.order_activity_log for all using (true);

-- Discount codes: public read (checkout validates), admin write
create policy "Public read discount_codes" on public.discount_codes for select using (true);
create policy "Admin write discount_codes" on public.discount_codes for all using (true);

-- Shipping zones: public read, admin write
create policy "Public read shipping_zones" on public.shipping_zones for select using (true);
create policy "Admin write shipping_zones" on public.shipping_zones for all using (true);

-- Currency settings: public read
create policy "Public read currency_settings" on public.currency_settings for select using (true);

-- Newsletter: insert only (public), read via admin
create policy "Public insert newsletter" on public.newsletter_subscribers for insert with check (true);
create policy "Admin read newsletter" on public.newsletter_subscribers for select using (true);

-- Partner applications: insert only (public)
create policy "Public insert partners" on public.partner_applications for insert with check (true);
create policy "Admin read partners" on public.partner_applications for select using (true);

-- Admin users: service role only
create policy "Service role admin_users" on public.admin_users for all using (true);

-- ─── AUTO-UPDATE updated_at ─────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ─── SEED: SHIPPING ZONES ──────────────────────────────────
insert into public.shipping_zones (name, country_codes, shipping_cost_eur, free_threshold_eur, estimated_days_min, estimated_days_max, tax_rate, tax_included, is_enabled, sort_order) values
  ('Netherlands',           '{NL}',      3.95,  35.00, 1, 2,  21,   true,  true, 1),
  ('Belgium & Luxembourg',  '{BE,LU}',   4.95,  50.00, 2, 3,  21,   true,  true, 2),
  ('Germany',               '{DE}',      5.95,  60.00, 2, 4,  19,   true,  true, 3),
  ('Europe',                '{FR,ES,IT,AT,PL,PT,SE,DK,NO,FI,IE,CZ,SK,HU,RO,BG,HR,SI,EE,LV,LT,GR,CY,MT}', 6.95, 75.00, 3, 5, 21, true, true, 4),
  ('United Kingdom',        '{GB}',      8.95, 100.00, 3, 5,  20,   true,  true, 5),
  ('Switzerland',           '{CH}',      9.95, 100.00, 3, 6,  7.7,  true,  true, 6),
  ('US & Canada',           '{US,CA}',  12.95, 120.00, 5, 10,  0,   false, true, 7),
  ('Australia & NZ',        '{AU,NZ}',  14.95, 150.00, 6, 12, 10,   false, true, 8)
on conflict do nothing;

-- ─── SEED: CURRENCIES ──────────────────────────────────────
insert into public.currency_settings (currency_code, currency_symbol, exchange_rate, rounding_mode) values
  ('EUR', '€',   1.000000, 'none'),
  ('GBP', '£',   0.856000, 'x.99'),
  ('USD', '$',   1.085000, 'x.95'),
  ('AUD', 'A$',  1.640000, 'x.95'),
  ('CHF', 'CHF', 0.962000, 'x.95'),
  ('DKK', 'kr',  7.460000, 'round'),
  ('SEK', 'kr', 11.320000, 'round'),
  ('NOK', 'kr', 11.580000, 'round')
on conflict (currency_code) do nothing;

-- ─── SEED: SAMPLE PRODUCTS ─────────────────────────────────
insert into public.products (name, slug, category, price, original_price, image, description, short_description, rating, review_count, badge, in_stock, sort_order)
values
  ('Sample Product', 'sample-product', 'main', 29.95, null, '/images/product-1.webp', 'A premium quality product crafted with care.', 'Premium quality', 4.5, 124, 'Bestseller', true, 10),
  ('Sample Product — 3-Pack', 'sample-product-3pack', 'main', 74.95, 89.85, '/images/product-2.webp', 'Save with our 3-pack bundle.', '3-pack — save 16%', 4.0, 87, 'Save 16%', true, 20),
  ('Accessory Item', 'accessory-item', 'accessories', 18.95, null, '/images/product-3.webp', 'The perfect complement to your order.', 'Essential add-on', 4.6, 89, null, true, 30),
  ('Complete Bundle', 'complete-bundle', 'bundle', 99.95, 119.85, '/images/product-4.webp', 'Everything you need in one package.', 'All-in-one bundle — save 17%', 5.0, 33, 'Bundle Deal', true, 40)
on conflict (slug) do update set
  name = excluded.name, category = excluded.category, price = excluded.price,
  original_price = excluded.original_price, image = excluded.image,
  description = excluded.description, short_description = excluded.short_description,
  rating = excluded.rating, review_count = excluded.review_count,
  badge = excluded.badge, in_stock = excluded.in_stock, sort_order = excluded.sort_order;

-- ─── DONE ───────────────────────────────────────────────────
select 'Schema setup complete! Tables created + sample data inserted.' as result;
