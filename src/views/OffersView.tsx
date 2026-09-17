import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { FEATURED_OFFERS, AVAILABLE_COUPONS } from '../data/mockData';
import { useCart } from '../context/CartContext';

export const OffersView: React.FC = () => {
  const { applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Exclusive Offers & Coupons</span><Tag className="w-6 h-6 text-[#FF4D00]" />
        </h1>
        <p className="text-xs text-slate-500 font-medium">Save big with active promotional codes and mega deals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURED_OFFERS.map(offer => (
          <div key={offer.id} className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group">
            <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent p-5 flex flex-col justify-between">
              <span className="bg-[#FF4D00] text-white text-xs font-black px-2.5 py-1 rounded-lg uppercase tracking-wider self-start">{offer.badge}</span>
              <div className="space-y-2">
                <h3 className="text-white font-black text-lg leading-tight">{offer.title}</h3>
                <p className="text-slate-300 text-xs">{offer.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-amber-400 font-extrabold text-xs">Code: {offer.code}</span>
                  <button onClick={() => handleCopy(offer.code)}
                    className="bg-white text-slate-900 font-extrabold text-xs px-3.5 py-1.5 rounded-xl hover:bg-[#FF4D00] hover:text-white transition-colors">
                    {copiedCode === offer.code ? 'Copied ✓' : 'Copy Code'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">All Available Coupons ({AVAILABLE_COUPONS.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AVAILABLE_COUPONS.map(coupon => (
            <div key={coupon.code} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-100 text-[#FF4D00] font-black text-xs tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 fill-[#FF4D00]" /><span>{coupon.code}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base">{coupon.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{coupon.description}</p>
                </div>
                <button onClick={() => handleCopy(coupon.code)}
                  className="bg-slate-900 text-white font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-[#FF4D00] transition-colors shrink-0">
                  {copiedCode === coupon.code ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Min Order: ₹{coupon.minOrderValue}</span><span>Expiry: {coupon.expiryDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
