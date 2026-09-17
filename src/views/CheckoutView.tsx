import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ChevronLeft, ShieldCheck, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { useOrders } from '../context/OrderContext';
import { useView } from '../context/ViewContext';

export const CheckoutView: React.FC = () => {
  const { cartItems, cartRestaurantName, subtotal, deliveryFee, taxes, discount, total } = useCart();
  const { addresses, activeAddress, setActiveAddress, addAddress } = useApp();
  const { placeOrder } = useOrders();
  const { setCurrentView, openTrackingView } = useView();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(activeAddress.id);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Wallet' | 'COD'>('UPI');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  const [newAddrType, setNewAddrType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrLandmark, setNewAddrLandmark] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Your cart is empty</h3>
        <p className="text-xs text-slate-500">Please add items to your cart before proceeding to checkout.</p>
        <button onClick={() => setCurrentView('home')} className="bg-[#FF4D00] text-white text-xs font-bold px-6 py-3 rounded-2xl">
          Return to Home
        </button>
      </div>
    );
  }

  const currentAddress = addresses.find(a => a.id === selectedAddressId) || activeAddress;

  const handlePlaceOrder = () => {
    const createdOrder = placeOrder(currentAddress, paymentMethod, deliveryInstructions);
    openTrackingView(createdOrder.id);
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet.trim()) return;
    addAddress({
      type: newAddrType,
      name: activeAddress.name,
      phone: activeAddress.phone,
      street: newAddrStreet,
      landmark: newAddrLandmark,
      city: 'Mumbai',
      pincode: '400001',
      isDefault: true
    });
    setShowAddAddressModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <button onClick={() => setCurrentView('home')} className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Checkout</h1>
          <p className="text-xs text-slate-500 font-medium">Order from <span className="font-bold text-slate-800">{cartRestaurantName}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF4D00] flex items-center justify-center font-extrabold text-xs">1</div>
                <h3 className="font-black text-slate-900 text-base">Select Delivery Address</h3>
              </div>
              <button onClick={() => setShowAddAddressModal(true)} className="text-xs font-bold text-[#FF4D00] hover:underline flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />Add New Address
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map(addr => {
                const isSelected = addr.id === selectedAddressId;
                return (
                  <div key={addr.id} onClick={() => { setSelectedAddressId(addr.id); setActiveAddress(addr); }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'bg-orange-50/80 border-[#FF4D00] shadow-sm' : 'bg-white border-slate-200 hover:border-orange-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">{addr.type}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF4D00]" />}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{addr.street}</p>
                    {addr.landmark && <p className="text-[10px] text-slate-400 mt-0.5">Landmark: {addr.landmark}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Instructions */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF4D00] flex items-center justify-center font-extrabold text-xs">2</div>
              <h3 className="font-black text-slate-900 text-base">Delivery Instructions</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Leave at door', 'Avoid calling', 'Ring doorbell', 'Pet on premises'].map(tag => (
                <button key={tag} onClick={() => setDeliveryInstructions(prev => (prev.includes(tag) ? prev.replace(tag, '').trim() : `${prev} ${tag}`.trim()))}
                  className={`p-2.5 rounded-xl border text-[11px] font-semibold text-center transition-all ${deliveryInstructions.includes(tag) ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF4D00] flex items-center justify-center font-extrabold text-xs">3</div>
              <h3 className="font-black text-slate-900 text-base">Select Payment Method</h3>
            </div>
            <div className="space-y-3">
              {([
                { id: 'UPI' as const, label: 'Instant UPI (Google Pay, PhonePe, Paytm)', icon: '📱', desc: 'Zero transaction fee' },
                { id: 'Card' as const, label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                { id: 'Wallet' as const, label: 'Feastly Pay Wallet', icon: '👛', desc: 'Balance: ₹1,250' },
                { id: 'COD' as const, label: 'Cash on Delivery', icon: '💵', desc: 'Pay cash or UPI upon delivery' }
              ]).map(pm => (
                <label key={pm.id} onClick={() => setPaymentMethod(pm.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === pm.id ? 'bg-orange-50/80 border-[#FF4D00] shadow-sm' : 'bg-white border-slate-200 hover:border-orange-200'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{pm.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{pm.label}</div>
                      <div className="text-[10px] text-slate-500">{pm.desc}</div>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === pm.id} onChange={() => {}} className="accent-[#FF4D00] w-4 h-4" />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-4 sticky top-24">
            <h3 className="font-black text-slate-900 text-base pb-3 border-b border-slate-100">Order Summary</h3>
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#FF4D00]">{item.quantity}x</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[140px]">{item.menuItem.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-900">₹{item.itemTotal}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Delivery Fee</span><span>{deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span></div>
              <div className="flex justify-between"><span>Taxes & Packaging</span><span>₹{taxes}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald-700 font-bold"><span>Coupon Discount</span><span>-₹{discount}</span></div>}
              <div className="flex justify-between items-center text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total Amount</span><span className="text-xl text-[#FF4D00]">₹{total}</span>
              </div>
            </div>
            <button onClick={handlePlaceOrder}
              className="w-full bg-[#FF4D00] hover:bg-[#E04400] text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-xl flex items-center justify-between transition-all hover:scale-[1.02] active:scale-95">
              <span>Pay & Place Order</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /><span>100% Encrypted & Safe Payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Add New Delivery Address</h3>
            <form onSubmit={handleSaveNewAddress} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Address Type</label>
                <div className="flex gap-2 mt-1">
                  {(['Home', 'Work', 'Other'] as const).map(type => (
                    <button type="button" key={type} onClick={() => setNewAddrType(type)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${newAddrType === type ? 'bg-[#FF4D00] text-white border-[#FF4D00]' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Street / Flat / House No.</label>
                <input type="text" required placeholder="e.g. Flat 302, Sunrise Towers, Linking Road" value={newAddrStreet} onChange={e => setNewAddrStreet(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#FF4D00]" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Landmark</label>
                <input type="text" placeholder="e.g. Near Metro Station" value={newAddrLandmark} onChange={e => setNewAddrLandmark(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#FF4D00]" />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddAddressModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#FF4D00] text-white text-xs font-bold rounded-xl shadow-md">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
