import React from 'react';
import { Search, Star, Clock, X, RotateCcw } from 'lucide-react';
import { RESTAURANTS_DATA, CUISINES_LIST } from '../data/mockData';
import { RestaurantCard } from '../components/home/RestaurantCard';
import { FoodCard } from '../components/home/FoodCard';
import { useView } from '../context/ViewContext';
import type { MenuItem, Restaurant } from '../types';

export const SearchView: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCuisine, setSelectedCuisine } = useView();

  const [minRating, setMinRating] = React.useState<number | null>(null);
  const [vegOnly, setVegOnly] = React.useState(false);
  const [offersOnly, setOffersOnly] = React.useState(false);
  const [under30Mins, setUnder30Mins] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'recommended' | 'rating' | 'delivery' | 'price'>('recommended');

  const [recentSearches, setRecentSearches] = React.useState<string[]>([
    'Royal Chicken Biryani',
    'Wood-Fired Pizza',
    'Vegetarian Thali',
    'Desi Butter Chicken'
  ]);

  const trendingTags = ['Biryani', 'Pizza', 'Burger', 'Vegetarian food', 'Healthy food', 'Desserts'];

  const filteredRestaurants = RESTAURANTS_DATA.filter(rest => {
    if (selectedCuisine !== 'all') {
      const selectedName = CUISINES_LIST.find(c => c.id === selectedCuisine)?.name.toLowerCase();
      if (selectedName && !rest.cuisines.some(c => c.toLowerCase().includes(selectedName))) {
        return false;
      }
    }
    if (minRating && rest.rating < minRating) return false;
    if (under30Mins) {
      const mins = parseInt(rest.deliveryTime.split('-')[0]) || 30;
      if (mins > 25) return false;
    }
    if (offersOnly && !rest.featuredOffer) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = rest.name.toLowerCase().includes(q);
      const matchCuisine = rest.cuisines.some(c => c.toLowerCase().includes(q));
      const matchItem = rest.categories.some(cat => cat.items.some(i => i.name.toLowerCase().includes(q)));
      return matchName || matchCuisine || matchItem;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'delivery') return (parseInt(a.deliveryTime) || 30) - (parseInt(b.deliveryTime) || 30);
    if (sortBy === 'price') return a.priceForTwo - b.priceForTwo;
    return 0;
  });

  const matchingFoodItems: { item: MenuItem; restaurant: Restaurant }[] = [];
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    RESTAURANTS_DATA.forEach(rest => {
      rest.categories.forEach(cat => {
        cat.items.forEach(item => {
          if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
            if (!vegOnly || item.isVeg) {
              matchingFoodItems.push({ item, restaurant: rest });
            }
          }
        });
      });
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search for restaurants, dishes or cuisines..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3.5 bg-white rounded-2xl border-2 border-slate-200 text-slate-900 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-[#FF4D00] shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'recommended' | 'rating' | 'delivery' | 'price')}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none shrink-0"
        >
          <option value="recommended">Sort: Recommended</option>
          <option value="rating">Sort: Top Rated</option>
          <option value="delivery">Sort: Fastest Delivery</option>
          <option value="price">Sort: Price (Low to High)</option>
        </select>

        <button
          onClick={() => setMinRating(minRating === 4.5 ? null : 4.5)}
          className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            minRating === 4.5 ? 'bg-[#FF4D00] text-white' : 'bg-white border border-slate-200 text-slate-700'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>4.5+ Rating</span>
        </button>

        <button
          onClick={() => setUnder30Mins(!under30Mins)}
          className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            under30Mins ? 'bg-[#FF4D00] text-white' : 'bg-white border border-slate-200 text-slate-700'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Under 25 mins</span>
        </button>

        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            vegOnly ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-emerald-700'
          }`}
        >
          🌱 Pure Veg
        </button>

        <button
          onClick={() => setOffersOnly(!offersOnly)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            offersOnly ? 'bg-amber-500 text-white' : 'bg-white border border-slate-200 text-slate-700'
          }`}
        >
          🏷️ Great Offers
        </button>
      </div>

      {!searchQuery && (
        <div className="space-y-6 pt-2">
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Trending Searches 🔥</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3.5 py-2 rounded-full bg-orange-50 hover:bg-orange-100 text-[#FF4D00] border border-orange-200 text-xs font-bold transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Recent Searches</h3>
                <button onClick={() => setRecentSearches([])} className="text-xs font-bold text-slate-400 hover:text-slate-600">Clear</button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(item)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-slate-400" />
                      <span>{item}</span>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {matchingFoodItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900">Matching Dishes ({matchingFoodItems.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingFoodItems.map(({ item, restaurant }) => (
              <FoodCard key={item.id} item={item} restaurant={restaurant} />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">
          Restaurants ({filteredRestaurants.length})
        </h3>

        {filteredRestaurants.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <div className="text-4xl">🔍</div>
            <h4 className="text-lg font-extrabold text-slate-900">No matching restaurants found</h4>
            <p className="text-xs text-slate-500">Try adjusting your filters or search for something else.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCuisine('all');
                setMinRating(null);
                setVegOnly(false);
              }}
              className="bg-[#FF4D00] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
