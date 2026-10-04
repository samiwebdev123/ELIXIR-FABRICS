import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  title,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[activeIndex] || images[0];
  const isCurrentFailed = failedImages[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image / Mobile Full-Width Carousel */}
      <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-[#F3F2ED] border border-stone-200 shadow-xs">
        {!isCurrentFailed && currentImage ? (
          <img
            src={currentImage}
            alt={`${title} - view ${activeIndex + 1}`}
            referrerPolicy="no-referrer"
            onError={() => setFailedImages((prev) => ({ ...prev, [activeIndex]: true }))}
            className="w-full h-full object-cover object-top transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-100 text-neutral-400">
            <ShoppingBag className="w-16 h-16 stroke-1 text-stone-300 mb-2" />
            <span className="text-xs font-brand tracking-widest uppercase text-neutral-500">
              ELIXIR ATELIER
            </span>
            <span className="text-xs text-neutral-400 mt-1">{title}</span>
          </div>
        )}

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-md backdrop-blur-xs transition-all active:scale-95"
              aria-label="Previous view"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-md backdrop-blur-xs transition-all active:scale-95"
              aria-label="Next view"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter indicator */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-medium rounded-full tabular-nums">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[3/4] w-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-[#F3F2ED] ${
                activeIndex === idx
                  ? 'border-neutral-900 shadow-sm scale-102 ring-1 ring-neutral-900'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              {!failedImages[idx] ? (
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImages((prev) => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-100 text-[10px] text-neutral-400">
                  {idx + 1}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
