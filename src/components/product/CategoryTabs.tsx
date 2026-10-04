import React from 'react';

interface CategoryTabsProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  className?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  className = '',
}) => {
  return (
    <div className={`overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 ${className}`}>
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-sm scale-[1.02]'
                  : 'bg-stone-100 text-neutral-600 hover:text-neutral-900 hover:bg-stone-200/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
