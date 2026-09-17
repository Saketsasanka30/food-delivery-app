import React from 'react';
import { Heart, Clock, MapPin, Sparkles } from 'lucide-react';
import type { Restaurant } from '../../types';
import { RatingBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { useView } from '../../context/ViewContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { isRestaurantFavorite, toggleFavoriteRestaurant } = useApp();
  const { openRestaurantView } = useView();

  const isFav = isRestaurantFavorite(restaurant.id);

  return (
    <div
      onClick={() => openRestaurantView(restaurant.id)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    >
      {/* Hero Image Container */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img
          src={restaurant.heroImage}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

        {/* Featured Offer Badge Overlay */}
        {restaurant.featuredOffer && (
          <div className="absolute bottom-3 left-3 bg-[#FF4D00] text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>{restaurant.featuredOffer}</span>
          </div>
        )}

        {/* Promoted Badge */}
        {restaurant.isPromoted && (
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-semibold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-widest border border-slate-700">
            Ad
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteRestaurant(restaurant.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md hover:scale-110 active:scale-95 transition-all z-10"
        >
          <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'stroke-[2]'}`} />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#FF4D00] transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <RatingBadge rating={restaurant.rating} count={restaurant.ratingCount} size="sm" />
          </div>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
            {restaurant.cuisines.join(' • ')}
          </p>
        </div>

        {/* Meta Info Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#FF4D00]" />
            <span>{restaurant.deliveryTime}</span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{restaurant.distance}</span>
          </div>

          <div className="text-slate-800 font-bold">
            ₹{restaurant.priceForTwo} for two
          </div>
        </div>
      </div>
    </div>
  );
};
