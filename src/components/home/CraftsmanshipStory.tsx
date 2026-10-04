import React from 'react';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { STORE_PHONE } from '../../data/mockData';
import { ArrowRight, Phone } from 'lucide-react';

export const CraftsmanshipStory: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-200 shadow-md">
              <img
                src="/src/assets/images/product_navy_waistcoat_1790702766372.jpg"
                alt="Elixir Bespoke Karigari"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-neutral-800">
                  <span className="font-semibold uppercase tracking-wider">Atelier Karachi</span>
                  <span className="text-neutral-500">Hand-finished Bar-tack Stitching</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
                Heritage & Provenance
              </span>
              <h2 className="font-brand text-2xl sm:text-4xl text-neutral-900 leading-tight">
                Honoring the art of fine Pakistani tailoring.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
              Each ELIXIR garment is born from a refusal to compromise. We source raw silks with natural irregular texture, 120s combed Egyptian Giza cottons that breathe in the sweltering heat of Lahore and Multan, and lightweight tropical wools for our ceremonial prince coats.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-200">
                <span className="text-xl sm:text-2xl font-bold font-brand text-neutral-900 tabular-nums">
                  120s
                </span>
                <p className="text-xs text-neutral-500 mt-1">2-Ply Giza Staple Cotton</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200">
                <span className="text-xl sm:text-2xl font-bold font-brand text-neutral-900 tabular-nums">
                  100%
                </span>
                <p className="text-xs text-neutral-500 mt-1">Cash on Delivery Across Pakistan</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/shop')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Discover Collection
              </Button>
              <a
                href={`tel:${STORE_PHONE}`}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-3 rounded-2xl border border-stone-300 hover:border-neutral-900 hover:bg-white transition-colors text-neutral-800"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Book Atelier Fitting ({STORE_PHONE})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
