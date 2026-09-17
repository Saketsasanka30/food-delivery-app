import React, { useState } from 'react';
import { ShoppingBag, RotateCcw } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useView } from '../context/ViewContext';

export const OrdersView: React.FC = () => {
  const { orders, reorder, cancelOrder } = useOrders();
  const { openTrackingView, openRestaurantView, setCurrentView } = useView();

  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'active') return o.status !== 'Delivered' && o.status !== 'Cancelled';
    if (activeTab === 'completed') return o.status === 'Delivered';
    if (activeTab === 'cancelled') return o.status === 'Cancelled';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your Orders</h1>
          <p className="text-xs text-slate-500 font-medium">Manage order history, track live orders and reorder your favorites</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200">
        <button onClick={() => setActiveTab('active')}
          className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 px-3 ${activeTab === 'active' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Active Orders 🛵
        </button>
        <button onClick={() => setActiveTab('completed')}
          className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 px-3 ${activeTab === 'completed' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Past Orders 🍽️
        </button>
        <button onClick={() => setActiveTab('cancelled')}
          className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 px-3 ${activeTab === 'cancelled' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Cancelled ❌
        </button>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-lg font-extrabold text-slate-900">No {activeTab} orders found</h4>
            <p className="text-xs text-slate-500">Looks like you haven't placed any orders in this section yet.</p>
            <button onClick={() => setCurrentView('home')} className="bg-[#FF4D00] text-white text-xs font-bold px-6 py-2.5 rounded-xl">Explore Restaurants</button>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={order.restaurantImage} alt={order.restaurantName} className="w-12 h-12 rounded-2xl object-cover" />
                  <div>
                    <h3 onClick={() => openRestaurantView(order.restaurantId)}
                      className="font-black text-slate-900 text-sm hover:text-[#FF4D00] cursor-pointer transition-colors">{order.restaurantName}</h3>
                    <p className="text-[10px] text-slate-400">Order #{order.orderNumber} • {order.createdAt}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-orange-100 text-[#FF4D00] animate-pulse'
                }`}>{order.status}</span>
              </div>

              <div className="text-xs space-y-1">
                {order.items.map(item => (
                  <div key={item.cartItemId} className="flex justify-between text-slate-700 font-medium">
                    <span>{item.quantity}x {item.menuItem.name}</span>
                    <span className="font-bold text-slate-900">₹{item.itemTotal}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="font-black text-slate-900 text-sm">Total Paid: <span className="text-[#FF4D00]">₹{order.total}</span></div>
                <div className="flex items-center gap-2">
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' ? (
                    <>
                      <button onClick={() => openTrackingView(order.id)}
                        className="bg-[#FF4D00] text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md hover:bg-[#E04400]">Track Order 🛵</button>
                      <button onClick={() => cancelOrder(order.id, 'User cancelled from order history')}
                        className="bg-slate-100 text-slate-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-red-50 hover:text-red-600">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => { reorder(order.id); alert('Items added to cart!'); }}
                      className="flex items-center gap-1 bg-slate-900 text-white font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-[#FF4D00] transition-colors">
                      <RotateCcw className="w-3.5 h-3.5" /><span>Reorder</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
