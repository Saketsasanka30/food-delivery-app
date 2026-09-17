import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Address, NotificationItem, UserRole } from '../types';
import { INITIAL_USER, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface AppContextType {
  user: User;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  addresses: Address[];
  activeAddress: Address;
  setActiveAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  toggleFavoriteRestaurant: (restaurantId: string) => void;
  toggleFavoriteItem: (itemId: string) => void;
  isRestaurantFavorite: (restaurantId: string) => boolean;
  isItemFavorite: (itemId: string) => boolean;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: (e?: React.MouseEvent) => void;
  addNotification: (title: string, message: string, type?: 'order' | 'offer' | 'system', orderId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('feastly_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [activeRole, setActiveRole] = useState<UserRole>(user.role || 'customer');

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('feastly_addresses');
    return saved ? JSON.parse(saved) : INITIAL_USER.addresses;
  });

  const [activeAddress, setActiveAddress] = useState<Address>(() => {
    return addresses.find(a => a.isDefault) || addresses[0];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('feastly_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('feastly_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('feastly_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('feastly_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const id = 'addr_' + Date.now();
    const created: Address = { ...newAddr, id };
    const updated: Address[] = newAddr.isDefault
      ? [...addresses.map(a => ({ ...a, isDefault: false })), created]
      : [...addresses, created];

    setAddresses(updated);
    if (newAddr.isDefault || addresses.length === 0) {
      setActiveAddress(created);
    }
  };

  const updateAddress = (updatedAddr: Address) => {
    const updated = addresses.map(a => (a.id === updatedAddr.id ? updatedAddr : a));
    setAddresses(updated);
    if (activeAddress.id === updatedAddr.id) {
      setActiveAddress(updatedAddr);
    }
  };

  const deleteAddress = (id: string) => {
    const filtered = addresses.filter(a => a.id !== id);
    setAddresses(filtered);
    if (activeAddress.id === id && filtered.length > 0) {
      setActiveAddress(filtered[0]);
    }
  };

  const toggleFavoriteRestaurant = (restaurantId: string) => {
    setUser(prev => {
      const exists = prev.favorites.restaurantIds.includes(restaurantId);
      const updatedRestIds = exists
        ? prev.favorites.restaurantIds.filter(id => id !== restaurantId)
        : [...prev.favorites.restaurantIds, restaurantId];

      return {
        ...prev,
        favorites: {
          ...prev.favorites,
          restaurantIds: updatedRestIds
        }
      };
    });
  };

  const toggleFavoriteItem = (itemId: string) => {
    setUser(prev => {
      const exists = prev.favorites.itemIds.includes(itemId);
      const updatedItemIds = exists
        ? prev.favorites.itemIds.filter(id => id !== itemId)
        : [...prev.favorites.itemIds, itemId];

      return {
        ...prev,
        favorites: {
          ...prev.favorites,
          itemIds: updatedItemIds
        }
      };
    });
  };

  const isRestaurantFavorite = (restaurantId: string) => {
    return user.favorites.restaurantIds.includes(restaurantId);
  };

  const isItemFavorite = (itemId: string) => {
    return user.favorites.itemIds.includes(itemId);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotifications([]);
  };

  const addNotification = (title: string, message: string, type: 'order' | 'offer' | 'system' = 'system', orderId?: string) => {
    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type,
      orderId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        activeRole,
        setActiveRole,
        addresses,
        activeAddress,
        setActiveAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        toggleFavoriteRestaurant,
        toggleFavoriteItem,
        isRestaurantFavorite,
        isItemFavorite,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        clearAllNotifications,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
