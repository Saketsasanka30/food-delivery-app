import React, { createContext, useContext, useState } from 'react';
import type { MenuItem, Restaurant } from '../types';

export type ViewType =
  | 'home'
  | 'search'
  | 'restaurant'
  | 'orders'
  | 'favorites'
  | 'offers'
  | 'profile'
  | 'notifications'
  | 'tracking'
  | 'checkout'
  | 'admin'
  | 'partner';

interface ViewContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedRestaurantId: string | null;
  openRestaurantView: (restaurantId: string) => void;
  selectedTrackingOrderId: string | null;
  openTrackingView: (orderId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  // Food Customization Modal
  isCustomizationOpen: boolean;
  customizingItem: { item: MenuItem; restaurant: Restaurant } | null;
  openCustomization: (item: MenuItem, restaurant: Restaurant) => void;
  closeCustomization: () => void;
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<{ item: MenuItem; restaurant: Restaurant } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const openRestaurantView = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    setCurrentView('restaurant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTrackingView = (orderId: string) => {
    setSelectedTrackingOrderId(orderId);
    setCurrentView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCustomization = (item: MenuItem, restaurant: Restaurant) => {
    setCustomizingItem({ item, restaurant });
    setIsCustomizationOpen(true);
  };

  const closeCustomization = () => {
    setIsCustomizationOpen(false);
    setCustomizingItem(null);
  };

  return (
    <ViewContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedRestaurantId,
        openRestaurantView,
        selectedTrackingOrderId,
        openTrackingView,
        isCartOpen,
        setIsCartOpen,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        isCustomizationOpen,
        customizingItem,
        openCustomization,
        closeCustomization,
        searchQuery,
        setSearchQuery,
        selectedCuisine,
        setSelectedCuisine
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error('useView must be used within ViewProvider');
  return context;
};
