import React, { useState } from 'react';
import { Shield, TrendingUp, Users, Store, DollarSign } from 'lucide-react';
import { RESTAURANTS_DATA } from '../data/mockData';
import { useOrders } from '../context/OrderContext';
import { useApp } from '../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { orders } = useOrders();
  const { setActiveRole } = useApp();

  const [restaurants, setRestaurants] = useState(RESTAURANTS_DATA);

  const toggleRestaurantOpen = (id: string) => {
    setRestaurants(prev => prev.map(r => (r.id === id ? { ...r, isOpen: !r.isOpen } : r)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-black tracking-tight">Platform Admin Console</h1>
          </div>
          <p className="text-xs text-slate-400 font-medium">Manage restaurants, global platform settings, coupons & live analytics</p>
        </div>
        <button onClick={() => setActiveRole('customer')} className="bg-[#FF4D00] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-[#E04400]">Exit Admin Mode</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Gross Revenue', val: '₹1,84,920', icon: DollarSign, change: '+14.2% vs last month', color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total Orders Placed', val: `${orders.length + 1280}`, icon: TrendingUp, change: '+8.4% growth', color: 'text-[#FF4D00] bg-orange-50' },
          { label: 'Active Restaurants', val: `${restaurants.length}`, icon: Store, change: '100% Operational', color: 'text-blue-600 bg-blue-50' },
          { label: 'Registered Foodies', val: '4,890', icon: Users, change: '+120 today', color: 'text-purple-600 bg-purple-50' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{kpi.label}</span>
                <div className={`p-2 rounded-xl ${kpi.color}`}><Icon className="w-4 h-4" /></div>
              </div>
              <div className="text-2xl font-black text-slate-900">{kpi.val}</div>
              <div className="text-[10px] font-bold text-emerald-600">{kpi.change}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Registered Partner Restaurants</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase tracking-wider">
                <th className="pb-3">Restaurant</th><th className="pb-3">Cuisines</th><th className="pb-3">Rating</th><th className="pb-3">Status</th><th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {restaurants.map(rest => (
                <tr key={rest.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 flex items-center gap-3">
                    <img src={rest.logo} alt={rest.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div><div className="font-bold text-slate-900">{rest.name}</div><div className="text-[10px] text-slate-400">{rest.address}</div></div>
                  </td>
                  <td className="py-3.5 text-slate-600">{rest.cuisines.join(', ')}</td>
                  <td className="py-3.5 font-bold text-amber-700">⭐ {rest.rating}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${rest.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>{rest.isOpen ? 'OPEN' : 'CLOSED'}</span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button onClick={() => toggleRestaurantOpen(rest.id)} className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-100">{rest.isOpen ? 'Close Store' : 'Open Store'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
