import type { Restaurant, Coupon, User, Offer, NotificationItem, Order } from '../types';

export const INITIAL_USER: User = {
  id: 'usr_101',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'customer',
  addresses: [
    {
      id: 'addr_1',
      type: 'Home',
      name: 'Alex Johnson',
      phone: '+91 98765 43210',
      street: 'Flat 402, Highrise Heights, Green Avenue',
      landmark: 'Near Central Mall',
      city: 'Mumbai',
      pincode: '400001',
      isDefault: true,
      lat: 19.0760,
      lng: 72.8777
    },
    {
      id: 'addr_2',
      type: 'Work',
      name: 'Alex Johnson',
      phone: '+91 98765 43210',
      street: 'Tech Hub Park, Tower B, 8th Floor, BKC',
      landmark: 'Opposite Metro Station',
      city: 'Mumbai',
      pincode: '400051',
      isDefault: false,
      lat: 19.0600,
      lng: 72.8680
    }
  ],
  favorites: {
    restaurantIds: ['rest_1', 'rest_3', 'rest_5'],
    itemIds: ['item_101', 'item_301']
  }
};

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'FEAST50',
    title: '50% OFF up to ₹100',
    description: 'Get 50% discount on your favorite meals',
    discountType: 'percentage',
    discountValue: 50,
    minOrderValue: 199,
    maxDiscount: 100,
    expiryDate: '2026-12-31',
    terms: 'Valid on orders above ₹199. Maximum discount ₹100.'
  },
  {
    code: 'FREEDEL',
    title: 'Free Delivery',
    description: 'Zero delivery charges on your order',
    discountType: 'fixed',
    discountValue: 40,
    minOrderValue: 249,
    expiryDate: '2026-12-31',
    terms: 'Applicable on orders of ₹249 and above.'
  },
  {
    code: 'WELCOME100',
    title: 'Flat ₹100 OFF',
    description: 'Welcome bonus discount for foodies',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 399,
    expiryDate: '2026-12-31',
    terms: 'Valid once per user on order value over ₹399.'
  },
  {
    code: 'SUPERFOOD',
    title: '20% OFF Mega Saver',
    description: 'Save 20% on orders over ₹500',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 499,
    maxDiscount: 150,
    expiryDate: '2026-12-31',
    terms: 'Maximum discount capped at ₹150.'
  }
];

export const FEATURED_OFFERS: Offer[] = [
  {
    id: 'off_1',
    code: 'FEAST50',
    title: '50% OFF On First 3 Orders',
    description: 'Taste the best dishes in town with half price!',
    discount: '50% OFF',
    minOrder: 199,
    expiry: 'Ends in 2 days',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    badge: 'Popular'
  },
  {
    id: 'off_2',
    code: 'FREEDEL',
    title: 'Unlimited Free Delivery',
    description: 'Order from top rated restaurants near you without delivery fee.',
    discount: 'FREE DELIVERY',
    minOrder: 249,
    expiry: 'Valid all month',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
    badge: 'Trending'
  },
  {
    id: 'off_3',
    code: 'WELCOME100',
    title: 'Flat ₹100 Discount',
    description: 'Special weekend feast reward on gourmet dining.',
    discount: 'FLAT ₹100 OFF',
    minOrder: 399,
    expiry: 'Limited Time',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    badge: 'Hot Deal'
  }
];

