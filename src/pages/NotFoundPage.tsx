import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Button } from '../components/common/Button';
import { STORE_PHONE, STORE_WHATSAPP_LINK } from '../data/mockData';
import { Compass, ShoppingBag, ArrowLeft, MessageSquare } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-[80vh] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Brand Kicker */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-neutral-400 block">
            ELIXIR · ATELIER DIRECTORY
          </span>
          <p className="font-brand text-7xl sm:text-8xl font-light text-neutral-900 tracking-tight">
            404
          </p>
        </div>

        {/* Headline & Copy */}
        <div className="space-y-3 max-w-md mx-auto">
          <h1 className="font-brand text-2xl sm:text-3xl text-neutral-900 font-medium">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
            The page or collection you are seeking may have been archived, renamed, or is currently undergoing bespoke atelier curation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Return to Home
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/shop')}
            leftIcon={<ShoppingBag className="w-4 h-4" />}
          >
            Explore All Garments
          </Button>
        </div>

        {/* Quick links to core Pakistani collections */}
        <div className="pt-6 border-t border-stone-200/80 max-w-sm mx-auto space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block">
            Popular Collections
          </span>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-neutral-700">
            <button
              onClick={() => navigate('/men')}
              className="hover:text-neutral-900 hover:underline transition-colors"
            >
              Men&apos;s Kurtas &amp; Suits
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/women')}
              className="hover:text-neutral-900 hover:underline transition-colors"
            >
              Women&apos;s Lawn Suits
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/categories')}
              className="hover:text-neutral-900 hover:underline transition-colors"
            >
              Categories
            </button>
          </div>
        </div>

        {/* Direct WhatsApp Concierge Assistance */}
        <div className="pt-4">
          <a
            href={STORE_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-200/60 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Need immediate styling assistance? WhatsApp: {STORE_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
