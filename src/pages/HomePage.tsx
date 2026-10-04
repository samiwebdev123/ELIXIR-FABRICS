import React, { useState, useEffect } from 'react';
import { HERO_IMAGE, HERO_WOMEN_IMAGE, STORE_PHONE, STORE_WHATSAPP_LINK } from '../data/mockData';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/common/Button';
import { useRouter } from '../context/RouterContext';
import { ArrowRight, Flame, Sparkles, Tag, ShieldCheck, Truck, Scissors, MessageSquare, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { DbCategory } from '../types/supabase';
import { productService } from '../services/productService';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('men');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<DbCategory[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [prods, cats] = await Promise.all([
          productService.getProducts(),
          productService.getCategories()
        ]);
        setAllProducts(prods);
        setCategories(cats);
      } catch (e) {
        console.error('Error loading homepage data', e);
      }
    }
    loadData();
  }, []);

  // Filtered collections
  const trendingProducts = allProducts.filter((p) => p.isTrending || p.isBestSeller);
  const menProducts = allProducts.filter((p) => p.gender === 'men').slice(0, 4);
  const womenProducts = allProducts.filter((p) => p.gender === 'women').slice(0, 4);
  const newArrivals = allProducts.filter((p) => p.isNew);
  const saleProducts = allProducts.filter((p) => p.isSale || (p.discountPercentage && p.discountPercentage > 0));
  const premiumProducts = allProducts.filter((p) => p.price >= 9000);

  const displayedCategories = categories.filter(
    (c) => c.gender === selectedGender || c.gender === 'both'
  );

  return (
    <div className="min-h-screen space-y-12 sm:space-y-16">
      {/* 3. Men / Women Switcher Bar */}
      <section className="px-4 sm:px-6 lg:px-8 pt-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center bg-stone-100 p-1.5 rounded-full border border-stone-200">
            <button
              onClick={() => setSelectedGender('men')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-200 ${
                selectedGender === 'men'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Men&apos;s Fashion
            </button>
            <button
              onClick={() => setSelectedGender('women')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-200 ${
                selectedGender === 'women'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Women&apos;s Fashion
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span>Cash on Delivery Across Pakistan</span>
            <span>·</span>
            <a
              href={STORE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {STORE_PHONE}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Hero Banner — Black & White Luxury Editorial Style */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl sm:rounded-[36px] overflow-hidden bg-white border border-stone-200/90 shadow-2xs grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Hero Text Content (Clean white background, Black heading, Dark charcoal text) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 bg-white order-2 lg:order-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-neutral-500 font-sans font-medium">
                <span>ELIXIR</span>
                <span aria-hidden="true">·</span>
                <span>FINE MENSWEAR &amp; LUXURY ATELIER</span>
              </div>

              <h1 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-black leading-[1.1] [text-wrap:balance]">
                Timeless Pakistani Fashion
              </h1>

              <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-lg">
                &ldquo;Premium styles for every occasion.&rdquo; Fine bespoke kurtas, structured waistcoats, and embroidered luxury lawn suits tailored with precision in Karachi.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                {/* SHOP MEN: Black background, White text, Black border, rounded corners */}
                <button
                  type="button"
                  onClick={() => navigate('/men')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black text-white border border-black rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-200 hover:bg-neutral-800 hover:shadow-sm"
                >
                  <span>SHOP MEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* SHOP WOMEN: White background, Black text, Black border, same size and shape */}
                <button
                  type="button"
                  onClick={() => navigate('/women')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black border border-black rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-200 hover:bg-stone-50 hover:shadow-sm"
                >
                  <span>SHOP WOMEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hero Editorial Photography */}
            <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] bg-stone-100 order-1 lg:order-2">
              <img
                src={selectedGender === 'women' ? HERO_WOMEN_IMAGE : HERO_IMAGE}
                alt="ELIXIR Timeless Pakistani Fashion"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Strip */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-3xl border border-stone-200/90 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0 text-neutral-800">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">Across Pakistan</p>
                <p className="text-[11px] text-neutral-500">Free delivery on ₨ 5,000+</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0 text-neutral-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">Cash on Delivery</p>
                <p className="text-[11px] text-neutral-500">Pay at your doorstep</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0 text-neutral-800">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">Bespoke Fitting</p>
                <p className="text-[11px] text-neutral-500">Made-to-measure tailoring</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0 text-neutral-800">
                <MessageSquare className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">WhatsApp Fitting</p>
                <p className="text-[11px] text-neutral-500">{STORE_PHONE}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Categories Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-end justify-between pb-2 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">
                Wardrobe Categories
              </span>
              <h2 className="font-brand text-2xl sm:text-3xl text-neutral-900 mt-1">
                Explore by Silhouette
              </h2>
            </div>
            <button
              onClick={() => navigate('/categories')}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
            {displayedCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() =>
                  navigate(
                    cat.gender === 'women'
                      ? `/women?category=${encodeURIComponent(cat.name)}`
                      : `/men?category=${encodeURIComponent(cat.name)}`
                  )
                }
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 bg-stone-200"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                    {cat.gender}
                  </span>
                  <h3 className="font-brand text-sm sm:text-base font-medium mt-1">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trending Now */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">
                  Most Coveted
                </span>
                <h2 className="font-brand text-2xl sm:text-3xl text-neutral-900">
                  Trending Now
                </h2>
              </div>
            </div>
            <button
              onClick={() => navigate('/shop?filter=trending')}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600 flex items-center gap-1"
            >
              See All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {trendingProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Men's Collection */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-stone-50/70 border-y border-stone-200">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-end justify-between pb-2 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">
                Sartorial Essentials
              </span>
              <h2 className="font-brand text-2xl sm:text-3xl text-neutral-900 mt-1">
                Men&apos;s Signature Collection
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/men')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Explore Men&apos;s ({allProducts.filter((p) => p.gender === 'men').length})
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {menProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Women's Collection */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-end justify-between pb-2 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">
                Luxury Pret &amp; Modest Wear
              </span>
              <h2 className="font-brand text-2xl sm:text-3xl text-neutral-900 mt-1">
                Women&apos;s Collection
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/women')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Explore Women&apos;s ({allProducts.filter((p) => p.gender === 'women').length})
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {womenProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. New Arrivals */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-neutral-900">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">
                  Fresh Drops
                </span>
                <h2 className="font-brand text-2xl sm:text-3xl text-neutral-900">
                  New Arrivals
                </h2>
              </div>
            </div>
            <button
              onClick={() => navigate('/shop?filter=new')}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600 flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Premium Collection */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-neutral-950 text-white rounded-3xl sm:rounded-[40px] max-w-7xl mx-auto">
        <div className="space-y-8 px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-stone-400">
                Atelier Masterpieces
              </span>
              <h2 className="font-brand text-2xl sm:text-4xl text-white mt-1">
                The Premium Collection
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg font-light">
                Hand-finished raw silks, canvassed tropical wool waistcoats, and regal zardozi formal wear.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-neutral-950 hover:bg-stone-200"
              onClick={() => navigate('/shop?filter=premium')}
            >
              View Haute Selection
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {premiumProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. Sale / Special Offers */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-red-600">
                  Limited In Stock
                </span>
                <h2 className="font-brand text-2xl sm:text-3xl text-neutral-900">
                  Sale &amp; Special Offers
                </h2>
              </div>
            </div>
            <button
              onClick={() => navigate('/shop?filter=sale')}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600 flex items-center gap-1"
            >
              Shop All Deals <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {saleProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 12. Brand Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-stone-100/80 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="text-xs uppercase tracking-[0.35em] font-semibold text-neutral-400">
            Heritage &amp; Identity
          </span>
          <h2 className="font-brand text-3xl sm:text-5xl text-neutral-900 tracking-wider">
            ELIXIR
          </h2>
          <p className="text-xs tracking-[0.4em] uppercase text-neutral-500 font-semibold -mt-2">
            FINE MENSWEAR
          </p>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed font-light">
            Founded with an unyielding commitment to Pakistani sartorial artistry. Every kurta, prince waistcoat, and embroidered lawn set is crafted with time-honored karigari, delivered nationwide with Cash on Delivery.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={STORE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#075E54] hover:bg-[#128C7E] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Concierge: {STORE_PHONE}</span>
            </a>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/contact')}
            >
              Karachi Atelier Location
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
