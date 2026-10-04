import React, { useState, useEffect } from 'react';
import { DbCategory } from '../types/supabase';
import { productService } from '../services/productService';
import { useRouter } from '../context/RouterContext';
import { ArrowRight, Scissors, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';

export const CategoriesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [activeGender, setActiveGender] = useState<'all' | 'men' | 'women'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (e) {
        console.error('Failed to load categories', e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filteredCategories =
    activeGender === 'all'
      ? categories
      : categories.filter((c) => c.gender === activeGender || c.gender === 'both');

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
            ELIXIR Taxonomy
          </span>
          <h1 className="font-brand text-3xl sm:text-5xl text-neutral-900 font-medium">
            Explore All Categories
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
            Pakistani menswear and women&apos;s luxury pret silhouettes, structured by traditional and contemporary dress codes.
          </p>

          {/* Gender Switcher */}
          <div className="inline-flex items-center bg-stone-100 p-1.5 rounded-full border border-stone-200 mt-2">
            <button
              onClick={() => setActiveGender('all')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                activeGender === 'all'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveGender('men')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                activeGender === 'men'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Men&apos;s Categories
            </button>
            <button
              onClick={() => setActiveGender('women')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                activeGender === 'women'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Women&apos;s Categories
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl aspect-[4/5] bg-stone-200 animate-pulse"
              />
            ))}
          </div>
        ) : (
          /* Visual Category Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() =>
                  navigate(
                    cat.gender === 'women'
                      ? `/women?category=${encodeURIComponent(cat.name)}`
                      : `/men?category=${encodeURIComponent(cat.name)}`
                  )
                }
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-stone-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-stone-300 font-semibold">
                      {cat.gender === 'both' ? 'Men & Women' : `${cat.gender}'s Collection`}
                    </span>
                    <h3 className="font-brand text-xl sm:text-2xl text-white font-medium">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-neutral-900 transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bespoke Tailoring Callout */}
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
              Custom Sizing &amp; Fitting
            </span>
            <h2 className="font-brand text-2xl sm:text-3xl text-neutral-900 font-medium">
              Need a Custom Silhouette or Tailored Fit?
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Our Karachi atelier provides bespoke tailoring for Shalwar Kameez, Waistcoats, and Prince Coats across Pakistan.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/contact')}
            leftIcon={<Scissors className="w-4 h-4" />}
          >
            Consult Master Tailor
          </Button>
        </div>
      </div>
    </div>
  );
};
