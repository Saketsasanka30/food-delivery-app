import React from 'react';
import { Heart } from 'lucide-react';
import { RESTAURANTS_DATA } from '../data/mockData';
import { RestaurantCard } from '../components/home/RestaurantCard';
import { useApp } from '../context/AppContext';
import { useView } from '../context/ViewContext';

export const FavoritesView: React.FC = () => {
  const { user } = useApp();
  const { setCurrentView } = useView();

  const favoriteRestaurants = RESTAURANTS_DATA.filter(r => user.favorites.restaurantIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Your Favorites</span>
          <Heart className="w-6 h-6 fill-red-500 text-red-500" />
        </h1>
        <p className="text-xs text-slate-500 font-medium">Quick access to your saved favorite restaurants and dishes</p>
      </div>

      {favoriteRestaurants.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 space-y-3">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-lg font-extrabold text-slate-900">No favorite restaurants yet</h4>
          <p className="text-xs text-slate-500">Click the heart icon on any restaurant card to save it here for quick ordering.</p>
          <button onClick={() => setCurrentView('home')} className="bg-[#FF4D00] text-white text-xs font-bold px-6 py-2.5 rounded-xl">
            Explore Restaurants
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};
