import React, { useState } from 'react';
import { X, Tag, Sparkles, AlertCircle } from 'lucide-react';
import { AVAILABLE_COUPONS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

interface CouponSelectorProps {
  onClose: () => void;
}

export const CouponSelector: React.FC<CouponSelectorProps> = ({ onClose }) => {
  const { applyCoupon, appliedCoupon, couponError, subtotal } = useCart();
  const [inputCode, setInputCode] = useState('');

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      const success = applyCoupon(inputCode);
      if (success) onClose();
    }
  };

  const handleApplyPreset = (code: string) => {
    const success = applyCoupon(code);
    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] animate-slide-up">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#FF4D00]" />
            <h3 className="font-extrabold text-base">Apply Promo Coupon</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Custom Input Form */}
        <div className="p-4 border-b border-slate-100">
          <form onSubmit={handleApplyCustom} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Coupon Code (e.g. FEAST50)"
              value={inputCode}
              onChange={e => setInputCode(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-[#FF4D00]"
            />
            <button
              type="submit"
              className="bg-[#FF4D00] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-[#E04400] transition-colors"
            >
              Apply
            </button>
          </form>

          {couponError && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{couponError}</span>
            </div>
          )}
        </div>

        {/* Coupons List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Coupons</h4>

          {AVAILABLE_COUPONS.map(coupon => {
            const isApplied = appliedCoupon?.code === coupon.code;
            const isEligible = subtotal >= coupon.minOrderValue;

            return (
              <div
                key={coupon.code}
                className={`p-4 rounded-2xl border transition-all ${
                  isApplied
                    ? 'bg-emerald-50/80 border-emerald-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-100 text-[#FF4D00] font-black text-xs tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 fill-[#FF4D00]" />
                      <span>{coupon.code}</span>
                    </div>
                    <h5 className="font-extrabold text-slate-900 text-sm mt-2">{coupon.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{coupon.description}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{coupon.terms}</p>
                  </div>

                  <button
                    onClick={() => handleApplyPreset(coupon.code)}
                    disabled={isApplied}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                      isApplied
                        ? 'bg-emerald-600 text-white'
                        : isEligible
                        ? 'bg-slate-900 text-white hover:bg-[#FF4D00]'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isApplied ? 'Applied ✓' : isEligible ? 'Apply' : `Min ₹${coupon.minOrderValue}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
