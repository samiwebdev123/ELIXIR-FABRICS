export type Gender = 'men' | 'women';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  gender: Gender;
  category: string;
  categoryLabel: string;
  clothingType: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  fabric: string;
  fit: string;
  colorName: string;
  colorHex: string;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  stock?: number;
  subcategory?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  details: string[];
  sku: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  customMeasurements?: {
    chest?: string;
    waist?: string;
    length?: string;
  };
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Dispatched' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'Cash on Delivery' | 'JazzCash' | 'Easypaisa';

export interface PakistaniShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  completeAddress: string;
  area: string;
  city: string;
  province: string;
  postalCode: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    mobileAccount?: string;
    transactionId?: string;
  };
  shippingAddress: PakistaniShippingAddress;
}

export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  gender: 'men' | 'women' | 'both';
  image: string;
  itemCount: number;
}

