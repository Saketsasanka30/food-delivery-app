import React from 'react';
import { Sparkles, Flame, Clock } from 'lucide-react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryList } from '../components/home/CategoryList';
import { RestaurantCard } from '../components/home/RestaurantCard';
import { RESTAURANTS_DATA } from '../data/mockData';
import { useView } from '../context/ViewContext';

export const HomeView: React.FC = () => {
  const { setCurrentView } = useView();

  const recommendedRestaurants = RESTAURANTS_DATA.filter(r => r.rating >= 4.7);
  const topRatedRestaurants = RESTAURANTS_DATA.slice(0, 6);
  const fastDeliveryRestaurants = [...RESTAURANTS_DATA].sort((a, b) => {
    return (parseInt(a.deliveryTime) || 30) - (parseInt(b.deliveryTime) || 30);
  });

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <HeroBanner />
      <CategoryList />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-100 text-[#FF4D00]">
              <Sparkles className="w-5 h-5 fill-[#FF4D00]" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recommended For You</h2>
              <p className="text-xs text-slate-500 font-medium">Curated based on your taste & popular orders in your area</p>
            </div>
          </div>
          <button onClick={() => setCurrentView('search')} className="text-xs font-bold text-[#FF4D00] hover:underline">See All →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedRestaurants.slice(0, 3).map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-red-100 text-red-600">
            <Flame className="w-5 h-5 fill-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Popular Near You 🔥</h2>
            <p className="text-xs text-slate-500 font-medium">Top picks with highest order volume today</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Super Fast Delivery 🚀</h2>
            <p className="text-xs text-slate-500 font-medium">Delivered in 25 minutes or less</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fastDeliveryRestaurants.slice(0, 3).map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </div>
  );
};
