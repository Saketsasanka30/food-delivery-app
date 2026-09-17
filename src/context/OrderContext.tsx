import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Order, OrderStatus, Address, DeliveryDriver } from '../types';
import { INITIAL_ORDERS, RESTAURANTS_DATA } from '../data/mockData';
import { useCart } from './CartContext';
import { useApp } from './AppContext';

interface OrderContextType {
  orders: Order[];
  activeOrder: Order | null;
  placeOrder: (
    deliveryAddress: Address,
    paymentMethod: 'UPI' | 'Card' | 'Wallet' | 'COD',
    deliveryInstructions?: string
  ) => Order;
  cancelOrder: (orderId: string, reason?: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  reorder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const DEMO_DRIVER: DeliveryDriver = {
  name: 'Vikram Singh',
  phone: '+91 98112 33445',
  photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  vehicleNumber: 'MH 02 CZ 4912',
  rating: 4.9,
  currentLat: 19.0700,
  currentLng: 72.8750
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cartItems, subtotal, deliveryFee, taxes, discount, total, appliedCoupon, clearCart, addToCart } = useCart();
  const { user, addNotification } = useApp();

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('feastly_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('feastly_orders', JSON.stringify(orders));
  }, [orders]);

  const activeOrder = orders.find(o => o.status !== 'Delivered' && o.status !== 'Cancelled') || null;

  // Auto progression simulator for active orders
  useEffect(() => {
    if (!activeOrder) return;

    const stages: OrderStatus[] = [
      'Order Placed',
      'Restaurant Confirmed',
      'Preparing',
      'Driver Picked Up',
      'On the Way',
      'Delivered'
    ];

    const currentIdx = stages.indexOf(activeOrder.status);
    if (currentIdx >= 0 && currentIdx < stages.length - 1) {
      const timer = setTimeout(() => {
        const nextStatus = stages[currentIdx + 1];
        updateOrderStatus(activeOrder.id, nextStatus);
      }, 15000); // Advance status every 15s in demo mode

      return () => clearTimeout(timer);
    }
  }, [activeOrder]);

  const placeOrder = (
    deliveryAddress: Address,
    paymentMethod: 'UPI' | 'Card' | 'Wallet' | 'COD',
    deliveryInstructions?: string
  ): Order => {
    const orderId = 'ord_' + Date.now();
    const orderNum = 'FST-' + Math.floor(1000 + Math.random() * 9000);
    const restaurant = RESTAURANTS_DATA.find(r => r.id === cartItems[0]?.restaurantId);

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderNum,
      userId: user.id,
      restaurantId: cartItems[0]?.restaurantId || 'rest_1',
      restaurantName: cartItems[0]?.restaurantName || 'Spice Route',
      restaurantImage: restaurant?.heroImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
      items: [...cartItems],
      subtotal,
      deliveryFee,
      taxes,
      discount,
      total,
      couponCode: appliedCoupon?.code,
      deliveryAddress,
      deliveryInstructions,
      paymentMethod,
      status: 'Order Placed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      estimatedDeliveryTime: '25-30 min',
      driver: DEMO_DRIVER
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addNotification('Order Confirmed! 🎉', `Order ${newOrder.orderNumber} placed successfully with ${newOrder.restaurantName}.`, 'order', newOrder.id);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const updated = { ...o, status };
          addNotification(
            `Order Status Update`,
            `Order ${o.orderNumber} is now: ${status}`,
            'order',
            o.id
          );
          return updated;
        }
        return o;
      })
    );
  };

  const cancelOrder = (orderId: string, reason: string = 'User cancelled') => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'Cancelled', cancellationReason: reason } : o))
    );
    addNotification('Order Cancelled', `Order has been cancelled. Refund initialized if paid online.`, 'order', orderId);
  };

  const reorder = (orderId: string) => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return;

    target.items.forEach(item => {
      addToCart(
        item.menuItem,
        item.restaurantId,
        item.restaurantName,
        item.quantity,
        item.size,
        item.customizations,
        item.specialInstructions
      );
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        placeOrder,
        cancelOrder,
        updateOrderStatus,
        reorder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
