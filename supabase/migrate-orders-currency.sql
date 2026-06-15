-- Migratie: valuta per order (NOK-betalingen voor Noorse klanten).
-- Uitvoeren in de Supabase SQL editor (of via supabase db push).
-- Bestaande orders waren allemaal in EUR — de default dekt die af.

alter table public.orders
  add column if not exists currency text not null default 'EUR';

comment on column public.orders.currency is
  'ISO-valutacode van de order (EUR of NOK). Bedragen (subtotal/shipping/total en order_items.price) staan in deze valuta.';
