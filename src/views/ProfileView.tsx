import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileView: React.FC = () => {
  const { user, addresses, deleteAddress, activeRole } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payments' | 'settings'>('profile');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-[#1E0E08] text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-[#FF4D00] shadow-lg" />
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl font-black tracking-tight">{user.name}</h1>
          <p className="text-xs text-slate-300 font-medium">{user.email} • {user.phone}</p>
          <div className="pt-2">
            <span className="inline-block bg-[#FF4D00] text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">{activeRole} Account</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200">
        <button onClick={() => setActiveTab('profile')}
          className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 px-3 ${activeTab === 'profile' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Personal Info 👤
        </button>
        <button onClick={() => setActiveTab('addresses')}
          className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 px-3 ${activeTab === 'addresses' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Saved Addresses 📍
        </button>
        <button onClick={() => setActiveTab('payments')}
          className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 px-3 ${activeTab === 'payments' ? 'border-[#FF4D00] text-[#FF4D00]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Payment Methods 💳
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Account Information</h3>
          <div className="space-y-3 text-xs font-semibold text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between"><span className="text-slate-400">Full Name</span><span className="font-bold text-slate-900">{user.name}</span></div>
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between"><span className="text-slate-400">Email Address</span><span className="font-bold text-slate-900">{user.email}</span></div>
            <div className="p-3 bg-slate-50 rounded-xl flex justify-between"><span className="text-slate-400">Phone Number</span><span className="font-bold text-slate-900">{user.phone}</span></div>
          </div>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">Saved Delivery Addresses ({addresses.length})</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map(addr => (
              <div key={addr.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-slate-900">{addr.type}</span>
                  {addresses.length > 1 && (
                    <button onClick={() => deleteAddress(addr.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{addr.street}</p>
                {addr.landmark && <p className="text-[10px] text-slate-400">Landmark: {addr.landmark}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Saved Payment Instruments</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3"><span className="text-2xl">📱</span><div><div className="text-xs font-bold text-slate-900">Google Pay (UPI)</div><div className="text-[10px] text-slate-500">alex.johnson@okicici</div></div></div>
              <span className="text-xs font-bold text-emerald-600">Default ✓</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3"><span className="text-2xl">💳</span><div><div className="text-xs font-bold text-slate-900">HDFC Bank Credit Card</div><div className="text-[10px] text-slate-500">•••• •••• •••• 4912</div></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
