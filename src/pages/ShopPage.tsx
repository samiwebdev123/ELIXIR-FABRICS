import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { DbCategory } from '../types/supabase';
import { productService } from '../services/productService';
import { ProductGrid } from '../components/product/ProductGrid';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  Sparkles,
  Flame,
  X,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');
  const [selectedFilterTag, setSelectedFilterTag] = useState<'all' | 'new' | 'popular' | 'sale'>('all');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load Categories from Supabase
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await productService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    loadCategories();
  }, []);

  // Fetch Products from Supabase on filter / sort / search change
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts({
        gender: selectedGender === 'all' ? undefined : selectedGender,
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: debouncedSearch,
        sort: sortBy,
        newArrival: selectedFilterTag === 'new',
        featured: selectedFilterTag === 'popular',
        sale: selectedFilterTag === 'sale'
      });
      setProducts(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to retrieve catalog from database. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedGender, selectedCategory, debouncedSearch, sortBy, selectedFilterTag]);

  const clearAllFilters = () => {
    setSelectedGender('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedFilterTag('all');
    setSortBy('newest');
  };

  const filteredCategories = categories.filter((c) =>
    selectedGender === 'all' ? true : c.gender === selectedGender || c.gender === 'both'
  );

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              ELIXIR Atelier Catalog
            </span>
            {isSupabaseConfigured() && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Connected to Supabase
              </span>
            )}
          </div>
          <h1 className="font-brand text-3xl sm:text-4xl md:text-5xl text-neutral-900 font-medium">
            The Complete Collection
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
            Discover tailored Pakistani menswear and women&apos;s luxury pret. Powered by Supabase data with doorstep Cash on Delivery nationwide.
          </p>
        </div>

        {/* Gender Filter Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <div className="flex items-center bg-stone-100 p-1.5 rounded-full border border-stone-200">
            <button
              onClick={() => {
                setSelectedGender('all');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                selectedGender === 'all'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Garments
            </button>
            <button
              onClick={() => {
                setSelectedGender('men');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                selectedGender === 'men'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Men&apos;s Collection
            </button>
            <button
              onClick={() => {
                setSelectedGender('women');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                selectedGender === 'women'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Women&apos;s Collection
            </button>
          </div>

          {/* Search bar inside Catalog */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Supabase products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-200 rounded-full focus:outline-none focus:border-neutral-900 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
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
            All Categories
          </button>
          {filteredCategories.map((c) => (
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

        {/* Secondary Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-3xl border border-stone-200/90 shadow-2xs">
          {/* Quick tags */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFilterTag('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedFilterTag === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-neutral-600 hover:bg-stone-100'
              }`}
            >
              All
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedFilterTag === 'sale'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-neutral-600 hover:bg-stone-100'
              }`}
            >
              <span>Special Offers</span>
            </button>
          </div>

          {/* Supabase Sorting Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-neutral-500 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 cursor-pointer font-medium"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price Low to High</option>
                <option value="price-high">Price High to Low</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {(selectedCategory !== 'all' || selectedFilterTag !== 'all' || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-neutral-500 hover:text-red-600 flex items-center gap-1 underline underline-offset-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
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
                <div className="h-4 bg-stone-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center space-y-4 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
            <h3 className="font-brand text-lg font-semibold text-neutral-900">
              Unable to Load Catalog
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">{error}</p>
            <button
              onClick={fetchProducts}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Query</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-200 space-y-4 max-w-lg mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="font-brand text-2xl text-neutral-900 font-medium">
              No garments found
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We couldn&apos;t find any items matching your selected criteria. Try adjusting your category or clearing search terms.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
              <span>Showing {products.length} garments</span>
              <span className="font-medium text-neutral-700">All prices in Pakistani Rupees (PKR)</span>
            </div>
            <ProductGrid products={products} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
};
