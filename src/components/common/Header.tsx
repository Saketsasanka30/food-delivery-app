import React, { useState } from 'react';
import { MapPin, Search, ShoppingBag, Heart, Bell, Sparkles, ChevronDown, Shield, UtensilsCrossed } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import { useView } from '../../context/ViewContext';
import type { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { user, activeRole, setActiveRole, activeAddress, addresses, setActiveAddress, unreadNotificationCount } = useApp();
  const { totalItemCount, total } = useCart();
  const { currentView, setCurrentView, setIsCartOpen, setIsAiAssistantOpen, setSearchQuery } = useView();

  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    setShowRoleDropdown(false);
    if (role === 'admin') setCurrentView('admin');
    else if (role === 'restaurant') setCurrentView('partner');
    else setCurrentView('home');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D00] to-[#FF7A00] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#FF4D00] transition-colors">
                Feastly<span className="text-[#FF4D00]">.</span>
              </span>
            </div>
          </button>

          {/* Location Picker */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowAddressDropdown(!showAddressDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#FF4D00] shrink-0" />
              <span className="font-bold text-slate-900">{activeAddress.type}:</span>
              <span className="max-w-[140px] truncate">{activeAddress.street}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showAddressDropdown && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
                <p className="text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">Select Delivery Location</p>
                {addresses.map(addr => (
                  <button
                    key={addr.id}
                    onClick={() => {
                      setActiveAddress(addr);
                      setShowAddressDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-start gap-2.5 hover:bg-orange-50 transition-colors ${
                      activeAddress.id === addr.id ? 'bg-orange-50/80 font-semibold text-[#FF4D00]' : 'text-slate-700'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#FF4D00] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{addr.type}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">{addr.street}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Global Search Quick Trigger */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search dishes, restaurants or cuisines..."
              onClick={() => {
                if (currentView !== 'search') setCurrentView('search');
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'search') setCurrentView('search');
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-100/90 rounded-full text-sm text-slate-800 placeholder-slate-400 border border-transparent focus:border-[#FF4D00] focus:bg-white focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Action Buttons & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-md hover:opacity-95 hover:scale-105 transition-all"
            title="Ask Feastly AI Food Assistant"
          >
            <Sparkles className="w-4 h-4 fill-amber-300 stroke-none" />
            <span className="hidden sm:inline">AI Food Assistant</span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => setCurrentView('favorites')}
            className={`p-2 rounded-full hover:bg-slate-100 text-slate-700 relative transition-colors ${
              currentView === 'favorites' ? 'bg-orange-50 text-[#FF4D00]' : ''
            }`}
            title="Favorites"
          >
            <Heart className={`w-5 h-5 ${user.favorites.restaurantIds.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setCurrentView('notifications')}
            className={`p-2 rounded-full hover:bg-slate-100 text-slate-700 relative transition-colors ${
              currentView === 'notifications' ? 'bg-orange-50 text-[#FF4D00]' : ''
            }`}
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF4D00] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 text-white text-xs font-bold shadow-xs hover:bg-slate-900 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="capitalize">{activeRole} Mode</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
                <p className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">Switch View Role</p>
                <button
                  onClick={() => handleRoleChange('customer')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between hover:bg-slate-100 ${
                    activeRole === 'customer' ? 'text-[#FF4D00] font-bold bg-orange-50' : 'text-slate-700'
                  }`}
                >
                  <span>Customer View</span>
                  {activeRole === 'customer' && '✓'}
                </button>
                <button
                  onClick={() => handleRoleChange('restaurant')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between hover:bg-slate-100 ${
                    activeRole === 'restaurant' ? 'text-[#FF4D00] font-bold bg-orange-50' : 'text-slate-700'
                  }`}
                >
                  <span>Restaurant Owner</span>
                  {activeRole === 'restaurant' && '✓'}
                </button>
                <button
                  onClick={() => handleRoleChange('admin')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between hover:bg-slate-100 ${
                    activeRole === 'admin' ? 'text-[#FF4D00] font-bold bg-orange-50' : 'text-slate-700'
                  }`}
                >
                  <span>Platform Admin</span>
                  {activeRole === 'admin' && '✓'}
                </button>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FF4D00] text-white font-bold text-xs shadow-md hover:bg-[#E04400] transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {totalItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">₹{total}</span>
          </button>

          {/* Profile Trigger */}
          <button
            onClick={() => setCurrentView('profile')}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 hover:border-[#FF4D00] transition-colors shadow-xs"
            title={user.name}
          >
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
};
