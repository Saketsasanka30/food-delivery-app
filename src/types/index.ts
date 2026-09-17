export type UserRole = 'customer' | 'restaurant' | 'admin';

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
  lat?: number;
  lng?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
  role: UserRole;
  favorites: {
    restaurantIds: string[];
    itemIds: string[];
  };
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isVegan?: boolean;
  isBestSeller?: boolean;
  rating: number;
  ratingCount: number;
  inStock: boolean;
  customizations?: CustomizationGroup[];
  ingredients?: string[];
  calories?: number;
  prepTime?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  photos?: string[];
  foodRating?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  heroImage: string;
  logo: string;
  cuisines: string[];
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  distance: string;
  priceForTwo: number;
  address: string;
  featuredOffer?: string;
  isPromoted?: boolean;
  isOpen: boolean;
  categories: MenuCategory[];
  reviews: Review[];
  about: string;
  photos: string[];
}

export interface CartCustomization {
  groupId: string;
  groupTitle: string;
  selectedOptions: CustomizationOption[];
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
  size?: CustomizationOption;
  customizations: CartCustomization[];
  specialInstructions?: string;
  itemTotal: number;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  terms?: string;
}

export type OrderStatus = 
  | 'Order Placed' 
  | 'Restaurant Confirmed' 
  | 'Preparing' 
  | 'Driver Picked Up' 
  | 'On the Way' 
  | 'Delivered' 
  | 'Cancelled';

export interface DeliveryDriver {
  name: string;
  phone: string;
  photo: string;
  vehicleNumber: string;
  rating: number;
  currentLat?: number;
  currentLng?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  couponCode?: string;
  deliveryAddress: Address;
  deliveryInstructions?: string;
  paymentMethod: 'UPI' | 'Card' | 'Wallet' | 'COD';
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  driver?: DeliveryDriver;
  cancellationReason?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'offer' | 'system';
  orderId?: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  minOrder: number;
  expiry: string;
  image: string;
  badge: string;
}
