import React from 'react';
import { Star } from 'lucide-react';

interface VegBadgeProps {
  isVeg: boolean;
  size?: 'sm' | 'md';
}

export const VegBadge: React.FC<VegBadgeProps> = ({ isVeg, size = 'md' }) => {
  const boxSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  return (
    <div
      className={`${boxSize} flex items-center justify-center rounded-sm ${
        isVeg ? 'veg-border' : 'non-veg-border'
      } bg-white shrink-0`}
      title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <div className={`${dotSize} rounded-full ${isVeg ? 'veg-dot' : 'non-veg-dot'}`} />
    </div>
  );
};

interface RatingBadgeProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, count, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-0.5 gap-1.5 font-semibold',
    lg: 'text-base px-3 py-1 gap-2 font-bold'
  }[size];

  return (
    <div className={`inline-flex items-center rounded-md bg-emerald-700 text-white shadow-xs ${sizeClasses}`}>
      <span>{rating.toFixed(1)}</span>
      <Star className="w-3.5 h-3.5 fill-white stroke-none" />
      {count && <span className="opacity-80 font-normal text-xs">({count})</span>}
    </div>
  );
};

interface TagBadgeProps {
  label: string;
  variant?: 'orange' | 'green' | 'blue' | 'purple';
}

export const TagBadge: React.FC<TagBadgeProps> = ({ label, variant = 'orange' }) => {
  const variantStyles = {
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200'
  }[variant];

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${variantStyles}`}>
      {label}
    </span>
  );
};
