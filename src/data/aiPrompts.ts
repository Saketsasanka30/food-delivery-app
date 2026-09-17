import { RESTAURANTS_DATA } from './mockData';
import type { Restaurant, MenuItem } from '../types';

export interface AiResponse {
  message: string;
  recommendedRestaurants?: Restaurant[];
  recommendedItems?: { item: MenuItem; restaurant: Restaurant }[];
  suggestedCoupons?: string[];
}

export function processAiQuery(query: string): AiResponse {
  const q = query.toLowerCase().trim();

  // 1. Fast Delivery query
  if (q.includes('fast') || q.includes('quick') || q.includes('fastest')) {
    const sorted = [...RESTAURANTS_DATA].sort((a, b) => {
      const timeA = parseInt(a.deliveryTime.split('-')[0]) || 30;
      const timeB = parseInt(b.deliveryTime.split('-')[0]) || 30;
      return timeA - timeB;
    });
    return {
      message: `Here are the fastest delivering restaurants near your location! 🚀`,
      recommendedRestaurants: sorted.slice(0, 3)
    };
  }

  // 2. Budget / Under price limit
  const priceMatch = q.match(/under\s*₹?\s*(\d+)/i) || q.match(/below\s*₹?\s*(\d+)/i) || q.match(/less than\s*₹?\s*(\d+)/i);
  if (priceMatch && priceMatch[1]) {
    const maxPrice = parseInt(priceMatch[1]);
    const matchedItems: { item: MenuItem; restaurant: Restaurant }[] = [];

    RESTAURANTS_DATA.forEach(rest => {
      rest.categories.forEach(cat => {
        cat.items.forEach(item => {
          if (item.price <= maxPrice && (q.includes('veg') ? item.isVeg : true)) {
            matchedItems.push({ item, restaurant: rest });
          }
        });
      });
    });

    return {
      message: `I found these delicious options under ₹${maxPrice}! 💰`,
      recommendedItems: matchedItems.slice(0, 4)
    };
  }

  // 3. Vegetarian / Vegan filter
  if (q.includes('vegetarian') || q.includes('veg') || q.includes('vegan')) {
    const vegItems: { item: MenuItem; restaurant: Restaurant }[] = [];
    RESTAURANTS_DATA.forEach(rest => {
      rest.categories.forEach(cat => {
        cat.items.forEach(item => {
          if (item.isVeg) {
            vegItems.push({ item, restaurant: rest });
          }
        });
      });
    });

    return {
      message: `Here are top rated 100% vegetarian & vegan delicacies! 🥗`,
      recommendedItems: vegItems.slice(0, 4)
    };
  }

  // 4. Spicy food
  if (q.includes('spicy') || q.includes('chili') || q.includes('schezwan')) {
    const spicyItems: { item: MenuItem; restaurant: Restaurant }[] = [];
    RESTAURANTS_DATA.forEach(rest => {
      rest.categories.forEach(cat => {
        cat.items.forEach(item => {
          if (item.name.toLowerCase().includes('spicy') || item.description.toLowerCase().includes('spicy') || item.name.toLowerCase().includes('schezwan') || item.name.toLowerCase().includes('biryani')) {
            spicyItems.push({ item, restaurant: rest });
          }
        });
      });
    });

    return {
      message: `Looking for a spicy kick? Try these lip-smacking bold spiced favorites! 🌶️🔥`,
      recommendedItems: spicyItems.slice(0, 4)
    };
  }

  // 5. Healthy food
  if (q.includes('healthy') || q.includes('salad') || q.includes('diet') || q.includes('protein')) {
    const healthyRest = RESTAURANTS_DATA.filter(r => r.cuisines.includes('Healthy') || r.name.includes('Green'));
    return {
      message: `Here are healthy, nutrient-rich meal options prepared with fresh ingredients! 🥑🥗`,
      recommendedRestaurants: healthyRest
    };
  }

  // 6. Food for groups / 4 people
  if (q.includes('four') || q.includes('4') || q.includes('group') || q.includes('family') || q.includes('party')) {
    return {
      message: `For group meals, we recommend family combo packs and rich biryani handis! You can also apply coupon **WELCOME100** or **SUPERFOOD** for maximum savings. 🥳`,
      recommendedRestaurants: RESTAURANTS_DATA.filter(r => r.cuisines.includes('Biryani') || r.cuisines.includes('North Indian')),
      suggestedCoupons: ['WELCOME100', 'SUPERFOOD']
    };
  }

  // 7. General fallback / "What should I eat?"
  const topRestaurants = RESTAURANTS_DATA.filter(r => r.rating >= 4.7).slice(0, 3);
  return {
    message: `Based on your local taste preferences, here are today's highest-rated trending restaurants! You can also try applying coupon **FEAST50** at checkout. ✨`,
    recommendedRestaurants: topRestaurants,
    suggestedCoupons: ['FEAST50', 'FREEDEL']
  };
}
