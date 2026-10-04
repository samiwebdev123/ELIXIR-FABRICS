import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DbReview } from '../types/supabase';

const REVIEWS_LOCAL_KEY = 'elixir_reviews_v3';

export interface AdminReview extends DbReview {
  status?: 'approved' | 'pending';
}

const DEFAULT_SAMPLE_REVIEWS: AdminReview[] = [
  {
    id: 'rev-1',
    product_id: 'prod-m-01',
    user_id: 'user-1',
    user_name: 'Farhan Zaidi',
    rating: 5,
    comment: 'Exquisite stitching and fabric fall. Delivered on time in Karachi with zero issues.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'rev-2',
    product_id: 'prod-m-03',
    user_id: 'user-2',
    user_name: 'Ayesha Malik',
    rating: 5,
    comment: 'Authentic Pakistani tailoring. The collar and cuff finishing is pure luxury.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'rev-3',
    product_id: 'prod-w-01',
    user_id: 'user-3',
    user_name: 'Mahnoor Khan',
    rating: 5,
    comment: 'The lawn fabric is super breathable for Lahore summer, colors are exact to photo.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: 'rev-4',
    product_id: 'prod-m-04',
    user_id: 'user-4',
    user_name: 'Salman Qureshi',
    rating: 4,
    comment: 'Fit was slightly snug on chest, but master tailor arranged an exchange within 2 days.',
    status: 'pending',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

export const reviewService = {
  async getAllReviews(): Promise<AdminReview[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data as AdminReview[];
        }
      } catch (err) {
        console.warn('Error fetching all reviews from Supabase:', err);
      }
    }

    try {
      const saved = localStorage.getItem(REVIEWS_LOCAL_KEY);
      if (saved) return JSON.parse(saved);
      localStorage.setItem(REVIEWS_LOCAL_KEY, JSON.stringify(DEFAULT_SAMPLE_REVIEWS));
    } catch {}

    return DEFAULT_SAMPLE_REVIEWS;
  },

  async getReviews(productId: string): Promise<DbReview[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', productId)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data as DbReview[];
        }
      } catch (err) {
        console.warn('Error reading reviews from Supabase:', err);
      }
    }

    const all = await this.getAllReviews();
    return all.filter((r) => r.product_id === productId);
  },

  async addReview(review: Omit<DbReview, 'id' | 'created_at'>): Promise<AdminReview> {
    const newRev: AdminReview = {
      ...review,
      id: `rev-${Date.now()}`,
      status: 'approved',
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('reviews').insert([newRev]);
      } catch (err) {
        console.warn('Error creating review in Supabase:', err);
      }
    }

    try {
      const all = await this.getAllReviews();
      localStorage.setItem(REVIEWS_LOCAL_KEY, JSON.stringify([newRev, ...all]));
    } catch {}

    return newRev;
  },

  async approveReview(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('reviews').update({ status: 'approved' }).eq('id', id);
      } catch {}
    }

    try {
      const all = await this.getAllReviews();
      const updated = all.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r));
      localStorage.setItem(REVIEWS_LOCAL_KEY, JSON.stringify(updated));
    } catch {}
    return true;
  },

  async deleteReview(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('reviews').delete().eq('id', id);
      } catch {}
    }

    try {
      const all = await this.getAllReviews();
      const filtered = all.filter((r) => r.id !== id);
      localStorage.setItem(REVIEWS_LOCAL_KEY, JSON.stringify(filtered));
    } catch {}
    return true;
  }
};
