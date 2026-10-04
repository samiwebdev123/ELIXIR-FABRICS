import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DbProduct, DbCategory, dbProductToDomain } from '../types/supabase';
import { Product } from '../types';
import { SEED_PRODUCTS, SEED_CATEGORIES } from '../data/seedProducts';

export interface ProductFilterOptions {
  gender?: 'men' | 'women';
  category?: string;
  search?: string;
  sort?: 'newest' | 'price-low' | 'price-high' | 'popular';
  featured?: boolean;
  newArrival?: boolean;
  sale?: boolean;
  limit?: number;
}

// In-memory / local storage backing store for seamless preview and offline development
const LOCAL_PRODUCTS_KEY = 'elixir_db_products_v3';
const LOCAL_CATEGORIES_KEY = 'elixir_db_categories_v3';

function getLocalProducts(): DbProduct[] {
  try {
    const raw = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  // Default to 52 seed products
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
  } catch {}
  return SEED_PRODUCTS;
}

function getLocalCategories(): DbCategory[] {
  try {
    const raw = localStorage.getItem(LOCAL_CATEGORIES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  try {
    localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(SEED_CATEGORIES));
  } catch {}
  return SEED_CATEGORIES;
}

export const productService = {
  /**
   * Fetch all products with filtering, search, and sorting
   */
  async getProducts(options: ProductFilterOptions = {}): Promise<Product[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('products').select('*');

        if (options.gender) {
          query = query.eq('gender', options.gender);
        }

        if (options.category && options.category !== 'all') {
          query = query.eq('category', options.category);
        }

        if (options.search && options.search.trim()) {
          const s = options.search.trim();
          query = query.or(`name.ilike.%${s}%,description.ilike.%${s}%,category.ilike.%${s}%,fabric.ilike.%${s}%`);
        }

        if (options.featured) {
          query = query.eq('featured', true);
        }

        if (options.newArrival) {
          query = query.eq('new_arrival', true);
        }

        if (options.sale) {
          query = query.eq('sale', true);
        }

        // Sorting
        switch (options.sort) {
          case 'price-low':
            query = query.order('price', { ascending: true });
            break;
          case 'price-high':
            query = query.order('price', { ascending: false });
            break;
          case 'popular':
            query = query.order('rating', { ascending: false }).order('review_count', { ascending: false });
            break;
          case 'newest':
          default:
            query = query.order('created_at', { ascending: false });
            break;
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error } = await query;
        if (error) {
          console.warn('Supabase query error, falling back to local dataset:', error.message);
        } else if (data && data.length > 0) {
          return (data as DbProduct[]).map(dbProductToDomain);
        }
      } catch (err) {
        console.warn('Error connecting to Supabase products:', err);
      }
    }

    // Local in-memory / localStorage fallback query engine
    let items = [...getLocalProducts()];

    if (options.gender) {
      items = items.filter((p) => p.gender === options.gender);
    }

    if (options.category && options.category !== 'all') {
      const targetCat = options.category.toLowerCase().trim();
      items = items.filter((p) => p.category.toLowerCase().trim() === targetCat);
    }

    if (options.search && options.search.trim()) {
      const q = options.search.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.fabric && p.fabric.toLowerCase().includes(q))
      );
    }

    if (options.featured) {
      items = items.filter((p) => p.featured);
    }

    if (options.newArrival) {
      items = items.filter((p) => p.new_arrival);
    }

    if (options.sale) {
      items = items.filter((p) => p.sale);
    }

    // Sort
    switch (options.sort) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        items.sort((a, b) => b.rating - a.rating || b.review_count - a.review_count);
        break;
      case 'newest':
      default:
        // maintain list or order by id
        break;
    }

    if (options.limit) {
      items = items.slice(0, options.limit);
    }

    return items.map(dbProductToDomain);
  },

  /**
   * Fetch single product by id or slug
   */
  async getProductById(idOrSlug: string): Promise<Product | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
          .single();

        if (!error && data) {
          return dbProductToDomain(data as DbProduct);
        }
      } catch (err) {
        console.warn('Error fetching product from Supabase:', err);
      }
    }

    const local = getLocalProducts().find(
      (p) => p.id === idOrSlug || p.slug === idOrSlug
    );
    return local ? dbProductToDomain(local) : null;
  },

  /**
   * Fetch categories from Supabase / local
   */
  async getCategories(gender?: 'men' | 'women'): Promise<DbCategory[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('categories').select('*');
        if (gender) {
          query = query.or(`gender.eq.${gender},gender.eq.both`);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as DbCategory[];
        }
      } catch (err) {
        console.warn('Error fetching categories from Supabase:', err);
      }
    }

    let cats = getLocalCategories();
    if (gender) {
      cats = cats.filter((c) => c.gender === gender || c.gender === 'both');
    }
    return cats;
  },

  /**
   * Admin: Add new product to Supabase / local database
   */
  async createProduct(product: Omit<DbProduct, 'id' | 'created_at'>): Promise<DbProduct> {
    const newProduct: DbProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([newProduct])
          .select()
          .single();

        if (!error && data) {
          return data as DbProduct;
        }
      } catch (err) {
        console.warn('Supabase insert failed, persisting locally:', err);
      }
    }

    const current = getLocalProducts();
    const updated = [newProduct, ...current];
    try {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
    } catch {}
    return newProduct;
  },

  /**
   * Admin: Update existing product
   */
  async updateProduct(id: string, updates: Partial<DbProduct>): Promise<DbProduct | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('products')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          return data as DbProduct;
        }
      } catch (err) {
        console.warn('Supabase update failed:', err);
      }
    }

    const current = getLocalProducts();
    const index = current.findIndex((p) => p.id === id);
    if (index > -1) {
      current[index] = { ...current[index], ...updates };
      try {
        localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(current));
      } catch {}
      return current[index];
    }
    return null;
  },

  /**
   * Admin: Delete product
   */
  async deleteProduct(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch {}
    }
    const current = getLocalProducts().filter((p) => p.id !== id);
    try {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(current));
    } catch {}
    return true;
  },

  /**
   * Admin: Create category
   */
  async createCategory(cat: Omit<DbCategory, 'id' | 'created_at'>): Promise<DbCategory> {
    const newCategory: DbCategory = {
      ...cat,
      id: `cat-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .insert([newCategory])
          .select()
          .single();
        if (!error && data) {
          return data as DbCategory;
        }
      } catch (err) {
        console.warn('Supabase category insert failed:', err);
      }
    }

    const current = getLocalCategories();
    const updated = [...current, newCategory];
    try {
      localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(updated));
    } catch {}
    return newCategory;
  },

  /**
   * Admin: Update category
   */
  async updateCategory(id: string, updates: Partial<DbCategory>): Promise<DbCategory | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
        if (!error && data) {
          return data as DbCategory;
        }
      } catch (err) {
        console.warn('Supabase category update failed:', err);
      }
    }

    const current = getLocalCategories();
    const idx = current.findIndex((c) => c.id === id);
    if (idx > -1) {
      current[idx] = { ...current[idx], ...updates };
      try {
        localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(current));
      } catch {}
      return current[idx];
    }
    return null;
  },

  /**
   * Admin: Delete category
   */
  async deleteCategory(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch {}
    }

    const current = getLocalCategories().filter((c) => c.id !== id);
    try {
      localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(current));
    } catch {}
    return true;
  }
};
