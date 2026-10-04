import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No garments match the selected filters.',
  columns = 4,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200">
        <p className="text-base font-semibold text-neutral-800 font-brand">No Garments Found</p>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  // 2 columns on mobile, 3 on tablet, 4 on desktop
  const gridClasses = {
    2: 'grid grid-cols-2 gap-3 sm:gap-6',
    3: 'grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6',
    4: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6',
  };

  return (
    <div className={gridClasses[columns]}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
