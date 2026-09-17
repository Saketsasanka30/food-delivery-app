import React from 'react';
import { Home, Search, ShoppingBag, Percent, User as UserIcon } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { useCart } from '../../context/CartContext';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView, setIsCartOpen } = useView();
  const { totalItemCount, total, cartRestaurantName } = useCart();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'offers', label: 'Offers', icon: Percent },
    { id: 'profile', label: 'Profile', icon: UserIcon }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      {/* Floating Cart Banner on Mobile */}
      {totalItemCount > 0 && currentView !== 'checkout' && (
        <div className="px-4 pb-2">
          <div
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#FF4D00] text-white p-3 rounded-2xl shadow-xl flex items-center justify-between cursor-pointer animate-slide-up hover:bg-[#E04400] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                {totalItemCount}
              </div>
              <div className="text-xs">
                <div className="font-bold truncate max-w-[180px]">{cartRestaurantName}</div>
                <div className="text-white/80 font-medium">View Cart & Checkout</div>
              </div>
            </div>

            <div className="flex items-center gap-2 font-bold text-sm">
              <span>₹{total}</span>
              <span>→</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-lg">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#FF4D00] font-bold scale-105' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
