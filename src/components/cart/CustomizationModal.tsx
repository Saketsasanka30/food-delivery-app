import React, { useState } from 'react';
import { X, Plus, Minus, Star } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { useCart } from '../../context/CartContext';
import type { CustomizationOption, CartCustomization } from '../../types';
import { VegBadge } from '../common/Badge';

export const CustomizationModal: React.FC = () => {
  const { isCustomizationOpen, customizingItem, closeCustomization } = useView();
  const { addToCart } = useCart();

  if (!isCustomizationOpen || !customizingItem) return null;

  const { item, restaurant } = customizingItem;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<CustomizationOption | undefined>(() => {
    const sizeGroup = item.customizations?.find(c => c.title.toLowerCase().includes('size'));
    return sizeGroup ? sizeGroup.options[0] : undefined;
  });

  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, CustomizationOption[]>>(() => {
    const initial: Record<string, CustomizationOption[]> = {};
    item.customizations?.forEach(group => {
      if (!group.title.toLowerCase().includes('size') && group.required && group.options.length > 0) {
        initial[group.id] = [group.options[0]];
      } else {
        initial[group.id] = [];
      }
    });
    return initial;
  });

  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate dynamic total price
  let unitPrice = item.price;
  if (selectedSize) unitPrice += selectedSize.price;

  Object.values(selectedCustomizations).forEach(opts => {
    opts.forEach(opt => {
      unitPrice += opt.price;
    });
  });

  const totalCalculatedPrice = unitPrice * quantity;

  const handleToggleOption = (groupId: string, type: 'single' | 'multiple', option: CustomizationOption) => {
    setSelectedCustomizations(prev => {
      const current = prev[groupId] || [];
      if (type === 'single') {
        return { ...prev, [groupId]: [option] };
      } else {
        const exists = current.some(o => o.id === option.id);
        const updated = exists ? current.filter(o => o.id !== option.id) : [...current, option];
        return { ...prev, [groupId]: updated };
      }
    });
  };

  const handleAddToCart = () => {
    // Format cart customizations array
    const formattedCustomizations: CartCustomization[] = [];
    item.customizations?.forEach(group => {
      const opts = selectedCustomizations[group.id];
      if (opts && opts.length > 0) {
        formattedCustomizations.push({
          groupId: group.id,
          groupTitle: group.title,
          selectedOptions: opts
        });
      }
    });

    addToCart(
      item,
      restaurant.id,
      restaurant.name,
      quantity,
      selectedSize,
      formattedCustomizations,
      specialInstructions
    );

    closeCustomization();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 animate-slide-up">
        {/* Header Image */}
        <div className="relative h-56 bg-slate-100 shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <button
            onClick={closeCustomization}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <VegBadge isVeg={item.isVeg} size="sm" />
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3 h-3 fill-amber-500 stroke-none" />
                <span>{item.rating}</span>
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">{item.name}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
            <div className="text-lg font-black text-slate-900 mt-2">₹{item.price}</div>
          </div>

          {/* Customization Groups */}
          {item.customizations?.map(group => {
            const isSize = group.title.toLowerCase().includes('size');

            return (
              <div key={group.id} className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-extrabold text-slate-900">{group.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {group.required ? 'Required' : 'Optional'}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.options.map(opt => {
                    const isSelected = isSize
                      ? selectedSize?.id === opt.id
                      : (selectedCustomizations[group.id] || []).some(o => o.id === opt.id);

                    return (
                      <label
                        key={opt.id}
                        onClick={() => {
                          if (isSize) setSelectedSize(opt);
                          else handleToggleOption(group.id, group.type, opt);
                        }}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-orange-50/80 border-[#FF4D00] text-slate-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-orange-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type={group.type === 'single' || isSize ? 'radio' : 'checkbox'}
                            checked={isSelected}
                            onChange={() => {}}
                            className="accent-[#FF4D00] w-4 h-4"
                          />
                          <span>{opt.name}</span>
                        </div>
                        {opt.price > 0 && <span className="text-slate-500 font-bold">+₹{opt.price}</span>}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Cooking Instructions Input */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-sm font-extrabold text-slate-900 mb-2">Special Instructions</h4>
            <textarea
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Less spicy, extra sauce, no onions please..."
              rows={2}
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF4D00]"
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold"
            >
              <Minus className="w-4 h-4 stroke-[3]" />
            </button>
            <span className="font-extrabold text-sm text-slate-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#FF4D00] hover:bg-[#E04400] text-white font-extrabold text-sm py-3 px-6 rounded-2xl shadow-lg flex items-center justify-between transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Add Item</span>
            <span>₹{totalCalculatedPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
