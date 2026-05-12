-- ============================================================
-- BUQE Commerce — Migratie: yourmatcha producten naar Supabase
-- Plak in https://supabase.com/dashboard/project/exniwwddrdreihvwjokq/sql en Run
-- ============================================================

-- 1. Demo "Sample Product" data weggooien (van originele template seed)
delete from public.products where slug in (
  'sample-product', 'sample-product-3pack', 'accessory-item', 'complete-bundle'
);

-- 2. Category constraint relaxen (yourmatcha gebruikt eigen categorieën)
alter table public.products drop constraint if exists products_category_check;

-- 3. 25 yourmatcha producten inserten (idempotent via on conflict slug)
insert into public.products (name, slug, category, price, image, description, short_description, badge, in_stock, sort_order)
values
  ('Ceremonial Matcha 30g', 'ceremonial-matcha-30g', 'matcha-powder', 18.95, '/assets/product-pouch-ceremonial-30.jpg',
    'Onze premium ceremonial grade matcha, handgeplukt in de Uji-regio van Kyoto, Japan. Een levendig groene kleur, zoete umami smaak en fluweelzachte textuur — perfect voor de traditionele theeceremonie of een puur matcha ritueel.',
    'Handgeplukt in Uji, Japan. Zuivere umami smaak.', 'Bestseller', true, 1),

  ('Ceremonial Matcha 100g', 'ceremonial-matcha-100g', 'matcha-powder', 49.95, '/assets/product-pouch-ceremonial-100.jpg',
    'Onze premium ceremonial grade matcha in voordeelverpakking van 100 gram. Dezelfde ongeëvenaarde kwaliteit uit Uji, voor de echte matcha liefhebber die dagelijks geniet van het perfecte kopje.',
    'Premium kwaliteit, voordeelverpakking.', 'Voordeel', true, 2),

  ('Culinary Matcha 100g', 'culinary-matcha-100g', 'matcha-powder', 24.95, '/assets/product-pouch-culinary-100.jpg',
    'Onze culinary grade matcha is perfect voor matcha lattes, smoothies en gebak. Een iets robuustere smaak die zich uitstekend mengt met melk en andere ingrediënten.',
    'Ideaal voor lattes, smoothies & recepten.', null, true, 3),

  ('Vanilla Matcha 50g', 'vanilla-matcha-50g', 'matcha-powder', 22.95, '/assets/product-pouch-vanilla.jpg',
    'Onze culinary matcha verfijnd met echte Bourbon vanille. Romig, zacht en perfect voor lattes met een natuurlijk zoete twist.',
    'Romige matcha met Bourbon vanille.', 'Nieuw', true, 4),

  ('Ceremonial Reserve Tin 100g', 'ceremonial-reserve-tin', 'matcha-powder', 89.95, '/assets/product-tin-reserve.jpg',
    'Onze meest exclusieve matcha, verpakt in een matzwart luchtdicht blik met goudfolie detail. Een single-origin reserve uit een kleine familieboerderij in Uji — beperkte oplage.',
    'Single-origin reserve in luxe tin.', 'Limited', true, 5),

  ('Starter Kit', 'starter-kit', 'kits-sets', 39.95, '/assets/product-starter-kit.jpg',
    'Alles wat je nodig hebt om te starten met matcha. Bevat 30g ceremonial grade matcha, een handgemaakte bamboe chasen en een keramische matcha kom.',
    '30g matcha + bamboe klopper + keramische kom.', 'Populair', true, 10),

  ('Premium Ritual Set', 'premium-ritual-set', 'kits-sets', 79.95, '/assets/product-premium-set.jpg',
    'Het ultieme matcha ritueel. Bevat 100g ceremonial matcha, handgemaakte chasen, ambachtelijke keramische kom en chakin doek. Verpakt in een prachtige geschenkdoos.',
    '100g matcha + klopper + kom + chakin doek.', 'Premium', true, 11),

  ('Gift Box', 'gift-box', 'kits-sets', 59.95, '/assets/product-gift-box.jpg',
    'Een zorgvuldig samengestelde geschenkdoos met onze beste producten. Perfect cadeau voor matcha liefhebbers, met een persoonlijk kaartje.',
    'Gecureerde selectie in premium verpakking.', null, true, 12),

  ('Discovery Tea Box', 'discovery-tea-box', 'kits-sets', 34.95, '/assets/product-discovery-box.jpg',
    'Ontdek ons volledige theeassortiment. Een proefbox met ceremonial matcha, hojicha, sencha en genmaicha — perfect om jouw favoriet te vinden.',
    'Proefbox met 4 Japanse thee specialiteiten.', 'Nieuw', true, 13),

  ('Travel Ritual Kit', 'travel-ritual-kit', 'kits-sets', 64.95, '/assets/product-travel-kit.jpg',
    'Jouw matcha ritueel onderweg. Compacte canvas etui met roestvrijstalen reisklopper, kleine keramische cup en een travel-size matcha pouch (15g). Perfect voor reizen, kantoor of weekendjes weg.',
    'Matcha ritueel onderweg — compleet kit.', 'Nieuw', true, 14),

  ('The Matcha Ritual — Receptenboek', 'the-matcha-ritual-book', 'kits-sets', 29.95, '/assets/product-recipe-book.jpg',
    'Een prachtig vormgegeven hardcover boek met 60+ recepten, rituelen en verhalen rond matcha. Van klassieke bereidingen tot moderne lattes, smoothies en gebak.',
    '60+ recepten, rituelen en verhalen.', null, true, 15),

  ('Bamboe Chasen (Klopper)', 'bamboe-chasen', 'accessories', 14.95, '/assets/product-chasen.jpg',
    'Een traditionele bamboe matcha klopper, handgemaakt van een enkel stuk bamboe met 80 fijne tanden. Essentieel voor de perfecte schuimige matcha.',
    'Handgemaakt, 80 tanden, traditioneel bamboe.', null, true, 20),

  ('Keramische Matcha Kom', 'keramische-matcha-kom', 'accessories', 29.95, '/assets/product-matcha-bowl.jpg',
    'Een prachtige handgemaakte keramische matcha kom (chawan) met uniek glazuur. Elke kom is uniek en gemaakt door ambachtslieden.',
    'Uniek handgemaakt, ambachtelijk glazuur.', null, true, 21),

  ('Bamboe Chashaku (Lepel)', 'bamboe-chashaku', 'accessories', 7.95, '/assets/product-chashaku.jpg',
    'Een traditionele bamboe matcha lepel voor de perfecte hoeveelheid matcha. Handgemaakt en duurzaam.',
    'Traditionele bamboe maatlepel.', null, true, 22),

  ('Elektrische Melkopschuimer', 'elektrische-melkopschuimer', 'accessories', 12.95, '/assets/product-frother.jpg',
    'Handige elektrische melkopschuimer, perfect voor het snel bereiden van matcha lattes. Compact en eenvoudig in gebruik.',
    'Snel & eenvoudig matcha lattes maken.', null, true, 23),

  ('Handmade Cup Set (2 stuks)', 'handmade-cup-set', 'accessories', 49.95, '/assets/product-cups-set.jpg',
    'Set van twee handgemaakte Japanse keramische bekers met uniek groen-crème glazuur. Ambachtelijk gedraaid in Mino, Japan — geen twee zijn hetzelfde.',
    '2 handgemaakte Japanse keramische bekers.', null, true, 24),

  ('Hojicha Poeder 50g', 'hojicha-poeder-50g', 'teas-drinks', 16.95, '/assets/product-pouch-hojicha.jpg',
    'Geroosterde Japanse groene thee in poedervorm. Hojicha heeft een warm, karamelachtig en nootachtig profiel met weinig cafeïne. Heerlijk als warme thee of latte.',
    'Geroosterde thee, warm & karamelachtig.', null, true, 30),

  ('Sencha Loose Leaf 75g', 'sencha-loose-leaf-75g', 'teas-drinks', 14.95, '/assets/product-pouch-sencha.jpg',
    'De meest gedronken groene thee van Japan. Verfrissend, grasachtig en licht zoet. Een perfecte dagelijkse thee uit Shizuoka.',
    'Verfrissende klassieke Japanse groene thee.', 'Nieuw', true, 31),

  ('Genmaicha Loose Leaf 50g', 'genmaicha-loose-leaf-50g', 'teas-drinks', 12.95, '/assets/product-pouch-genmaicha.jpg',
    'Traditionele Japanse groene thee gemengd met geroosterde rijst. Een unieke, nootachtige en hartige smaak — geweldig bij het ontbijt.',
    'Groene thee met geroosterde rijst.', null, true, 32),

  ('Matcha Yuzu Blend 40g', 'matcha-yuzu-blend-40g', 'teas-drinks', 19.95, '/assets/product-pouch-yuzu.jpg',
    'Unieke blend van premium matcha met Japanse yuzu citrus. Verfrissend en aromatisch, perfect voor een zomerse matcha ervaring of als basis voor cocktails.',
    'Verfrissende matcha met Japanse yuzu citrus.', 'Nieuw', true, 33),

  ('Mint Matcha 40g', 'mint-matcha-40g', 'teas-drinks', 19.95, '/assets/product-pouch-mint.jpg',
    'Verfrissende blend van premium matcha met biologische pepermunt. Een kristalheldere, koelende smaak — perfect voor een ijskoude latte op een warme dag of als wakkermakertje.',
    'Verfrissende matcha met biologische pepermunt.', 'Nieuw', true, 34),

  ('Cacao Matcha 50g', 'cacao-matcha-50g', 'teas-drinks', 22.95, '/assets/product-pouch-cacao.jpg',
    'Romige blend van matcha met rauwe Peruaanse cacao. Diep, vol en chocoladeachtig — een natuurlijk zoete energieboost zonder toegevoegde suikers.',
    'Matcha met rauwe Peruaanse cacao.', null, true, 35),

  ('Berry Matcha 40g', 'berry-matcha-40g', 'teas-drinks', 21.95, '/assets/product-pouch-berry.jpg',
    'Vrolijke blend van matcha met aardbei en framboos. Vol antioxidanten, fruitig en lichtzoet — heerlijk in smoothies of als zomerse iced latte.',
    'Matcha met aardbei en framboos.', 'Nieuw', true, 36),

  ('Iced Matcha Blend 60g', 'iced-matcha-blend-60g', 'teas-drinks', 23.95, '/assets/product-pouch-iced.jpg',
    'Speciaal ontwikkelde blend die ook in koud water perfect oplost. Voor de ultieme iced matcha latte zonder klontjes — gewoon shaken en genieten.',
    'Lost direct op in koud water.', 'Zomer', true, 37)

on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  price = excluded.price,
  image = excluded.image,
  description = excluded.description,
  short_description = excluded.short_description,
  badge = excluded.badge,
  in_stock = excluded.in_stock,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Verify
select category, count(*) from public.products group by category order by category;
select 'Migratie voltooid — ' || count(*) || ' producten in Supabase' as result from public.products;
