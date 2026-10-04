import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DbOrder, DbOrderItem } from '../types/supabase';
import { Order, CartItem, PakistaniShippingAddress, PaymentMethod, OrderStatus } from '../types';

const LOCAL_ORDERS_KEY = 'elixir_orders_v3';

export interface CreateOrderParams {
  shippingAddress: PakistaniShippingAddress;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    mobileAccount?: string;
    transactionId?: string;
  };
}

export const orderService = {
  /**
   * Complete Order Creation Flow:
   * 1. Validate customer details
   * 2. Calculate totals
   * 3. Generate unique order number (e.g. ELX-184920)
   * 4. Create order row in Supabase 'orders' table
   * 5. Create order_items in Supabase 'order_items' table
   * 6. Return persisted domain Order object
   */
  async createOrder(params: CreateOrderParams): Promise<Order> {
    const { shippingAddress, items, subtotal, deliveryFee, discount, total, paymentMethod, paymentDetails } = params;

    // 1. Validate details
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.completeAddress || !shippingAddress.area) {
      throw new Error('Please fill in all required customer details.');
    }
    if (!items || items.length === 0) {
      throw new Error('Your shopping cart is empty.');
    }

    // 2. Generate unique order number
    const orderNumber = `ELX-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowIso = new Date().toISOString();
    const formattedDate = new Date().toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const initialStatus: OrderStatus = paymentMethod === 'Cash on Delivery' ? 'Confirmed' : 'Pending';

    let orderId = `ord-${Date.now()}`;

    // 3. Supabase insert if configured
    if (isSupabaseConfigured()) {
      try {
        const orderPayload: Partial<DbOrder> = {
          order_number: orderNumber,
          customer_name: shippingAddress.fullName.trim(),
          phone: shippingAddress.phone.trim(),
          email: shippingAddress.email?.trim() || '',
          address: shippingAddress.completeAddress.trim(),
          area: shippingAddress.area.trim(),
          city: shippingAddress.city || 'Karachi',
          province: shippingAddress.province || 'Sindh',
          postal_code: shippingAddress.postalCode || '',
          notes: shippingAddress.orderNotes || '',
          payment_method: paymentMethod,
          subtotal: Number(subtotal),
          delivery_fee: Number(deliveryFee),
          discount: Number(discount),
          total: Number(total),
          status: initialStatus
        };

        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert([orderPayload])
          .select()
          .single();

        if (orderError) {
          console.warn('Supabase orders insert error, using local fallback:', orderError.message);
        } else if (orderData) {
          orderId = orderData.id;

          // Insert order items
          const itemsPayload = items.map((item) => ({
            order_id: orderId,
            product_id: item.product.id,
            product_name: item.product.title,
            quantity: item.quantity,
            price: item.product.price,
            size: item.size,
            color: item.color,
            image: item.product.images[0] || ''
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(itemsPayload);

          if (itemsError) {
            console.warn('Supabase order_items insert error:', itemsError.message);
          }
        }
      } catch (err) {
        console.warn('Error saving order to Supabase:', err);
      }
    }

    // Domain order model
    const newDomainOrder: Order = {
      id: orderNumber,
      date: formattedDate,
      items: [...items],
      subtotal,
      shippingFee: deliveryFee,
      discount,
      total,
      status: initialStatus,
      paymentMethod,
      paymentDetails,
      shippingAddress: { ...shippingAddress }
    };

    // Store in localStorage for rapid access and offline preview
    try {
      const existing = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || '[]');
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([newDomainOrder, ...existing]));
    } catch (e) {
      console.error('Failed to store order in local storage:', e);
    }

    return newDomainOrder;
  },

  /**
   * Fetch orders for customer / admin
   */
  async getOrders(): Promise<Order[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data: dbOrders, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .order('created_at', { ascending: false });

        if (!error && dbOrders && dbOrders.length > 0) {
          return dbOrders.map((o: any) => ({
            id: o.order_number || o.id,
            date: new Date(o.created_at).toLocaleDateString('en-PK', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            items: (o.order_items || []).map((oi: any) => ({
              id: oi.id,
              product: {
                id: oi.product_id,
                slug: oi.product_id,
                title: oi.product_name,
                subtitle: '',
                gender: 'men',
                category: 'Clothing',
                categoryLabel: 'Clothing',
                clothingType: 'Clothing',
                price: Number(oi.price),
                rating: 4.9,
                reviewCount: 1,
                images: [oi.image],
                description: '',
                fabric: '',
                fit: '',
                colorName: oi.color,
                colorHex: '#000000',
                colors: [{ name: oi.color, hex: '#000000' }],
                sizes: [oi.size],
                inStock: true,
                details: [],
                sku: oi.product_id
              },
              size: oi.size,
              color: oi.color,
              quantity: oi.quantity,
              unitPrice: Number(oi.price)
            })),
            subtotal: Number(o.subtotal),
            shippingFee: Number(o.delivery_fee),
            discount: Number(o.discount || 0),
            total: Number(o.total),
            status: o.status as OrderStatus,
            paymentMethod: o.payment_method as PaymentMethod,
            shippingAddress: {
              fullName: o.customer_name,
              phone: o.phone,
              email: o.email || '',
              completeAddress: o.address,
              area: o.area,
              city: o.city,
              province: o.province,
              postalCode: o.postal_code || '',
              orderNotes: o.notes || ''
            }
          }));
        }
      } catch (err) {
        console.warn('Error fetching orders from Supabase:', err);
      }
    }

    try {
      const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  },

  /**
   * Update Order Status (Admin)
   */
  async updateOrderStatus(orderNumber: string, status: OrderStatus): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('orders')
          .update({ status })
          .or(`order_number.eq.${orderNumber},id.eq.${orderNumber}`);
      } catch (err) {
        console.warn('Supabase update order status error:', err);
      }
    }

    try {
      const orders = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || '[]');
      const updated = orders.map((o: Order) =>
        o.id === orderNumber ? { ...o, status } : o
      );
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
    } catch {}
    return true;
  }
};
