export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  gender: 'men' | 'women';
  category: string;
  subcategory?: string;
  price: number;
  old_price?: number | null;
  discount?: number | null;
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  fabric: string;
  stock: boolean | number;
  featured: boolean;
  new_arrival: boolean;
  sale: boolean;
  rating: number;
  review_count: number;
  created_at?: string;
}

export interface DbCategory {
  id: string;
  name: string;
  gender: 'men' | 'women' | 'both';
  image: string;
  created_at?: string;
}

export interface DbProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  created_at?: string;
}

export interface DbOrder {
  id: string;
  order_number: string;
  customer_id?: string | null;
  customer_name: string;
  phone: string;
  email?: string;
  address: string;
  area: string;
  city: string;
  province: string;
  postal_code?: string;
  notes?: string;
  payment_method: string;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  status: string;
  created_at?: string;
  items?: DbOrderItem[];
}

export interface DbOrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
  image: string;
}

export interface DbWishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at?: string;
  product?: DbProduct;
}

export interface DbReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at?: string;
  user_name?: string;
}

// Convert DbProduct to frontend domain Product
import { Product } from './index';

export function dbProductToDomain(p: DbProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    title: p.name,
    subtitle: p.subcategory || `${p.gender === 'men' ? "Men's" : "Women's"} ${p.category}`,
    gender: p.gender,
    category: p.category,
    categoryLabel: p.category,
    clothingType: p.subcategory || p.category,
    price: Number(p.price),
    originalPrice: p.old_price ? Number(p.old_price) : undefined,
    discountPercentage: p.discount ? Number(p.discount) : undefined,
    rating: Number(p.rating || 4.9),
    reviewCount: Number(p.review_count || 12),
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : ['/src/assets/images/hero_menswear_elixir_1790702736623.jpg'],
    description: p.description,
    fabric: p.fabric || 'Pure Pakistani Fabric',
    fit: 'Tailored Regular Fit',
    colorName: p.colors?.[0]?.name || 'Standard',
    colorHex: p.colors?.[0]?.hex || '#18181B',
    colors: Array.isArray(p.colors) && p.colors.length > 0 ? p.colors : [{ name: 'Standard', hex: '#18181B' }],
    sizes: Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes : ['S', 'M', 'L', 'XL'],
    inStock: typeof p.stock === 'boolean' ? p.stock : Number(p.stock) > 0,
    stock: typeof p.stock === 'number' ? p.stock : (Number(p.stock) || 0),
    subcategory: p.subcategory,
    isNew: Boolean(p.new_arrival),
    isBestSeller: Boolean(p.featured),
    isTrending: Boolean(p.featured),
    isSale: Boolean(p.sale),
    details: [
      `Fabric: ${p.fabric || 'Premium Handcrafted Fabric'}`,
      'Signature ELIXIR craftsmanship & hand-finished hems',
      'Designed and tailored in Karachi, Pakistan',
      'Dry clean or gentle hand wash recommended'
    ],
    sku: `ELX-${p.gender.toUpperCase().slice(0, 1)}${p.category.toUpperCase().slice(0, 2)}-${p.id.slice(0, 4)}`
  };
}
