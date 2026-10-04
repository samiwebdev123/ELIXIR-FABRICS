import { Product, CategoryItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_menswear_elixir_1790702736623.jpg';
export const HERO_WOMEN_IMAGE = '/src/assets/images/hero_women_lawn_suit_1790703216823.jpg';

export const STORE_PHONE = '03112989025';
export const STORE_WHATSAPP = '923112989025';
export const STORE_WHATSAPP_LINK = `https://wa.me/${STORE_WHATSAPP}`;
export const STORE_ADDRESS = 'Bespoke Atelier, Bukhari Commercial, Phase 6, D.H.A, Karachi, Pakistan';

export const MEN_CATEGORIES_LIST = [
  'T-Shirts',
  'Polo Shirts',
  'Casual Shirts',
  'Formal Shirts',
  'Shalwar Kameez',
  'Kurta',
  'Waistcoats',
  'Trousers',
  'Chinos',
  'Jeans',
  'Coats',
  'Blazers',
  'Jackets',
  'Sweaters',
  'Hoodies',
  'Tracksuits',
  'Wedding Wear',
  'Formal Wear'
];

export const WOMEN_CATEGORIES_LIST = [
  'Shalwar Kameez',
  '2 Piece',
  '3 Piece',
  'Kurti',
  'Lawn Suits',
  'Cotton Suits',
  'Embroidered Suits',
  'Abaya',
  'Hijab',
  'Dupatta',
  'Trousers',
  'Casual Wear',
  'Formal Wear',
  'Wedding Wear',
  'Winter Collection'
];

export const MEN_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
export const WOMEN_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Peshawar',
  'Multan',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Mirpur (AJK)',
  'Wah Cantt',
  'Jhelum'
];

export const PAKISTANI_PROVINCES = [
  'Sindh',
  'Punjab',
  'Balochistan',
  'Khyber Pakhtunkhwa',
  'Islamabad Capital Territory',
  'Gilgit-Baltistan',
  'Azad Kashmir'
];

