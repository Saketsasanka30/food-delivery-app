import React, { useState } from 'react';
import { Heart, Share2, Star, Clock, MapPin, Sparkles, ChevronLeft, Search } from 'lucide-react';
import { RESTAURANTS_DATA } from '../data/mockData';
import { FoodCard } from '../components/home/FoodCard';
import { RatingBadge } from '../components/common/Badge';
import { useView } from '../context/ViewContext';
import { useApp } from '../context/AppContext';

export const RestaurantDetailView: React.FC = () => {
  const { selectedRestaurantId, setCurrentView } = useView();
  const { isRestaurantFavorite, toggleFavoriteRestaurant } = useApp();

  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'about'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);

  const restaurant = RESTAURANTS_DATA.find(r => r.id === selectedRestaurantId) || RESTAURANTS_DATA[0];
  const isFav = isRestaurantFavorite(restaurant.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: restaurant.name, text: `Check out ${restaurant.name} on Feastly!`, url: window.location.href }).catch(() => {});
    } else {
      alert(`Link copied: ${restaurant.name} on Feastly!`);
    }
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentView('home')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
          <ChevronLeft className="w-4 h-4" /><span>Back to Home</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => toggleFavoriteRestaurant(restaurant.id)} className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
            <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
        <div className="relative h-60 sm:h-72 w-full bg-slate-900">
          <img src={restaurant.heroImage} alt={restaurant.name} className="w-full h-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          {restaurant.featuredOffer && (
            <div className="absolute top-4 left-4 bg-[#FF4D00] text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 fill-white" /><span>{restaurant.featuredOffer}</span>
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="flex items-center gap-4 text-white">
              <img src={restaurant.logo} alt={restaurant.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white object-cover shadow-xl shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{restaurant.name}</h1>
                <p className="text-slate-300 text-xs sm:text-sm font-medium">{restaurant.tagline}</p>
                <p className="text-slate-400 text-xs mt-1">{restaurant.cuisines.join(' • ')}</p>
              </div>
            </div>
            <RatingBadge rating={restaurant.rating} count={restaurant.ratingCount} size="lg" />
          </div>
        </div>
        <div className="p-4 sm:p-6 bg-slate-50 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#FF4D00]" /><span>{restaurant.deliveryTime}</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /><span>{restaurant.distance}</span></div>
            <div>₹{restaurant.priceForTwo} for two</div>
          </div>
          <div className="text-slate-500 font-medium">📍 {restaurant.address}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-slate-200">
        <button onClick={() => setActiveTab('menu')}
          className={`pb-3 text-sm font-extrabold transition-all border-b-2 ${activeTab === 'menu' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Full Menu 🍕
        </button>
        <button onClick={() => setActiveTab('reviews')}
          className={`pb-3 text-sm font-extrabold transition-all border-b-2 ${activeTab === 'reviews' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Customer Reviews ({restaurant.reviews.length}) ⭐
        </button>
        <button onClick={() => setActiveTab('about')}
          className={`pb-3 text-sm font-extrabold transition-all border-b-2 ${activeTab === 'about' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          About & Gallery ℹ️
        </button>
      </div>

      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search within menu..." value={menuSearchQuery} onChange={e => setMenuSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#FF4D00]" />
            </div>
            <button onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${vegOnlyFilter ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'}`}>
              🌱 Veg Only Filter
            </button>
          </div>

          <div className="sticky top-18 z-20 bg-white/95 backdrop-blur-md py-2 border-y border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button onClick={() => setSelectedCategory(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === null ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
              All Categories
            </button>
            {restaurant.categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat.id ? 'bg-[#FF4D00] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                {cat.name} ({cat.items.length})
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {restaurant.categories.filter(cat => selectedCategory === null || cat.id === selectedCategory).map(cat => {
              const visibleItems = cat.items.filter(item => {
                if (vegOnlyFilter && !item.isVeg) return false;
                if (menuSearchQuery.trim()) return item.name.toLowerCase().includes(menuSearchQuery.toLowerCase());
                return true;
              });
              if (visibleItems.length === 0) return null;
              return (
                <div key={cat.id} className="space-y-4">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                    <span>{cat.name}</span><span className="text-xs font-bold text-slate-400">({visibleItems.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleItems.map(item => (<FoodCard key={item.id} item={item} restaurant={restaurant} />))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-slate-900">{restaurant.rating}</span>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map(star => (<Star key={star} className="w-4 h-4 fill-amber-400 stroke-none" />))}
                </div>
                <p className="text-xs text-slate-500 font-medium">Based on {restaurant.ratingCount} verified orders</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {restaurant.reviews.map(rev => (
              <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover" />
                    <div><h5 className="font-bold text-slate-900 text-xs">{rev.userName}</h5><span className="text-[10px] text-slate-400">{rev.date}</span></div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <span>{rev.rating}</span><Star className="w-3 h-3 fill-amber-500 stroke-none" />
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-3">
            <h3 className="font-extrabold text-slate-900 text-base">About {restaurant.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">{restaurant.about}</p>
          </div>
          {restaurant.photos.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 text-base">Photo Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {restaurant.photos.map((photo, idx) => (
                  <div key={idx} className="h-40 rounded-2xl overflow-hidden bg-slate-100">
                    <img src={photo} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
