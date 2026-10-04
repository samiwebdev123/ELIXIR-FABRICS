import React from 'react';
import { Logo } from '../common/Logo';
import { Link } from '../../context/RouterContext';
import { STORE_PHONE, STORE_WHATSAPP_LINK, STORE_ADDRESS } from '../../data/mockData';
import { MessageSquare, MapPin, Truck, RotateCcw, ShieldCheck, Scissors } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-stone-300 pt-16 pb-28 md:pb-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-neutral-800/80">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 flex items-center justify-center shrink-0 text-stone-300 border border-neutral-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Pakistan Express Delivery
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                2-3 business days across Karachi, Lahore & Islamabad
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 flex items-center justify-center shrink-0 text-stone-300 border border-neutral-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Cash on Delivery (COD)
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                Doorstep cash payment accepted nationwide
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 flex items-center justify-center shrink-0 text-stone-300 border border-neutral-800">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Bespoke Atelier Fit
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                Tailored made-to-measure patterns
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 flex items-center justify-center shrink-0 text-stone-300 border border-neutral-800">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                7-Day Easy Exchange
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                Hassle-free size exchanges nationwide
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          {/* Col 1 & 2: Brand & Atelier */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-start">
              <Logo size="lg" variant="light" isLink={true} />
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              ELIXIR represents the hallmark of contemporary Pakistani fashion.
              Curating men&apos;s luxury raw silks, wash-and-wear shalwar kameez, waistcoats, and women&apos;s designer embroidered lawn suits.
            </p>

            {/* Direct WhatsApp Callout Button */}
            <div className="pt-2 space-y-3">
              <a
                href={STORE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#075E54] hover:bg-[#128C7E] text-white text-xs font-semibold shadow-md transition-all group"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp: {STORE_PHONE}</span>
              </a>

              <div className="space-y-1.5 text-xs text-neutral-400">
                <p>
                  Helpline (Click to chat):{' '}
                  <a
                    href={STORE_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold underline underline-offset-2 hover:text-emerald-400"
                  >
                    {STORE_PHONE}
                  </a>
                </p>
                <div className="flex items-start gap-2 pt-1">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>{STORE_ADDRESS}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Menu */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Explore ELIXIR
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop All Garments
                </Link>
              </li>
              <li>
                <Link href="/men" className="hover:text-white transition-colors">
                  Men&apos;s Collection
                </Link>
              </li>
              <li>
                <Link href="/women" className="hover:text-white transition-colors">
                  Women&apos;s Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Atelier
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Pakistani Categories */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Signature Silhouettes
            </h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/shop?gender=men&category=Kurta" className="hover:text-white transition-colors">
                  Men&apos;s Embroidered Kurtas
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=men&category=Shalwar+Kameez" className="hover:text-white transition-colors">
                  Wash & Wear Shalwar Kameez
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=men&category=Waistcoats" className="hover:text-white transition-colors">
                  Bespoke Prince Waistcoats
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=women&category=3+Piece" className="hover:text-white transition-colors">
                  Women&apos;s Embroidered Lawn 3 Piece
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=women&category=Abaya" className="hover:text-white transition-colors">
                  Classic Black Dubai Abayas
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=men&category=T-Shirts" className="hover:text-white transition-colors">
                  Premium Cotton T-Shirts & Polos
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Atelier Hours & WhatsApp */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Atelier Schedule
            </h5>
            <div className="space-y-2 text-xs text-neutral-400">
              <p>Monday – Saturday</p>
              <p className="text-white font-medium">11:00 AM – 10:00 PM PKT</p>
              <p className="pt-2">Sunday</p>
              <p className="text-white font-medium">02:00 PM – 09:00 PM PKT</p>
              <div className="pt-3">
                <span className="inline-block px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-emerald-400 font-medium">
                  Atelier Open Today
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} ELIXIR FINE MENSWEAR. All rights reserved. Pakistan.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>Direct Bank Transfer</span>
            <span>·</span>
            <a href={STORE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              WhatsApp: {STORE_PHONE}
            </a>
            <span>·</span>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
