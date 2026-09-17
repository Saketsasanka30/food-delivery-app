import React from 'react';
import { CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useView } from '../context/ViewContext';
import { MapView } from '../components/common/MapView';
import type { OrderStatus } from '../types';

export const LiveTracker: React.FC = () => {
  const { orders, activeOrder } = useOrders();
  const { selectedTrackingOrderId, setCurrentView } = useView();

  const currentOrder = selectedTrackingOrderId
    ? orders.find(o => o.id === selectedTrackingOrderId)
    : activeOrder || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">No active order to track</h3>
        <button onClick={() => setCurrentView('home')} className="bg-[#FF4D00] text-white text-xs font-bold px-6 py-3 rounded-2xl">
          Back to Home
        </button>
      </div>
    );
  }

  const stages: OrderStatus[] = [
    'Order Placed',
    'Restaurant Confirmed',
    'Preparing',
    'Driver Picked Up',
    'On the Way',
    'Delivered'
  ];

  const currentStageIdx = stages.indexOf(currentOrder.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#1E0E08] text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 fill-emerald-400 stroke-none" />
            <span>Order Confirmed & Live Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Estimated Arrival: 25 mins</h1>
          <p className="text-xs text-slate-300">Order #{currentOrder.orderNumber} • {currentOrder.restaurantName}</p>
        </div>

        <button
          onClick={() => setCurrentView('orders')}
          className="bg-white text-slate-900 font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md hover:bg-orange-50 hover:text-[#FF4D00] transition-colors"
        >
          View Order History
        </button>
      </div>

      {/* Simulated Interactive Map */}
      <div className="space-y-2">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
          <span>Live GPS Driver Map</span>
          <span className="text-xs font-bold text-emerald-600">● Live Route</span>
        </h3>
        <MapView
          restaurantName={currentOrder.restaurantName}
          deliveryAddressName={currentOrder.deliveryAddress.type}
          driverName={currentOrder.driver?.name || 'Vikram Singh'}
          status={currentOrder.status}
          height="h-72"
        />
      </div>

      {/* Timeline Stepper */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
        <h3 className="font-extrabold text-slate-900 text-base">Order Status Progress</h3>

        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          {stages.map((stage, idx) => {
            const isCompleted = idx <= currentStageIdx;
            const isCurrent = idx === currentStageIdx;

            return (
              <div key={stage} className="flex sm:flex-col items-center gap-3 sm:gap-2 z-10 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-[#FF4D00] text-white shadow-md ring-4 ring-orange-100'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>

                <div className="text-left sm:text-center">
                  <div className={`text-xs font-extrabold ${isCurrent ? 'text-[#FF4D00]' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                    {stage}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Partner Card */}
      {currentOrder.driver && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={currentOrder.driver.photo} alt={currentOrder.driver.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 shadow-sm" />
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Delivery Partner</div>
              <h4 className="font-black text-slate-900 text-base">{currentOrder.driver.name}</h4>
              <p className="text-xs text-slate-500 font-medium">{currentOrder.driver.vehicleNumber} • ⭐ {currentOrder.driver.rating}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Calling driver ${currentOrder.driver?.name} at ${currentOrder.driver?.phone}...`)}
              className="p-3 rounded-2xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors shadow-xs"
              title="Call Driver"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={() => alert(`Opening chat with driver ${currentOrder.driver?.name}...`)}
              className="p-3 rounded-2xl bg-orange-100 text-[#FF4D00] hover:bg-orange-200 transition-colors shadow-xs"
              title="Message Driver"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Order Summary Details */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Order Details ({currentOrder.items.length} items)</h3>
        <div className="space-y-3">
          {currentOrder.items.map(item => (
            <div key={item.cartItemId} className="flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900">{item.quantity}x {item.menuItem.name}</span>
                {item.size && <span className="text-slate-400 ml-1">({item.size.name})</span>}
              </div>
              <span className="font-extrabold text-slate-900">₹{item.itemTotal}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm font-black text-slate-900">
          <span>Total Amount Paid ({currentOrder.paymentMethod})</span>
          <span className="text-[#FF4D00]">₹{currentOrder.total}</span>
        </div>
      </div>
    </div>
  );
};
