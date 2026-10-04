import React from 'react';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { HERO_IMAGE } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-neutral-900 min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] flex items-end">
          {/* Editorial Background Image with natural subtle lighting */}
          <img
            src={HERO_IMAGE}
            alt="ELIXIR Fine Menswear Campaign"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-95 transform scale-100 transition-transform duration-1000 ease-out hover:scale-102"
          />

          {/* Measured Scrim for Media Overlays (WCAG compliant) */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/40 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-2xl text-white space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-stone-300 font-sans font-medium">
              <span>Spring / Summer 2026</span>
              <span aria-hidden="true">·</span>
              <span>Bespoke Atelier</span>
            </div>

            <h1 className="font-brand text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white leading-[1.1] [text-wrap:balance]">
              The Sovereign Silhouette.
            </h1>

            <p className="text-sm sm:text-base text-stone-200 font-light leading-relaxed max-w-lg">
              Hand-finished raw silk kurtas, structured tropical wool waistcoats, and Egyptian cotton sets tailored for the modern Pakistani gentleman.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                className="bg-white text-neutral-950 hover:bg-stone-100 border-white"
                onClick={() => navigate('/shop')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Collection
              </Button>
              <Button
                variant="outline"
                size="md"
                className="text-white border-white/40 hover:bg-white/10 hover:border-white"
                onClick={() => navigate('/categories')}
              >
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
