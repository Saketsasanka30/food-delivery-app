import React from 'react';
import { Plus, Minus, Star, Heart } from 'lucide-react';
import type { MenuItem, Restaurant } from '../../types';
import { VegBadge } from '../common/Badge';
import { useCart } from '../../context/CartContext';
import { useView } from '../../context/ViewContext';
import { useApp } from '../../context/AppContext';

interface FoodCardProps {
  item: MenuItem;
  restaurant: Restaurant;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, restaurant }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { openCustomization } = useView();
  const { isItemFavorite, toggleFavoriteItem } = useApp();

  // Check if item is in cart
  const cartEntry = cartItems.find(c => c.menuItem.id === item.id);
  const isFav = isItemFavorite(item.id);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.customizations && item.customizations.length > 0) {
      openCustomization(item, restaurant);
    } else {
      addToCart(item, restaurant.id, restaurant.name, 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all flex gap-4 items-stretch group relative">
      {/* Left: Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <VegBadge isVeg={item.isVeg} size="sm" />
            {item.isBestSeller && (
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 tracking-wide">
                Bestseller
              </span>
            )}
            <button
              onClick={() => toggleFavoriteItem(item.id)}
              className="ml-auto text-slate-300 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#FF4D00] transition-colors line-clamp-1">
            {item.name}
          </h4>

          <div className="flex items-center gap-1 text-xs text-amber-700 font-bold mt-0.5 mb-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
            <span>{item.rating}</span>
            <span className="text-slate-400 font-normal">({item.ratingCount})</span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-black text-slate-900">₹{item.price}</span>
          {item.customizations && item.customizations.length > 0 && (
            <span className="text-[10px] font-semibold text-slate-400">Customizable</span>
          )}
        </div>
      </div>

      {/* Right: Image & Action Button */}
      <div className="relative w-28 sm:w-32 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />

        {/* Add / Stepper Button Container */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 shadow-md">
          {cartEntry ? (
            <div className="bg-[#FF4D00] text-white font-extrabold text-xs px-2 py-1 rounded-xl flex items-center gap-2 border border-white">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(cartEntry.cartItemId, -1);
                }}
                className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span>{cartEntry.quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.customizations && item.customizations.length > 0) {
                    openCustomization(item, restaurant);
                  } else {
                    updateQuantity(cartEntry.cartItemId, 1);
                  }
                }}
                className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              className="bg-white hover:bg-orange-50 text-[#FF4D00] border-2 border-[#FF4D00] font-black text-xs px-4 py-1.5 rounded-xl uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
