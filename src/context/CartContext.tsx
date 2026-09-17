import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, MenuItem, CustomizationOption, CartCustomization, Coupon } from '../types';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface CartContextType {
  cartItems: CartItem[];
  cartRestaurantId: string | null;
  cartRestaurantName: string | null;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  addToCart: (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string,
    quantity?: number,
    size?: CustomizationOption,
    customizations?: CartCustomization[],
    specialInstructions?: string
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('feastly_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('feastly_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('feastly_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('feastly_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  const cartRestaurantId = cartItems.length > 0 ? cartItems[0].restaurantId : null;
  const cartRestaurantName = cartItems.length > 0 ? cartItems[0].restaurantName : null;

  const addToCart = (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string,
    quantity: number = 1,
    size?: CustomizationOption,
    customizations: CartCustomization[] = [],
    specialInstructions?: string
  ) => {
    if (cartRestaurantId && cartRestaurantId !== restaurantId) {
      if (!window.confirm(`Your cart contains items from ${cartRestaurantName}. Would you like to clear your cart and add items from ${restaurantName}?`)) {
        return;
      }
      setCartItems([]);
      setAppliedCoupon(null);
    }

    let unitPrice = item.price;
    if (size) unitPrice += size.price;
    customizations.forEach(c => {
      c.selectedOptions.forEach(opt => {
        unitPrice += opt.price;
      });
    });

    const cartItemId = `${item.id}_${size?.id || 'std'}_${customizations.map(c => c.selectedOptions.map(o => o.id).join('_')).join('_')}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(i => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotal: unitPrice * newQty
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          menuItem: item,
          restaurantId,
          restaurantName,
          quantity,
          size,
          customizations,
          specialInstructions,
          itemTotal: unitPrice * quantity
        };
        return [...prev, newItem];
      }
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitPrice = item.itemTotal / item.quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotal: unitPrice * newQty
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const codeClean = code.toUpperCase().trim();
    const found = AVAILABLE_COUPONS.find(c => c.code === codeClean);

    if (!found) {
      setCouponError('Invalid coupon code.');
      return false;
    }

    if (subtotal < found.minOrderValue) {
      setCouponError(`Minimum order value of ₹${found.minOrderValue} required for ${found.code}.`);
      return false;
    }

    setAppliedCoupon(found);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  let discount = 0;
  let deliveryFee = subtotal > 0 ? (subtotal >= 249 ? 0 : 40) : 0;

  if (appliedCoupon) {
    if (appliedCoupon.code === 'FREEDEL') {
      deliveryFee = 0;
      discount = 40;
    } else if (appliedCoupon.discountType === 'percentage') {
      const calculated = (subtotal * appliedCoupon.discountValue) / 100;
      discount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else if (appliedCoupon.discountType === 'fixed') {
      discount = appliedCoupon.discountValue;
    }
  }

  const taxes = subtotal > 0 ? Math.round(subtotal * 0.05 + 15) : 0;
  const total = Math.max(0, subtotal + deliveryFee + taxes - discount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartRestaurantId,
        cartRestaurantName,
        appliedCoupon,
        couponError,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        subtotal,
        deliveryFee,
        taxes,
        discount,
        total,
        totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
