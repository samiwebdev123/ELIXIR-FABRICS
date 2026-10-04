import React from 'react';
import { Link } from '../../context/RouterContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
  className?: string;
  isLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  className = '',
  isLink = true,
}) => {
  const isLight = variant === 'light';

  // Size scalers
  const sizeMap = {
    sm: {
      brand: 'text-base tracking-[0.24em]',
      sub: 'text-[8px] tracking-[0.32em] mt-0.5',
    },
    md: {
      brand: 'text-xl sm:text-2xl tracking-[0.28em]',
      sub: 'text-[9px] sm:text-[10px] tracking-[0.36em] mt-1',
    },
    lg: {
      brand: 'text-2xl sm:text-3xl tracking-[0.3em]',
      sub: 'text-[11px] sm:text-[12px] tracking-[0.4em] mt-1.5',
    },
    xl: {
      brand: 'text-3xl sm:text-4xl md:text-5xl tracking-[0.32em]',
      sub: 'text-[12px] sm:text-[14px] tracking-[0.45em] mt-2.5',
    },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      <span
        className={`font-brand font-medium leading-none uppercase transition-colors duration-200 ${
          isLight ? 'text-white' : 'text-neutral-900'
        } ${currentSize.brand}`}
      >
        ELIXIR
      </span>
      {showSubtitle && (
        <span
          className={`font-sans font-medium uppercase transition-colors duration-200 ${
            isLight ? 'text-neutral-300' : 'text-neutral-500'
          } ${currentSize.sub}`}
        >
          FINE MENSWEAR
        </span>
      )}
    </div>
  );

  if (!isLink) {
    return content;
  }

  return (
    <Link href="/" className="inline-block group focus-visible:outline-none">
      {content}
    </Link>
  );
};
