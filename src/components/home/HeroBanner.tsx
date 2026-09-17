import React from 'react';
import { Search, Sparkles, Flame } from 'lucide-react';
import { FEATURED_OFFERS } from '../../data/mockData';
import { useView } from '../../context/ViewContext';

export const HeroBanner: React.FC = () => {
  const { setSearchQuery, setCurrentView } = useView();

  return (
    <div className="space-y-6">
      {/* Hero Welcome Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#1E0E08] text-white p-6 sm:p-10 shadow-2xl border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4D00]/20 border border-[#FF4D00]/40 text-[#FF4D00] font-bold text-xs tracking-wide">
            <Flame className="w-4 h-4 fill-[#FF4D00]" />
            Fastest Food Delivery in Town
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Delicious meals delivered to your door <span className="text-[#FF4D00]">in 20 mins.</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-normal max-w-lg leading-relaxed">
            Discover top-rated local restaurants, authentic cuisines, and exclusive deals crafted for your taste.
          </p>

          {/* Large Hero Search Input */}
          <div className="pt-2 max-w-lg">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for restaurants, dishes or cuisines (e.g., Biryani, Pizza)"
                onClick={() => setCurrentView('search')}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentView('search');
                }}
                className="w-full pl-12 pr-28 py-3.5 bg-white text-slate-900 rounded-2xl text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#FF4D00]/30 shadow-lg"
              />
              <button
                onClick={() => setCurrentView('search')}
                className="absolute right-2 bg-[#FF4D00] hover:bg-[#E04400] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D00]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Featured Offers Carousel / Banner Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURED_OFFERS.map(offer => (
          <div
            key={offer.id}
            onClick={() => setCurrentView('offers')}
            className="group relative rounded-2xl overflow-hidden h-36 bg-slate-900 cursor-pointer border border-slate-800 shadow-md hover:shadow-xl transition-all"
          >
            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-between">
              <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider self-start">
                {offer.badge}
              </span>
              <div>
                <h4 className="text-white font-extrabold text-base leading-snug group-hover:text-[#FF4D00] transition-colors">
                  {offer.title}
                </h4>
                <p className="text-slate-300 text-xs font-semibold mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  Code: <span className="text-amber-400 font-bold">{offer.code}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
