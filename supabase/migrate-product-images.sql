-- Fix image paden — pointing naar /products/ folder die door Vite/Vercel direct geserveerd wordt
-- Plak in https://supabase.com/dashboard/project/exniwwddrdreihvwjokq/sql en Run

update public.products set image = '/products/product-pouch-ceremonial-30.jpg' where slug = 'ceremonial-matcha-30g';
update public.products set image = '/products/product-pouch-ceremonial-100.jpg' where slug = 'ceremonial-matcha-100g';
update public.products set image = '/products/product-pouch-culinary-100.jpg' where slug = 'culinary-matcha-100g';
update public.products set image = '/products/product-pouch-vanilla.jpg' where slug = 'vanilla-matcha-50g';
update public.products set image = '/products/product-tin-reserve.jpg' where slug = 'ceremonial-reserve-tin';
update public.products set image = '/products/product-starter-kit.jpg' where slug = 'starter-kit';
update public.products set image = '/products/product-premium-set.jpg' where slug = 'premium-ritual-set';
update public.products set image = '/products/product-gift-box.jpg' where slug = 'gift-box';
update public.products set image = '/products/product-discovery-box.jpg' where slug = 'discovery-tea-box';
update public.products set image = '/products/product-travel-kit.jpg' where slug = 'travel-ritual-kit';
update public.products set image = '/products/product-recipe-book.jpg' where slug = 'the-matcha-ritual-book';
update public.products set image = '/products/product-chasen.jpg' where slug = 'bamboe-chasen';
update public.products set image = '/products/product-matcha-bowl.jpg' where slug = 'keramische-matcha-kom';
update public.products set image = '/products/product-chashaku.jpg' where slug = 'bamboe-chashaku';
update public.products set image = '/products/product-frother.jpg' where slug = 'elektrische-melkopschuimer';
update public.products set image = '/products/product-cups-set.jpg' where slug = 'handmade-cup-set';
update public.products set image = '/products/product-pouch-hojicha.jpg' where slug = 'hojicha-poeder-50g';
update public.products set image = '/products/product-pouch-sencha.jpg' where slug = 'sencha-loose-leaf-75g';
update public.products set image = '/products/product-pouch-genmaicha.jpg' where slug = 'genmaicha-loose-leaf-50g';
update public.products set image = '/products/product-pouch-yuzu.jpg' where slug = 'matcha-yuzu-blend-40g';
update public.products set image = '/products/product-pouch-mint.jpg' where slug = 'mint-matcha-40g';
update public.products set image = '/products/product-pouch-cacao.jpg' where slug = 'cacao-matcha-50g';
update public.products set image = '/products/product-pouch-berry.jpg' where slug = 'berry-matcha-40g';
update public.products set image = '/products/product-pouch-iced.jpg' where slug = 'iced-matcha-blend-60g';

select slug, image from public.products order by sort_order;
