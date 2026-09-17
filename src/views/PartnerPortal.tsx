import React, { useState } from 'react';
import { RESTAURANTS_DATA } from '../data/mockData';
import { useOrders } from '../context/OrderContext';
import { useApp } from '../context/AppContext';

export const PartnerPortal: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { setActiveRole } = useApp();

  const myRestaurant = RESTAURANTS_DATA[0];
  const [menuItems, setMenuItems] = useState(myRestaurant.categories[0].items);

  const toggleStock = (itemId: string) => {
    setMenuItems(prev => prev.map(i => (i.id === itemId ? { ...i, inStock: !i.inStock } : i)));
  };

  const incomingOrders = orders.filter(o => o.restaurantId === myRestaurant.id || true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-amber-950 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <img src={myRestaurant.logo} alt={myRestaurant.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-white" />
          <div>
            <h1 className="text-2xl font-black tracking-tight">{myRestaurant.name} - Owner Portal</h1>
            <p className="text-xs text-amber-200 font-medium">Manage live kitchen orders, menu stock & prep times</p>
          </div>
        </div>
        <button onClick={() => setActiveRole('customer')} className="bg-[#FF4D00] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-[#E04400]">Exit Owner Mode</button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Live Kitchen Orders</h3>
        <div className="space-y-4">
          {incomingOrders.map(order => (
            <div key={order.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900">Order #{order.orderNumber}</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF4D00]">{order.status}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{order.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}</p>
                <div className="text-[10px] text-slate-400">Total: ₹{order.total} • Customer: {order.deliveryAddress.name} ({order.deliveryAddress.phone})</div>
              </div>
              <div className="flex items-center gap-2">
                {order.status === 'Order Placed' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Restaurant Confirmed')} className="bg-emerald-600 text-white font-extrabold text-xs px-4 py-2 rounded-xl">Accept Order ✓</button>
                )}
                {order.status === 'Restaurant Confirmed' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Preparing')} className="bg-orange-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl">Start Preparing 🍳</button>
                )}
                {order.status === 'Preparing' && (
                  <button onClick={() => updateOrderStatus(order.id, 'Driver Picked Up')} className="bg-blue-600 text-white font-extrabold text-xs px-4 py-2 rounded-xl">Hand to Driver 🛵</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Menu Item Stock Management</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {menuItems.map(item => (
            <div key={item.id} className="p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                <div><div className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</div><div className="text-[10px] text-slate-500">₹{item.price}</div></div>
              </div>
              <button onClick={() => toggleStock(item.id)}
                className={`px-3 py-1 rounded-xl text-[10px] font-extrabold border ${item.inStock ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