export const CUISINES_LIST = [
  { id: 'all', name: 'All Cuisines', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'biryani', name: 'Biryani', icon: '🍲' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'indian', name: 'North Indian', icon: '🍛' },
  { id: 'south_indian', name: 'South Indian', icon: '🥘' },
  { id: 'chinese', name: 'Chinese', icon: '🥢' },
  { id: 'healthy', name: 'Healthy', icon: '🥗' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Beverages', icon: '🧃' }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'rest_1',
    name: 'Spice Route',
    tagline: 'Authentic Indian Curry & Tandoor Marvels',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80',
    cuisines: ['North Indian', 'Biryani', 'Mughlai'],
    rating: 4.8,
    ratingCount: 1240,
    deliveryTime: '25-30 min',
    distance: '2.4 km',
    priceForTwo: 500,
    address: '45 Heritage Square, MG Road, Mumbai',
    featuredOffer: '50% OFF up to ₹100',
    isPromoted: true,
    isOpen: true,
    about: 'Spice Route is renowned for slow-cooked aromatic biryanis, rich butter chicken, tender kebabs, and freshly baked naan breads cooked in traditional clay tandoors.',
    photos: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80'
    ],
    reviews: [
      {
        id: 'rev_1',
        restaurantId: 'rest_1',
        userId: 'u1',
        userName: 'Rahul Verma',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'The Lucknowi Dum Biryani was exceptionally fragrant and meat was tender! Quick delivery as well.'
      },
      {
        id: 'rev_2',
        restaurantId: 'rest_1',
        userId: 'u2',
        userName: 'Priya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 4.5,
        date: '3 days ago',
        comment: 'Butter Chicken had perfect rich gravy texture. Garlic naan was warm and fresh.'
      }
    ],
    categories: [
      {
        id: 'cat_sr_1',
        name: 'Recommended',
        items: [
          {
            id: 'item_101',
            restaurantId: 'rest_1',
            name: 'Royal Chicken Dum Biryani',
            description: 'Long grain Basmati rice layered with succulent marinated chicken and slow-cooked in traditional dum style.',
            price: 349,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
            category: 'Biryani',
            isVeg: false,
            isBestSeller: true,
            rating: 4.9,
            ratingCount: 520,
            inStock: true,
            prepTime: '20 mins',
            calories: 680,
            ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Ghee', 'Whole Spices'],
            customizations: [
              {
                id: 'c1',
                title: 'Portion Size',
                type: 'single',
                required: true,
                options: [
                  { id: 'opt_s1', name: 'Regular (1 Person)', price: 0 },
                  { id: 'opt_s2', name: 'Medium (Serves 2)', price: 180 },
                  { id: 'opt_s3', name: 'Family Pack (Serves 4)', price: 390 }
                ]
              },
              {
                id: 'c2',
                title: 'Extra Add-ons',
                type: 'multiple',
                required: false,
                options: [
                  { id: 'opt_a1', name: 'Extra Salan & Raita', price: 30 },
                  { id: 'opt_a2', name: 'Boiled Egg (2 pcs)', price: 40 },
                  { id: 'opt_a3', name: 'Extra Chicken Chunk', price: 80 }
                ]
              }
            ]
          },
          {
            id: 'item_102',
            restaurantId: 'rest_1',
            name: 'Old Delhi Butter Chicken',
            description: 'Tender tandoori chicken simmered in creamy tomato-cashew gravy enriched with butter and fenugreek.',
            price: 369,
            image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80',
            category: 'Main Course',
            isVeg: false,
            isBestSeller: true,
            rating: 4.8,
            ratingCount: 410,
            inStock: true,
            prepTime: '18 mins',
            calories: 550,
            customizations: [
              {
                id: 'c3',
                title: 'Spice Level',
                type: 'single',
                required: true,
                options: [
                  { id: 'opt_sp1', name: 'Mild & Creamy', price: 0 },
                  { id: 'opt_sp2', name: 'Medium Spicy', price: 0 },
                  { id: 'opt_sp3', name: 'Extra Spicy', price: 0 }
                ]
              }
            ]
          },
          {
            id: 'item_103',
            restaurantId: 'rest_1',
            name: 'Paneer Butter Masala',
            description: 'Fresh cottage cheese cubes tossed in rich tomato-butter gravy with aromatic herbs.',
            price: 299,
            image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
            category: 'Main Course',
            isVeg: true,
            isBestSeller: false,
            rating: 4.7,
            ratingCount: 310,
            inStock: true,
            prepTime: '15 mins',
            calories: 460
          }
        ]
      },
      {
        id: 'cat_sr_2',
        name: 'Starters & Tandoor',
        items: [
          {
            id: 'item_104',
            restaurantId: 'rest_1',
            name: 'Amritsari Paneer Tikka',
            description: 'Paneer cubes marinated in spiced yogurt and grilled to perfection in clay oven.',
            price: 279,
            image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80',
            category: 'Starters',
            isVeg: true,
            isBestSeller: true,
            rating: 4.8,
            ratingCount: 280,
            inStock: true
          },
          {
            id: 'item_105',
            restaurantId: 'rest_1',
            name: 'Garlic Butter Naan',
            description: 'Soft refined flour bread infused with garlic butter and parsley.',
            price: 65,
            image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=80',
            category: 'Breads',
            isVeg: true,
            isBestSeller: false,
            rating: 4.9,
            ratingCount: 890,
            inStock: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest_2',
    name: 'Pizza District',
    tagline: 'Artisanal Wood-Fired Neapolitan Pizzas',
    heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=150&auto=format&fit=crop&q=80',
    cuisines: ['Pizza', 'Italian', 'Fast Food'],
    rating: 4.7,
    ratingCount: 980,
    deliveryTime: '20-25 min',
    distance: '1.8 km',
    priceForTwo: 600,
    address: '12 Boulevard Street, Bandra West, Mumbai',
    featuredOffer: '20% OFF Mega Saver',
    isOpen: true,
    about: 'Pizza District bakes authentic sourdough pizzas with imported San Marzano tomatoes, fresh mozzarella, and premium toppings fired at 450°C.',
    photos: [
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80'
    ],
    reviews: [
      {
        id: 'rev_3',
        restaurantId: 'rest_2',
        userId: 'u3',
        userName: 'David Miller',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Best sourdough crust pizza! The pepperoni and hot honey combination is sensational.'
      }
    ],
    categories: [
      {
        id: 'cat_pd_1',
        name: 'Gourmet Pizzas',
        items: [
          {
            id: 'item_201',
            restaurantId: 'rest_2',
            name: 'Truffle & Mushroom Delight',
            description: 'Wild mushrooms, mozzarella, truffle oil drip, fresh thyme, and caramelized onion base.',
            price: 489,
            image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80',
            category: 'Pizza',
            isVeg: true,
            isBestSeller: true,
            rating: 4.9,
            ratingCount: 340,
            inStock: true,
            prepTime: '15 mins',
            customizations: [
              {
                id: 'c_pz1',
                title: 'Size Choice',
                type: 'single',
                required: true,
                options: [
                  { id: 'opt_pz1', name: 'Medium (9 inch)', price: 0 },
                  { id: 'opt_pz2', name: 'Large (12 inch)', price: 160 }
                ]
              },
              {
                id: 'c_pz2',
                title: 'Crust Style',
                type: 'single',
                required: true,
                options: [
                  { id: 'opt_c1', name: 'Classic Sourdough', price: 0 },
                  { id: 'opt_c2', name: 'Cheese Burst Crust', price: 79 }
                ]
              },
              {
                id: 'c_pz3',
                title: 'Extra Toppings',
                type: 'multiple',
                required: false,
                options: [
                  { id: 'opt_t1', name: 'Extra Mozzarella', price: 50 },
                  { id: 'opt_t2', name: 'Jalapeños', price: 35 },
                  { id: 'opt_t3', name: 'Black Olives', price: 35 }
                ]
              }
            ]
          },
          {
            id: 'item_202',
            restaurantId: 'rest_2',
            name: 'Spicy Pepperoni & Honey',
            description: 'Double cured pepperoni, hot honey drizzle, spicy chili flakes, and San Marzano sauce.',
            price: 529,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80',
            category: 'Pizza',
            isVeg: false,
            isBestSeller: true,
            rating: 4.8,
            ratingCount: 610,
            inStock: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest_3',
    name: 'The Burger Lab',
    tagline: 'Smash Burgers & Thick Shakes',
    heroImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=80',
    cuisines: ['Burgers', 'American', 'Fast Food'],
    rating: 4.6,
    ratingCount: 810,
    deliveryTime: '20-30 min',
    distance: '3.1 km',
    priceForTwo: 450,
    address: '88 Cyber Hub, Lower Parel, Mumbai',
    featuredOffer: 'FLAT ₹100 OFF',
    isOpen: true,
    about: 'The Burger Lab cooks juicy smash patties on blistering hot flat tops to create crispy caramelized edges served inside pillowy brioche buns.',
    photos: [
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80'
    ],
    reviews: [],
    categories: [
      {
        id: 'cat_bl_1',
        name: 'Signature Burgers',
        items: [
          {
            id: 'item_301',
            restaurantId: 'rest_3',
            name: 'Double Cheese Smash Burger',
            description: 'Two crispy beef smash patties, double cheddar cheese, secret burger sauce, pickles on toasted brioche.',
            price: 329,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
            category: 'Burgers',
            isVeg: false,
            isBestSeller: true,
            rating: 4.9,
            ratingCount: 740,
            inStock: true,
            customizations: [
              {
                id: 'cb_1',
                title: 'Make it a Meal',
                type: 'single',
                required: false,
                options: [
                  { id: 'opt_m1', name: 'Add Peri Peri Fries & Drink', price: 99 },
                  { id: 'opt_m2', name: 'Add Onion Rings & Drink', price: 119 }
                ]
              }
            ]
          },
          {
            id: 'item_302',
            restaurantId: 'rest_3',
            name: 'Crispy Truffle Veggie Burger',
            description: 'Crispy crunchy potato & herb patty topped with truffle mayo, melted cheese and crisp lettuce.',
            price: 249,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
            category: 'Burgers',
            isVeg: true,
            isBestSeller: false,
            rating: 4.6,
            ratingCount: 310,
            inStock: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest_4',
    name: 'Dosa House',
    tagline: 'Crispy South Indian Delicacies & Filter Coffee',
    heroImage: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=150&auto=format&fit=crop&q=80',
    cuisines: ['South Indian', 'Healthy', 'Vegetarian'],
    rating: 4.9,
    ratingCount: 1540,
    deliveryTime: '15-25 min',
    distance: '1.2 km',
    priceForTwo: 300,
    address: '15 Matunga Main Road, Mumbai',
    featuredOffer: 'Free Delivery',
    isOpen: true,
    about: 'Authentic South Indian breakfast items, golden paper-thin dosas, fluffy steamed idlis, spicy vadas served with 4 signature chutneys and sambar.',
    photos: [],
    reviews: [],
    categories: [
      {
        id: 'cat_dh_1',
        name: 'South Indian Specials',
        items: [
          {
            id: 'item_401',
            restaurantId: 'rest_4',
            name: 'Mysore Masala Dosa',
            description: 'Golden crispy rice crepe smeared with fiery spicy red chutney and stuffed with spiced potato masala.',
            price: 189,
            image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
            category: 'South Indian',
            isVeg: true,
            isVegan: true,
            isBestSeller: true,
            rating: 4.9,
            ratingCount: 890,
            inStock: true
          },
          {
            id: 'item_402',
            restaurantId: 'rest_4',
            name: 'Ghee Podi Idli (4 Pcs)',
            description: 'Soft steamed rice cakes tossed in aromatic spiced gun powder and hot pure desi ghee.',
            price: 149,
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
            category: 'South Indian',
            isVeg: true,
            isBestSeller: true,
            rating: 4.8,
            ratingCount: 450,
            inStock: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest_5',
    name: 'Wok Republic',
    tagline: 'Sizzling Asian Bowls & Dim Sums',
    heroImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=150&auto=format&fit=crop&q=80',
    cuisines: ['Chinese', 'Asian', 'Thai'],
    rating: 4.6,
    ratingCount: 670,
    deliveryTime: '25-35 min',
    distance: '3.8 km',
    priceForTwo: 550,
    address: '77 Linking Road, Santa Cruz, Mumbai',
    featuredOffer: '50% OFF up to ₹100',
    isOpen: true,
    about: 'Authentic wok-tossed Asian delicacies, pan-fried Hakka noodles, Schezwan fried rice, crisp crystal dim sums, and Thai green curry bowls.',
    photos: [],
    reviews: [],
    categories: [
      {
        id: 'cat_wr_1',
        name: 'Wok Specialties',
        items: [
          {
            id: 'item_501',
            restaurantId: 'rest_5',
            name: 'Fiery Schezwan Chicken Noodles',
            description: 'Wok tossed noodles loaded with shredded chicken, fresh veggies and homemade spicy Schezwan sauce.',
            price: 289,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
            category: 'Chinese',
            isVeg: false,
            isBestSeller: true,
            rating: 4.7,
            ratingCount: 390,
            inStock: true
          },
          {
            id: 'item_502',
            restaurantId: 'rest_5',
            name: 'Steamed Edamame & Truffle Dim Sum (6 pcs)',
            description: 'Translucent steamed dumplings stuffed with crushed edamame, water chestnut and light truffle infusion.',
            price: 329,
            image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&auto=format&fit=crop&q=80',
            category: 'Starters',
            isVeg: true,
            isBestSeller: false,
            rating: 4.8,
            ratingCount: 210,
            inStock: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest_6',
    name: 'Green Bowl',
    tagline: 'Fresh Salad Bowls, Smoothies & Clean Eating',
    heroImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&auto=format&fit=crop&q=80',
    cuisines: ['Healthy', 'Salads', 'Beverages'],
    rating: 4.8,
    ratingCount: 520,
    deliveryTime: '20-30 min',
    distance: '2.1 km',
    priceForTwo: 400,
    address: '34 Juhu Beach Road, Mumbai',
    featuredOffer: '20% OFF Mega Saver',
    isOpen: true,
    about: 'Nutritious gourmet bowls, organic salad wraps, cold pressed detox juices, and protein-packed bowls crafted for health lovers.',
    photos: [],
    reviews: [],
    categories: [
      {
        id: 'cat_gb_1',
        name: 'Clean Bowls',
        items: [
          {
            id: 'item_601',
            restaurantId: 'rest_6',
            name: 'Avocado & Quinoa Power Bowl',
            description: 'Fresh sliced avocado, fluffy organic quinoa, roasted sweet potato, edamame with lemon-tahini dressing.',
            price: 349,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
            category: 'Healthy',
            isVeg: true,
            isVegan: true,
            isBestSeller: true,
            rating: 4.9,
            ratingCount: 310,
            inStock: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest_7',
    name: 'Dessert Lab',
    tagline: 'Decadent Cheesecakes, Brownies & Artisanal Waffles',
    heroImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&auto=format&fit=crop&q=80',
    cuisines: ['Desserts', 'Bakery'],
    rating: 4.9,
    ratingCount: 1100,
    deliveryTime: '15-20 min',
    distance: '1.5 km',
    priceForTwo: 350,
    address: '9 Park Street, Bandra West, Mumbai',
    featuredOffer: 'Free Delivery',
    isOpen: true,
    about: 'Heavenly baked New York cheesecakes, warm fudgy brownies dripping with Belgian chocolate, and freshly made liege waffles.',
    photos: [],
    reviews: [],
    categories: [
      {
        id: 'cat_dl_1',
        name: 'Desserts',
        items: [
          {
            id: 'item_701',
            restaurantId: 'rest_7',
            name: 'Nutella Belgian Waffle',
            description: 'Crispy warm waffle loaded with original Belgian Nutella spread and roasted hazelnut crunch.',
            price: 219,
            image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80',
            category: 'Desserts',
            isVeg: true,
            isBestSeller: true,
            rating: 4.9,
            ratingCount: 880,
            inStock: true
          }
        ]
      }
    ]
  },
  {
    id: 'rest_8',
    name: 'Biryani Palace',
    tagline: 'Hyderabadi & Awadhi Dum Biryanis',
    heroImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=150&auto=format&fit=crop&q=80',
    cuisines: ['Biryani', 'North Indian'],
    rating: 4.7,
    ratingCount: 1890,
    deliveryTime: '30-40 min',
    distance: '4.5 km',
    priceForTwo: 500,
    address: '101 Old City Road, Mumbai',
    featuredOffer: '50% OFF up to ₹100',
    isOpen: true,
    about: 'Authentic Hyderabadi Dum Biryani cooked in sealed handis over charcoal embers.',
    photos: [],
    reviews: [],
    categories: [
      {
        id: 'cat_bp_1',
        name: 'Biryani Specials',
        items: [
          {
            id: 'item_801',
            restaurantId: 'rest_8',
            name: 'Special Mutton Dum Biryani',
            description: 'Tender mutton pieces infused with rich spices, saffron and layered with aged Basmati rice.',
            price: 449,
            image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
            category: 'Biryani',
            isVeg: false,
            isBestSeller: true,
            rating: 4.9,
            ratingCount: 950,
            inStock: true
          }
        ]
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Welcome to Feastly! 🎉',
    message: 'Use code FEAST50 to get 50% OFF on your first food order.',
    timestamp: '10 min ago',
    read: false,
    type: 'offer'
  },
  {
    id: 'notif_2',
    title: 'Free Delivery Weekend',
    message: 'Enjoy zero delivery fees on orders above ₹249 with code FREEDEL.',
    timestamp: '2 hours ago',
    read: true,
    type: 'offer'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_9901',
    orderNumber: 'FST-8821',
    userId: 'usr_101',
    restaurantId: 'rest_1',
    restaurantName: 'Spice Route',
    restaurantImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    items: [
      {
        cartItemId: 'c_item_1',
        menuItem: RESTAURANTS_DATA[0].categories[0].items[0],
        restaurantId: 'rest_1',
        restaurantName: 'Spice Route',
        quantity: 1,
        customizations: [],
        itemTotal: 349
      },
      {
        cartItemId: 'c_item_2',
        menuItem: RESTAURANTS_DATA[0].categories[1].items[1],
        restaurantId: 'rest_1',
        restaurantName: 'Spice Route',
        quantity: 2,
        customizations: [],
        itemTotal: 130
      }
    ],
    subtotal: 479,
    deliveryFee: 40,
    taxes: 24,
    discount: 100,
    total: 443,
    couponCode: 'FEAST50',
    deliveryAddress: INITIAL_USER.addresses[0],
    paymentMethod: 'UPI',
    status: 'Delivered',
    createdAt: '2026-09-15 19:30',
    estimatedDeliveryTime: 'Completed'
  }
];
