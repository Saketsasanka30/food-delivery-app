import React from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useView } from '../context/ViewContext';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useApp();
  const { openTrackingView } = useView();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Notifications</span><Bell className="w-6 h-6 text-[#FF4D00]" />
          </h1>
          <p className="text-xs text-slate-500 font-medium">Real-time alerts for order status updates and discounts</p>
        </div>
        {notifications.length > 0 && (
          <button onClick={(e) => clearAllNotifications(e)} className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" />Clear All
          </button>
        )}
      </div>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 space-y-2">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-extrabold text-slate-900 text-sm">No notifications</h4>
            <p className="text-xs text-slate-500">You're all caught up!</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} onClick={() => { markNotificationAsRead(notif.id); if (notif.orderId) openTrackingView(notif.orderId); }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${!notif.read ? 'bg-orange-50/70 border-orange-200' : 'bg-white border-slate-100'}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{notif.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">{notif.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block font-bold">{notif.timestamp}</span>
                </div>
                {!notif.read && <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] shrink-0 mt-1" />}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
