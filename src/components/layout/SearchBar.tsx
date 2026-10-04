import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { useRouter } from '../../context/RouterContext';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Live Supabase product search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    let isMounted = true;
    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const found = await productService.getProducts({
          search: query.trim(),
          limit: 8
        });
        if (isMounted) {
          setResults(found);
          setIsSearching(false);
        }
      } catch (err) {
        if (isMounted) setIsSearching(false);
      }
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (product: Product) => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const trendingSearches = [
    'Shalwar Kameez',
    'Embroidered Lawn 3 Piece',
    'Classic Polo Shirt',
    'Classic Black Abaya',
    'Waistcoat',
    'Cotton T-Shirt',
    'Prince Coat',
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-900/60 backdrop-blur-md p-4 sm:p-6 md:p-12 overflow-y-auto">
      {/* Search Container */}
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto transition-all">
        {/* Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-stone-200 gap-3">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-neutral-400 shrink-0 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onClose();
                navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
              }
            }}
            placeholder="Search Pakistani kurtas, lawn suits, waistcoats, fabrics..."
            className="w-full text-sm sm:text-base font-normal placeholder:text-neutral-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-stone-100 rounded-full text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-neutral-500 hover:text-neutral-900 px-2 py-1"
          >
            Close
          </button>
        </div>

        {/* Results Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                Trending Searches in Pakistan
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-stone-100 hover:bg-neutral-900 hover:text-white rounded-full text-xs font-medium text-neutral-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                Supabase Catalog Matches ({results.length})
              </span>
              <div className="divide-y divide-stone-100">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-4 py-3 hover:bg-stone-50 px-2 rounded-2xl transition-colors cursor-pointer group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover rounded-xl bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                        <span className="capitalize font-semibold text-neutral-800">{product.gender}</span>
                        <span>·</span>
                        <span>{product.categoryLabel}</span>
                      </div>
                      <h4 className="font-brand text-sm font-semibold text-neutral-900 truncate group-hover:text-neutral-600">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 truncate">{product.fabric}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-neutral-900 tabular-nums">
                        ₨ {product.price.toLocaleString()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-400 ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 mt-3 border-t border-stone-100 text-center">
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
                  }}
                  className="text-xs font-semibold text-neutral-900 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>View all results for &quot;{query}&quot; in Atelier Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : !isSearching ? (
            <div className="py-8 text-center text-neutral-500 space-y-1">
              <p className="text-sm font-medium text-neutral-800">No garments matched &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-neutral-400">
                Try searching for &quot;Shalwar Kameez&quot;, &quot;Kurta&quot;, &quot;Lawn&quot;, or &quot;Waistcoat&quot;.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
