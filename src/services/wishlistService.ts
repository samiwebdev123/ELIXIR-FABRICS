import { supabase, isSupabaseConfigured } from '../lib/supabase';

const WISHLIST_LOCAL_KEY = 'elixir_wishlist_v3';

export const wishlistService = {
  async getWishlist(userId: string = 'anon_guest'): Promise<string[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('wishlist')
          .select('product_id')
          .eq('user_id', userId);

        if (!error && data) {
          return data.map((d: any) => d.product_id);
        }
      } catch (err) {
        console.warn('Error reading wishlist from Supabase:', err);
      }
    }

    try {
      const saved = localStorage.getItem(WISHLIST_LOCAL_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['prod-m-01', 'prod-m-03'];
  },

  async addToWishlist(userId: string = 'anon_guest', productId: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('wishlist')
          .upsert([{ user_id: userId, product_id: productId }], { onConflict: 'user_id,product_id' });
      } catch (err) {
        console.warn('Error adding to wishlist in Supabase:', err);
      }
    }

    try {
      const saved = JSON.parse(localStorage.getItem(WISHLIST_LOCAL_KEY) || '[]');
      if (!saved.includes(productId)) {
        localStorage.setItem(WISHLIST_LOCAL_KEY, JSON.stringify([...saved, productId]));
      }
    } catch {}
    return true;
  },

  async removeFromWishlist(userId: string = 'anon_guest', productId: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('wishlist')
          .delete()
          .match({ user_id: userId, product_id: productId });
      } catch (err) {
        console.warn('Error removing from wishlist in Supabase:', err);
      }
    }

    try {
      const saved = JSON.parse(localStorage.getItem(WISHLIST_LOCAL_KEY) || '[]');
      const filtered = saved.filter((id: string) => id !== productId);
      localStorage.setItem(WISHLIST_LOCAL_KEY, JSON.stringify(filtered));
    } catch {}
    return true;
  }
};
