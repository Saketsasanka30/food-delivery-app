import React, { useState } from 'react';
import { X, Plus, Minus, Tag, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useView } from '../../context/ViewContext';
import { useApp } from '../../context/AppContext';
import { CouponSelector } from './CouponSelector';
import { VegBadge } from '../common/Badge';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, setCurrentView } = useView();
  const {
    cartItems,
    cartRestaurantName,
    updateQuantity,
    clearCart,
    appliedCoupon,
    removeCoupon,
    subtotal,
    deliveryFee,
    taxes,
    discount,
    total,
    totalItemCount
  } = useCart();
  const { activeAddress } = useApp();

  const [showCouponModal, setShowCouponModal] = useState(false);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-up sm:animate-none">
          {/* Cart Header */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF4D00] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">Your Cart</h3>
                <p className="text-xs text-slate-400 font-medium truncate max-w-[200px]">
                  {cartRestaurantName || 'No items selected'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-[#FF4D00]">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Your cart is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Explore thousands of delicious dishes from top rated restaurants and add your favorites!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentView('home');
                }}
                className="bg-[#FF4D00] text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-md hover:bg-[#E04400] transition-colors"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Items List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selected Items ({totalItemCount})</h4>
                  <button onClick={clearCart} className="text-xs font-bold text-red-500 hover:underline">
                    Clear All
                  </button>
                </div>

                {cartItems.map(item => (
                  <div key={item.cartItemId} className="flex gap-3 items-center p-3 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <img src={item.menuItem.image} alt={item.menuItem.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <VegBadge isVeg={item.menuItem.isVeg} size="sm" />
                        <h5 className="font-bold text-slate-900 text-xs truncate">{item.menuItem.name}</h5>
                      </div>

                      {/* Customization Details */}
                      {(item.size || item.customizations.length > 0) && (
                        <div className="text-[10px] text-slate-500 mt-0.5 space-y-0.5">
                          {item.size && <div>Size: <span className="font-semibold text-slate-700">{item.size.name}</span></div>}
                          {item.customizations.map(c => (
                            <div key={c.groupId}>
                              {c.groupTitle}: <span className="font-semibold text-slate-700">{c.selectedOptions.map(o => o.name).join(', ')}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="font-extrabold text-xs text-slate-900 mt-1">₹{item.itemTotal}</div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-xs">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="w-5 h-5 rounded hover:bg-slate-100 flex items-center justify-center text-slate-700"
                      >
                        <Minus className="w-3 h-3 stroke-[3]" />
                      </button>
                      <span className="font-bold text-xs text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="w-5 h-5 rounded hover:bg-slate-100 flex items-center justify-center text-slate-700"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                    <Tag className="w-4 h-4 text-[#FF4D00]" />
                    <span>Offers & Coupons</span>
                  </div>
                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="text-xs font-bold text-[#FF4D00] hover:underline"
                  >
                    View Offers →
                  </button>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 font-bold" />
                      <div>
                        <div className="text-xs font-extrabold text-emerald-800">{appliedCoupon.code} Applied</div>
                        <div className="text-[10px] text-slate-500">{appliedCoupon.title}</div>
                      </div>
                    </div>
                    <button onClick={removeCoupon} className="text-xs font-bold text-red-500 hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="w-full bg-white p-2.5 rounded-xl border border-dashed border-orange-300 text-xs font-bold text-[#FF4D00] text-center hover:bg-orange-100/50 transition-colors"
                  >
                    + Apply Coupon Code
                  </button>
                )}
              </div>

              {/* Bill Receipt Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <h5 className="font-extrabold text-slate-900 pb-2 border-b border-slate-200">Bill Details</h5>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Item Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Taxes & Packaging</span>
                  <span>₹{taxes}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold pt-1">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-base text-[#FF4D00]">₹{total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="font-bold text-slate-900">Deliver to:</span>
                <span className="truncate max-w-[240px] text-slate-500">{activeAddress.street}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentView('checkout');
                }}
                className="w-full bg-[#FF4D00] hover:bg-[#E04400] text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg flex items-center justify-between transition-all hover:scale-[1.01] active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-1">
                  <span>₹{total}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && <CouponSelector onClose={() => setShowCouponModal(false)} />}
    </div>
  );
};
