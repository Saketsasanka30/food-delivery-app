import React from 'react';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ViewProvider, useView } from './context/ViewContext';

// Components
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { CartDrawer } from './components/cart/CartDrawer';
import { CustomizationModal } from './components/cart/CustomizationModal';
import { AiAssistantModal } from './components/ai/AiAssistantModal';

// Views
import { HomeView } from './views/HomeView';
import { SearchView } from './views/SearchView';
import { RestaurantDetailView } from './views/RestaurantDetailView';
import { CheckoutView } from './views/CheckoutView';
import { LiveTracker } from './views/LiveTracker';
import { OrdersView } from './views/OrdersView';
import { FavoritesView } from './views/FavoritesView';
import { OffersView } from './views/OffersView';
import { ProfileView } from './views/ProfileView';
import { NotificationsView } from './views/NotificationsView';
import { AdminDashboard } from './views/AdminDashboard';
import { PartnerPortal } from './views/PartnerPortal';

const MainContent: React.FC = () => {
  const { currentView } = useView();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'search':
        return <SearchView />;
      case 'restaurant':
        return <RestaurantDetailView />;
      case 'checkout':
        return <CheckoutView />;
      case 'tracking':
        return <LiveTracker />;
      case 'orders':
        return <OrdersView />;
      case 'favorites':
        return <FavoritesView />;
      case 'offers':
        return <OffersView />;
      case 'profile':
        return <ProfileView />;
      case 'notifications':
        return <NotificationsView />;
      case 'admin':
        return <AdminDashboard />;
      case 'partner':
        return <PartnerPortal />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans antialiased flex flex-col selection:bg-[#FF4D00] selection:text-white">
      <Header />
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Persistent Overlay Drawers & Modals */}
      <CartDrawer />
      <CustomizationModal />
      <AiAssistantModal />
      <MobileNav />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <CartProvider>
        <OrderProvider>
          <ViewProvider>
            <MainContent />
          </ViewProvider>
        </OrderProvider>
      </CartProvider>
    </AppProvider>
  );
}

export default App;
