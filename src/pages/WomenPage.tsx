import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { DbCategory } from '../types/supabase';
import { productService } from '../services/productService';
import { ProductGrid } from '../components/product/ProductGrid';
import { HERO_WOMEN_IMAGE } from '../data/mockData';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  Flame,
  Search,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const WomenPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');
  const [selectedFilterTag, setSelectedFilterTag] = useState<'all' | 'new' | 'popular' | 'sale'>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    async function loadCats() {
      try {
        const cats = await productService.getCategories('women');
        setCategories(cats);
      } catch (e) {
        console.error('Error loading women categories', e);
      }
    }
    loadCats();
  }, []);

  const fetchWomenProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts({
        gender: 'women',
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: debouncedSearch,
        sort: sortBy,
        newArrival: selectedFilterTag === 'new',
        featured: selectedFilterTag === 'popular',
        sale: selectedFilterTag === 'sale'
      });
      setProducts(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to retrieve Women&apos;s collection from Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWomenProducts();
  }, [selectedCategory, debouncedSearch, sortBy, selectedFilterTag]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Editorial Spotlight Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 min-h-[340px] flex items-end p-6 sm:p-12">
          <img
            src={HERO_WOMEN_IMAGE}
            alt="ELIXIR Women's Fashion"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent" />
          <div className="relative z-10 max-w-xl text-white space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.28em] text-stone-300 font-semibold">
                Women&apos;s Haute Couture
              </span>
              {isSupabaseConfigured() && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Supabase Live Data
                </span>
              )}
            </div>
            <h1 className="font-brand text-3xl sm:text-5xl font-medium leading-tight">
              Women&apos;s Collection
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Exquisite embroidered lawn suits, luxury 2-piece &amp; 3-piece ensembles, Korean nida abayas, modal hijabs, and bridal couture.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                : 'bg-white border border-stone-200 text-neutral-700 hover:border-neutral-400'
            }`}
          >
            All Women&apos;s Garments
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.name)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory.toLowerCase() === c.name.toLowerCase()
                  ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                  : 'bg-white border border-stone-200 text-neutral-700 hover:border-neutral-400'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-3xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFilterTag('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedFilterTag === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-neutral-600 hover:bg-stone-100'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setSelectedFilterTag('new')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedFilterTag === 'new'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-neutral-600 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>New Arrivals</span>
            </button>
            <button
              onClick={() => setSelectedFilterTag('popular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedFilterTag === 'popular'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-neutral-600 hover:bg-stone-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Popular</span>
            </button>
            <button
              onClick={() => setSelectedFilterTag('sale')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedFilterTag === 'sale'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-neutral-600 hover:bg-stone-100'
              }`}
            >
              Special Offers
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-48 sm:w-56">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search women's..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 cursor-pointer font-medium"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price Low to High</option>
                <option value="price-high">Price High to Low</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-4 border border-stone-200/80 animate-pulse space-y-3"
              >
                <div className="aspect-[3/4] bg-stone-200 rounded-2xl w-full" />
                <div className="h-4 bg-stone-200 rounded w-3/4" />
                <div className="h-3 bg-stone-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center space-y-3 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-xs text-neutral-700">{error}</p>
            <button
              onClick={fetchWomenProducts}
              className="px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-200 space-y-4 max-w-lg mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="font-brand text-xl text-neutral-900 font-medium">
              No Women&apos;s Garments Found
            </h3>
            <p className="text-xs text-neutral-500">
              No garments currently match your chosen criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedFilterTag('all');
              }}
              className="px-5 py-2 bg-neutral-900 text-white rounded-full text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-500 px-1">
              Showing {products.length} Women&apos;s Garments in PKR
            </p>
            <ProductGrid products={products} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
};
