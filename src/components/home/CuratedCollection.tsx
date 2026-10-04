import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { ProductGrid } from '../product/ProductGrid';
import { CategoryTabs } from '../product/CategoryTabs';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight } from 'lucide-react';

export const CuratedCollection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useRouter();

  const categories = [
    { id: 'all', label: 'All Garments' },
    { id: 'Kurta', label: 'Luxury Kurtas' },
    { id: 'Waistcoats', label: 'Prince Waistcoats' },
    { id: '3 Piece', label: 'Lawn & 3-Piece' },
    { id: 'Shalwar Kameez', label: 'Shalwar Kameez' },
    { id: 'Blazers', label: 'Blazers & Coats' },
  ];

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await productService.getProducts({
          category: activeCategory === 'all' ? undefined : activeCategory,
          limit: 8
        });
        setProducts(data);
      } catch (e) {
        console.error('Failed to load curated collection', e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [activeCategory]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header and Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400">
              Curated Wardrobe
            </span>
            <h2 className="font-brand text-2xl sm:text-3xl text-neutral-900 mt-1">
              Seasonal Highlights
            </h2>
          </div>

          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Product Grid / Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-stone-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <ProductGrid products={products} columns={4} />
        )}

        {/* Bottom CTA */}
        <div className="pt-6 flex justify-center">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/shop')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Complete Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};