export const PRODUCTS: Product[] = [
  // --- MEN PRODUCTS ---
  {
    id: 'men-01',
    slug: 'premium-cotton-t-shirt',
    title: 'Premium Cotton T-Shirt',
    subtitle: 'Combed ring-spun cotton with ribbed neckband',
    gender: 'men',
    category: 'T-Shirts',
    categoryLabel: 'T-Shirts',
    clothingType: 'Casual Wear',
    price: 2499,
    originalPrice: 3200,
    discountPercentage: 22,
    rating: 4.9,
    reviewCount: 64,
    images: [
      '/src/assets/images/product_men_polo_shirt_1790703266345.jpg',
      '/src/assets/images/hero_menswear_elixir_1790702736623.jpg'
    ],
    description: 'Crafted from 100% long-staple Pakistani combed cotton. Enzyme-washed for luxurious ultra-soft hand feel, reinforced shoulder tape, and anti-twist side seams.',
    fabric: '100% Combed Compact Cotton (220 GSM)',
    fit: 'Tailored Regular Fit',
    colorName: 'Midnight Black',
    colorHex: '#18181B',
    colors: [
      { name: 'Midnight Black', hex: '#18181B' },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Heather Grey', hex: '#94A3B8' },
      { name: 'Optical White', hex: '#F8FAFC' }
    ],
    sizes: MEN_SIZES,
    inStock: true,
    isTrending: true,
    isNew: true,
    isSale: true,
    sku: 'ELX-MN-TS-01',
    details: [
      'Pre-shrunk 100% combed cotton jersey',
      'Ribbed collar with Lycra retention recovery',
      'Twin-needle hem and cuff stitching',
      'Machine wash cold, tumble dry low'
    ]
  },
  {
    id: 'men-02',
    slug: 'classic-polo-shirt',
    title: 'Classic Polo Shirt',
    subtitle: 'Honeycomb cotton pique with mother-of-pearl buttons',
    gender: 'men',
    category: 'Polo Shirts',
    categoryLabel: 'Polo Shirts',
    clothingType: 'Casual Wear',
    price: 3850,
    originalPrice: 4800,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 42,
    images: [
      '/src/assets/images/product_men_polo_shirt_1790703266345.jpg',
      '/src/assets/images/product_tailored_blazer_1790702801651.jpg'
    ],
    description: 'The definitive smart-casual polo. Knitted in breathable two-fold Pakistani cotton pique, styled with a crisp three-button placket and understated side vents.',
    fabric: '100% Double Mercerized Cotton Pique',
    fit: 'Contemporary Slim Fit',
    colorName: 'Navy Royal',
    colorHex: '#1E293B',
    colors: [
      { name: 'Navy Royal', hex: '#1E293B' },
      { name: 'Jet Black', hex: '#0F172A' },
      { name: 'Sage Olive', hex: '#4B5563' },
      { name: 'Crimson Wine', hex: '#881337' }
    ],
    sizes: MEN_SIZES,
    inStock: true,
    isBestSeller: true,
    isTrending: true,
    isSale: true,
    sku: 'ELX-MN-PL-02',
    details: [
      'Mercerized finish provides a subtle lustrous sheen',
      'Natural mother-of-pearl buttons with crossover stitching',
      'Reinforced side vents with contrast herringbone tape',
      'Collar engineered to resist curling after repeated laundering'
    ]
  },
  {
    id: 'men-03',
    slug: 'premium-wash-and-wear-shalwar-kameez',
    title: 'Premium Wash & Wear Shalwar Kameez',
    subtitle: 'Wrinkle-resistant fine micro-poly blend with tailored band collar',
    gender: 'men',
    category: 'Shalwar Kameez',
    categoryLabel: 'Shalwar Kameez',
    clothingType: 'Eastern Wear',
    price: 8950,
    originalPrice: 11500,
    discountPercentage: 22,
    rating: 5.0,
    reviewCount: 89,
    images: [
      '/src/assets/images/product_men_wash_wear_kameez_1790703282007.jpg',
      '/src/assets/images/product_charcoal_kurta_1790702777475.jpg'
    ],
    description: 'Engineered specifically for Pakistani daily ease. Premium high-density wash-and-wear fabric that drapes cleanly with zero wrinkles from morning meetings to evening gatherings.',
    fabric: 'Premium Wrinkle-Free Microfilament Blend',
    fit: 'Traditional Tailored Fit',
    colorName: 'Pearl Slate Grey',
    colorHex: '#94A3B8',
    colors: [
      { name: 'Pearl Slate Grey', hex: '#94A3B8' },
      { name: 'Charcoal Dark', hex: '#334155' },
      { name: 'Off-White Ivory', hex: '#F7F5F0' },
      { name: 'Midnight Navy', hex: '#0F172A' }
    ],
    sizes: MEN_SIZES,
    inStock: true,
    isBestSeller: true,
    isTrending: true,
    sku: 'ELX-MN-SK-03',
    details: [
      'Crease-resistant structure requiring minimal ironing',
      'Structured 1-inch band collar with fused interlining',
      'Includes traditional matching volume shalwar with drawstring',
      'Dual deep side pockets and hidden placket pen pocket'
    ]
  },
  {
    id: 'men-04',
    slug: 'embroidered-kurta',
    title: 'Embroidered Kurta',
    subtitle: 'Tonal silk thread embroidery along mandarin placket',
    gender: 'men',
    category: 'Kurta',
    categoryLabel: 'Kurta',
    clothingType: 'Eastern Wear',
    price: 9800,
    originalPrice: 12500,
    discountPercentage: 21,
    rating: 4.9,
    reviewCount: 53,
    images: [
      '/src/assets/images/product_ivory_kurta_1790702750807.jpg',
      '/src/assets/images/hero_menswear_elixir_1790702736623.jpg'
    ],
    description: 'Delicate hand-guided tone-on-tone Resham thread embroidery adorning the neckline, cuffs, and collar. Tailored from lustrous raw-silk and cotton blend.',
    fabric: 'Raw Silk & Fine Cotton Blend',
    fit: 'Tailored Bespoke Fit',
    colorName: 'Imperial Ivory',
    colorHex: '#F7F5F0',
    colors: [
      { name: 'Imperial Ivory', hex: '#F7F5F0' },
      { name: 'Champagne Gold', hex: '#E2D9C8' },
      { name: 'Midnight Onyx', hex: '#18181B' }
    ],
    sizes: MEN_SIZES,
    inStock: true,
    isTrending: true,
    isNew: true,
    sku: 'ELX-MN-KT-04',
    details: [
      'Fine Resham cordwork on Mandarin collar and front placket',
      'Carved mother-of-pearl buttons with lock-stitch',
      'Side slits reinforced with bar-tack anchors',
      'Dry clean recommended for first wash'
    ]
  },
  {
    id: 'men-05',
    slug: 'classic-waistcoat',
    title: 'Classic Waistcoat',
    subtitle: 'Super 130s tropical wool blend with antique crest buttons',
    gender: 'men',
    category: 'Waistcoats',
    categoryLabel: 'Waistcoats',
    clothingType: 'Formal Wear',
    price: 16500,
    originalPrice: 19500,
    discountPercentage: 15,
    rating: 5.0,
    reviewCount: 76,
    images: [
      '/src/assets/images/product_navy_waistcoat_1790702766372.jpg',
      '/src/assets/images/hero_menswear_elixir_1790702736623.jpg'
    ],
    description: 'The defining layer for festive Pakistani occasions. Semi-canvassed construction holds its sharp chest structure naturally over kurtas and formal shirts.',
    fabric: 'Italian Tropical Suiting Wool & Mulberry Silk',
    fit: 'Architectural Slim Fit',
    colorName: 'Midnight Navy',
    colorHex: '#0F172A',
    colors: [
      { name: 'Midnight Navy', hex: '#0F172A' },
      { name: 'Matte Charcoal', hex: '#27272A' },
      { name: 'Royal Burgundy', hex: '#4A0E17' }
    ],
    sizes: MEN_SIZES,
    inStock: true,
    isBestSeller: true,
    isTrending: true,
    sku: 'ELX-MN-WC-05',
    details: [
      'Semi-canvassed chest for lifetime form retention',
      'Antique monogrammed crest buttons',
      'Exterior welt pockets + interior passport pocket',
      'Adjustable matching back cinch slider'
    ]
  },
  {
    id: 'men-06',
    slug: 'classic-black-trouser',
    title: 'Classic Black Trouser',
    subtitle: 'Wool-touch stretch twill with internal curtain waistband',
    gender: 'men',
    category: 'Trousers',
    categoryLabel: 'Trousers',
    clothingType: 'Formal Wear',
    price: 6950,
    originalPrice: 8500,
    discountPercentage: 18,
    rating: 4.7,
    reviewCount: 31,
    images: [
      '/src/assets/images/product_tailored_blazer_1790702801651.jpg',
      '/src/assets/images/product_charcoal_kurta_1790702777475.jpg'
    ],
    description: 'Precision formal trousers with clean flat-front tailoring, slant pockets, and subtle stretch for effortless comfort during long boardroom days and evening receptions.',
    fabric: '98% Cotton-Poly Twill, 2% Elastane',
    fit: 'Clean Tapered Fit',
    colorName: 'Onyx Black',
    colorHex: '#09090B',
    colors: [
      { name: 'Onyx Black', hex: '#09090B' },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Stone Grey', hex: '#64748B' }
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    inStock: true,
    isSale: true,
    sku: 'ELX-MN-TR-06',
    details: [
      'Curtain waistband with anti-slip shirt rubber grip',
      'French bearer button with zip fly',
      'Pre-hemmed with 1.5-inch turn-up allowance'
    ]
  },
  {
    id: 'men-07',
    slug: 'premium-formal-coat',
    title: 'Premium Formal Coat',
    subtitle: 'Ceremonial structured prince coat with resham velvet trim',
    gender: 'men',
    category: 'Coats',
    categoryLabel: 'Coats & Blazers',
    clothingType: 'Wedding Wear',
    price: 32500,
    originalPrice: 38000,
    discountPercentage: 14,
    rating: 5.0,
    reviewCount: 38,
    images: [
      '/src/assets/images/product_navy_waistcoat_1790702766372.jpg',
      '/src/assets/images/hero_menswear_elixir_1790702736623.jpg'
    ],
    description: 'The pinnacle of regal Pakistani wedding attire. Tailored with architectural canvassing, fine resham collar detailing, and gunmetal engraved crest buttons.',
    fabric: 'Fine Tropical Wool & Silk Micro-Velvet',
    fit: 'Tailored Bespoke Fit',
    colorName: 'Royal Midnight',
    colorHex: '#0B132B',
    colors: [
      { name: 'Royal Midnight', hex: '#0B132B' },
      { name: 'Jet Onyx', hex: '#09090B' }
    ],
    sizes: MEN_SIZES,
    inStock: true,
    isNew: true,
    sku: 'ELX-MN-CT-07',
    details: [
      'Full-canvas structured chest and lapel',
      'Hand-finished velvet band collar',
      'Includes bespoke ELIXIR suit cover and wooden hanger'
    ]
  },
  {
    id: 'men-08',
    slug: 'italian-cut-chinos',
    title: 'Italian Cut Chinos',
    subtitle: 'Pima stretch cotton with extended button tab',
    gender: 'men',
    category: 'Chinos',
    categoryLabel: 'Chinos',
    clothingType: 'Casual Wear',
    price: 7450,
    rating: 4.8,
    reviewCount: 29,
    images: [
      '/src/assets/images/product_tailored_blazer_1790702801651.jpg',
      '/src/assets/images/product_men_polo_shirt_1790703266345.jpg'
    ],
    description: 'Tailored casual trousers engineered with a clean taper. Crafted in lightweight Italian stretch twill for superior all-day breathability.',
    fabric: '97% Pima Cotton, 3% Spandex',
    fit: 'Slim Tapered',
    colorName: 'Khaki Beige',
    colorHex: '#D4C5B9',
    colors: [
      { name: 'Khaki Beige', hex: '#D4C5B9' },
      { name: 'Navy Blue', hex: '#1E293B' },
      { name: 'Olive Green', hex: '#556557' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    inStock: true,
    sku: 'ELX-MN-CH-08',
    details: [
      'Extended waistband with horn button closure',
      'Soft enzyme wash for gentle hand feel',
      'Deep coin pocket and welt back pockets'
    ]
  },

  // --- WOMEN PRODUCTS ---
  {
    id: 'wom-01',
    slug: 'embroidered-lawn-3-piece',
    title: 'Embroidered Lawn 3 Piece',
    subtitle: 'Embroidered lawn shirt with chiffon dupatta and cambric trousers',
    gender: 'women',
    category: '3 Piece',
    categoryLabel: '3 Piece Lawn Suits',
    clothingType: 'Eastern Wear',
    price: 11500,
    originalPrice: 14500,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 114,
    images: [
      '/src/assets/images/product_women_embroidered_lawn_1790703232843.jpg',
      '/src/assets/images/hero_women_lawn_suit_1790703216823.jpg'
    ],
    description: 'An ethereal luxury lawn ensemble featuring intricate pastel floral threadwork across the front neckline, paired with a soft printed chiffon dupatta and tailored dyed cambric trouser.',
    fabric: 'Superfine 80s Cotton Lawn & Pure Chiffon Dupatta',
    fit: 'Regular A-Line Silhouette',
    colorName: 'Blush Rose & Mint',
    colorHex: '#FBCFE8',
    colors: [
      { name: 'Blush Rose & Mint', hex: '#FBCFE8' },
      { name: 'Powder Blue', hex: '#BAE6FD' },
      { name: 'Ivory Peach', hex: '#FED7AA' }
    ],
    sizes: WOMEN_SIZES,
    inStock: true,
    isBestSeller: true,
    isTrending: true,
    isNew: true,
    isSale: true,
    sku: 'ELX-WM-3P-01',
    details: [
      'Embroidered front on luxury 80s lawn (1.25m)',
      'Digitally printed pure chiffon dupatta (2.5m)',
      'Dyed solid cambric cotton trouser (2.5m)',
      'Embroidered organza border patch included for hem and sleeves'
    ]
  },
  {
    id: 'wom-02',
    slug: 'classic-black-abaya',
    title: 'Classic Black Abaya',
    subtitle: 'Premium Dubai Nida fabric with subtle tonal sleeve embroidery',
    gender: 'women',
    category: 'Abaya',
    categoryLabel: 'Abayas & Modest Wear',
    clothingType: 'Modest Wear',
    price: 8900,
    originalPrice: 11000,
    discountPercentage: 19,
    rating: 5.0,
    reviewCount: 98,
    images: [
      '/src/assets/images/product_women_black_abaya_1790703249071.jpg',
      '/src/assets/images/hero_women_lawn_suit_1790703216823.jpg'
    ],
    description: 'Tailored from genuine Korean / Dubai Nidha fabric with deep matte onyx finish. Elegant flow with hidden front snap buttons and delicate micro-beading along the flared sleeves.',
    fabric: '100% Genuine Dubai Nida Crepe',
    fit: 'Modest Loose Flowing Silhouette',
    colorName: 'Onyx Midnight Black',
    colorHex: '#09090B',
    colors: [
      { name: 'Onyx Midnight Black', hex: '#09090B' },
      { name: 'Espresso Brown', hex: '#3E2723' },
      { name: 'Slate Smoke', hex: '#374151' }
    ],
    sizes: ['52 (XS)', '54 (S)', '56 (M)', '58 (L)', '60 (XL)'],
    inStock: true,
    isBestSeller: true,
    isTrending: true,
    sku: 'ELX-WM-AB-02',
    details: [
      'Ultra-soft breathable Nidha fabric with wrinkle resistance',
      'Concealed German metal snap buttons on front opening',
      'Matching pure chiffon hijab scarf included (70 x 180 cm)',
      'Deep side pockets for phone and essentials'
    ]
  },
  {
    id: 'wom-03',
    slug: 'premium-cotton-2-piece',
    title: 'Premium Cotton 2 Piece',
    subtitle: 'Block-printed pure cotton shirt with matching straight trousers',
    gender: 'women',
    category: '2 Piece',
    categoryLabel: '2 Piece Sets',
    clothingType: 'Casual Wear',
    price: 6850,
    originalPrice: 8500,
    discountPercentage: 19,
    rating: 4.8,
    reviewCount: 57,
    images: [
      '/src/assets/images/hero_women_lawn_suit_1790703216823.jpg',
      '/src/assets/images/product_women_embroidered_lawn_1790703232843.jpg'
    ],
    description: 'A breezy co-ord set crafted from hand-loomed pure cotton. Features minimalist boat neckline with mother-of-pearl buttons and matching ankle-length straight trousers.',
    fabric: '100% Hand-Loomed Breathable Cotton',
    fit: 'Straight Relaxed Cut',
    colorName: 'Sage Pastel Green',
    colorHex: '#A7F3D0',
    colors: [
      { name: 'Sage Pastel Green', hex: '#A7F3D0' },
      { name: 'Dusty Lilac', hex: '#E9D5FF' },
      { name: 'Sunbeam Ochre', hex: '#FDE047' }
    ],
    sizes: WOMEN_SIZES,
    inStock: true,
    isTrending: true,
    isSale: true,
    sku: 'ELX-WM-2P-03',
    details: [
      'Pre-washed pure cotton fabric with zero shrinkage',
      'Lace insertion along neckline and sleeve borders',
      'Elasticated waistband with drawstring trouser',
      'Machine wash gentle cycle'
    ]
  },
  {
    id: 'wom-04',
    slug: 'printed-lawn-suit',
    title: 'Printed Lawn Suit',
    subtitle: 'Contemporary geometric lawn shirt with voile dupatta',
    gender: 'women',
    category: 'Lawn Suits',
    categoryLabel: 'Lawn Suits',
    clothingType: 'Casual Wear',
    price: 5499,
    originalPrice: 6999,
    discountPercentage: 21,
    rating: 4.7,
    reviewCount: 39,
    images: [
      '/src/assets/images/product_women_embroidered_lawn_1790703232843.jpg',
      '/src/assets/images/hero_women_lawn_suit_1790703216823.jpg'
    ],
    description: 'Vibrant everyday elegance. High-definition reactive digital print on premium Pakistani lawn, accompanied by a soft breathable lawn voile dupatta.',
    fabric: '100% Pure Combed Lawn',
    fit: 'Classic Tailored Kurti & Trousers',
    colorName: 'Ivory Amber Floral',
    colorHex: '#FEF3C7',
    colors: [
      { name: 'Ivory Amber Floral', hex: '#FEF3C7' },
      { name: 'Teal Turquoise', hex: '#99F6E4' }
    ],
    sizes: WOMEN_SIZES,
    inStock: true,
    isSale: true,
    sku: 'ELX-WM-LS-04',
    details: [
      'High-grade reactive digital pigment printing',
      'Lightweight feather-soft lawn dupatta',
      'Straight cut trouser with delicate pin-tuck details'
    ]
  },
  {
    id: 'wom-05',
    slug: 'formal-embroidered-shalwar-kameez',
    title: 'Formal Embroidered Shalwar Kameez',
    subtitle: 'Raw silk shirt with heavy zardozi embroidery and organza dupatta',
    gender: 'women',
    category: 'Shalwar Kameez',
    categoryLabel: 'Shalwar Kameez',
    clothingType: 'Wedding Wear',
    price: 18500,
    originalPrice: 22000,
    discountPercentage: 16,
    rating: 5.0,
    reviewCount: 71,
    images: [
      '/src/assets/images/hero_women_lawn_suit_1790703216823.jpg',
      '/src/assets/images/product_women_embroidered_lawn_1790703232843.jpg'
    ],
    description: 'Designed for wedding ceremonies and Eid gatherings. Rich raw silk embellished with intricate tilla, sitara, and resham hand embroidery on the neckline, daman, and sleeves.',
    fabric: 'Pure Raw Silk (80g) & Foil Printed Organza Dupatta',
    fit: 'Regal Formal Fit',
    colorName: 'Champagne Gold & Peach',
    colorHex: '#FDE68A',
    colors: [
      { name: 'Champagne Gold & Peach', hex: '#FDE68A' },
      { name: 'Emerald Velvet Green', hex: '#064E3B' },
      { name: 'Garnet Ruby', hex: '#881337' }
    ],
    sizes: WOMEN_SIZES,
    inStock: true,
    isNew: true,
    isTrending: true,
    sku: 'ELX-WM-FS-05',
    details: [
      'Handcrafted zardozi and sequence neckline embroidery',
      'Scalloped embroidered borders on sleeves and shirt hem',
      'Includes matching silk straight trousers with lace cuffs',
      'Specialist dry clean only'
    ]
  }
];

export const CATEGORIES: CategoryItem[] = [
  // Men's categories
  {
    id: 'cat-men-shalwar-kameez',
    slug: 'shalwar-kameez',
    title: 'Shalwar Kameez',
    subtitle: 'Egyptian cotton & wash-and-wear sets',
    gender: 'men',
    image: '/src/assets/images/product_men_wash_wear_kameez_1790703282007.jpg',
    itemCount: 24
  },
  {
    id: 'cat-men-kurta',
    slug: 'kurta',
    title: 'Kurta',
    subtitle: 'Raw silk, linen & embroidered kurtas',
    gender: 'men',
    image: '/src/assets/images/product_ivory_kurta_1790702750807.jpg',
    itemCount: 32
  },
  {
    id: 'cat-men-waistcoats',
    slug: 'waistcoats',
    title: 'Waistcoats',
    subtitle: 'Bespoke wool & jamawar waistcoats',
    gender: 'men',
    image: '/src/assets/images/product_navy_waistcoat_1790702766372.jpg',
    itemCount: 18
  },
  {
    id: 'cat-men-tshirts-polos',
    slug: 'polo-shirts',
    title: 'Polo & T-Shirts',
    subtitle: 'Mercerized pique & pima cotton tees',
    gender: 'men',
    image: '/src/assets/images/product_men_polo_shirt_1790703266345.jpg',
    itemCount: 22
  },
  {
    id: 'cat-men-blazers',
    slug: 'blazers',
    title: 'Coats & Blazers',
    subtitle: 'Ceremonial prince coats and Italian blazers',
    gender: 'men',
    image: '/src/assets/images/product_tailored_blazer_1790702801651.jpg',
    itemCount: 16
  },
  {
    id: 'cat-men-trousers-chinos',
    slug: 'trousers',
    title: 'Trousers & Chinos',
    subtitle: 'Formal trousers, stretch chinos & jeans',
    gender: 'men',
    image: '/src/assets/images/product_charcoal_kurta_1790702777475.jpg',
    itemCount: 19
  },

  // Women's categories
  {
    id: 'cat-wom-3piece',
    slug: '3-piece',
    title: '3 Piece Suits',
    subtitle: 'Luxury embroidered lawn & chiffon suits',
    gender: 'women',
    image: '/src/assets/images/product_women_embroidered_lawn_1790703232843.jpg',
    itemCount: 38
  },
  {
    id: 'cat-wom-abaya',
    slug: 'abaya',
    title: 'Abaya & Modest Wear',
    subtitle: 'Premium Dubai Nida abayas & hijabs',
    gender: 'women',
    image: '/src/assets/images/product_women_black_abaya_1790703249071.jpg',
    itemCount: 20
  },
  {
    id: 'cat-wom-2piece',
    slug: '2-piece',
    title: '2 Piece & Kurti',
    subtitle: 'Printed & embroidered casual tunics',
    gender: 'women',
    image: '/src/assets/images/hero_women_lawn_suit_1790703216823.jpg',
    itemCount: 26
  },
  {
    id: 'cat-wom-wedding',
    slug: 'wedding-wear',
    title: 'Wedding & Formal Wear',
    subtitle: 'Raw silk & zardozi embroidered formals',
    gender: 'women',
    image: '/src/assets/images/hero_women_lawn_suit_1790703216823.jpg',
    itemCount: 15
  },
  {
    id: 'cat-wom-dupatta',
    slug: 'dupatta',
    title: 'Dupattas & Shawls',
    subtitle: 'Organza, pure silk & pashmina shawls',
    gender: 'women',
    image: '/src/assets/images/product_women_embroidered_lawn_1790703232843.jpg',
    itemCount: 14
  }
];
