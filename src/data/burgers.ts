import heroFlyingImg from '../assets/images/hero_flying_burger_1791214674649.jpg';
import thumbSmokyImg from '../assets/images/thumb_smoky_inferno_1791214690757.jpg';
import thumbWoodfireImg from '../assets/images/thumb_woodfire_classic_1791214703552.jpg';
import thumbPurpleImg from '../assets/images/thumb_purple_onion_gourmet_1791214715644.jpg';
import goldRoyaleImg from '../assets/images/menu_gold_royale_1791217618474.jpg';
import paneerBurgerImg from '../assets/images/menu_paneer_burger_1791217635253.jpg';
import truffleFriesImg from '../assets/images/menu_truffle_fries_1791217653201.jpg';
import caramelShakeImg from '../assets/images/menu_caramel_shake_1791217668163.jpg';

export interface BurgerItem {
  id: string;
  name: string;
  headlineFirst: string;
  headlineSecond: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  likesCount: number;
  image: string;
  thumbImage: string;
  calories: string;
  prepTime: string;
  badge?: string;
  ingredients: string[];
  allergens: string[];
  category?: 'burgers' | 'sides' | 'beverages';
}

export const BURGER_ITEMS: BurgerItem[] = [
  {
    id: 'smoky-inferno',
    name: 'Smoky Inferno Smash',
    headlineFirst: 'THE SMOKY',
    headlineSecond: 'INFERNO BLAST',
    description: 'Double flame-seared wagyu patties enveloped in smoke, melted pepper jack, charred jalapeño crunch, and chipotle campfire sauce.',
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    likesCount: 38,
    image: thumbSmokyImg,
    thumbImage: thumbSmokyImg,
    calories: '860 kcal',
    prepTime: '10-12 mins',
    badge: 'Spicy Favorite',
    ingredients: ['Double Wagyu Patty', 'Smoked Pepper Jack', 'Charred Jalapeños', 'Chipotle Campfire Aioli', 'Crispy Shallots', 'Toasted Brioche'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    category: 'burgers'
  },
  {
    id: 'woodfire-classic',
    name: 'Woodfire Classic Deluxe',
    headlineFirst: 'THE VINTAGE',
    headlineSecond: 'WOODFIRE CHEESE',
    description: 'Heritage aged Wisconsin cheddar draped over a thick hand-pressed Angus beef patty with crisp lettuce, heirloom tomato, and house dill relish.',
    price: 299,
    originalPrice: 369,
    rating: 4.8,
    likesCount: 35,
    image: thumbWoodfireImg,
    thumbImage: thumbWoodfireImg,
    calories: '790 kcal',
    prepTime: '8-10 mins',
    badge: 'Classic Heritage',
    ingredients: ['Hand-Pressed Angus Beef', 'Aged Wisconsin Cheddar', 'Crisp Iceberg Lettuce', 'Vine-Ripe Tomato', 'House Pickle Relish', 'Toasted Sesame Bun'],
    allergens: ['Dairy', 'Gluten'],
    category: 'burgers'
  },
  {
    id: 'ultimate-haven',
    name: 'The Ultimate Bling Burger',
    headlineFirst: 'THE ULTIMATE',
    headlineSecond: 'BURGER BLING',
    description: 'Welcome to our Burger Bling Paradise, where every bite is a journey into flavor perfection! Indulge in a symphony of premium ingredients, expertly crafted patties, and mouthwatering sauces.',
    price: 399,
    originalPrice: 499,
    rating: 5.0,
    likesCount: 42,
    image: heroFlyingImg,
    thumbImage: heroFlyingImg,
    calories: '920 kcal',
    prepTime: '12-14 mins',
    badge: "Chef's Masterpiece",
    ingredients: ['Prime Dry-Aged Beef', 'Golden Melted Cheddar', 'Curled Hydroponic Lettuce', 'Roma Tomato Slab', 'Secret Bling Drizzle', 'Glazed Sesame Crown'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Sesame'],
    category: 'burgers'
  },
  {
    id: 'purple-velvet',
    name: 'Purple Velvet Truffle',
    headlineFirst: 'THE PURPLE',
    headlineSecond: 'VELVET GOURMET',
    description: 'Sumptuous black truffle aioli with shaved purple sweet red onions, baby wild arugula, cherry tomato compote, and caramelized brioche.',
    price: 379,
    originalPrice: 459,
    rating: 4.9,
    likesCount: 29,
    image: thumbPurpleImg,
    thumbImage: thumbPurpleImg,
    calories: '810 kcal',
    prepTime: '10-12 mins',
    badge: 'Truffle Specialty',
    ingredients: ['Black Angus Chuck Patty', 'Marinated Purple Onions', 'Black Truffle Aioli', 'Wild Baby Arugula', 'Slow-Roasted Cherry Tomatoes', 'Artisan Brioche'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    category: 'burgers'
  },
  {
    id: 'gold-royale',
    name: 'Bling Gold Royale 24K',
    headlineFirst: 'THE 24K',
    headlineSecond: 'GOLD ROYALE',
    description: 'Ultra-luxurious double smashed patty crowned with edible gold dust, double gruyère cheese, black summer truffle butter, and gold-glazed brioche.',
    price: 499,
    originalPrice: 599,
    rating: 5.0,
    likesCount: 56,
    image: goldRoyaleImg,
    thumbImage: goldRoyaleImg,
    calories: '950 kcal',
    prepTime: '15 mins',
    badge: 'Luxury Signature',
    ingredients: ['Double Wagyu Patty', '24K Edible Gold Flakes', 'Double Gruyère Cheese', 'Black Summer Truffle Butter', 'Gold Glazed Brioche'],
    allergens: ['Dairy', 'Gluten'],
    category: 'burgers'
  },
  {
    id: 'paneer-tikka-flame',
    name: 'Spiced Paneer Tikka Flame',
    headlineFirst: 'THE TANDOOR',
    headlineSecond: 'PANEER CRUNCH',
    description: 'Charcoal-grilled cottage cheese steak marinated in hand-pounded Malwa tandoori spices, topped with mint chutney, pickled onion slaw, and toasted bun.',
    price: 279,
    originalPrice: 349,
    rating: 4.8,
    likesCount: 44,
    image: paneerBurgerImg,
    thumbImage: paneerBurgerImg,
    calories: '680 kcal',
    prepTime: '10 mins',
    badge: 'Indore Special',
    ingredients: ['Grilled Malwa Paneer Steak', 'Fresh Mint Chutney', 'Charred Capsicum', 'Crisp Red Onion Rings', 'Toasted Sesame Bun'],
    allergens: ['Dairy', 'Gluten'],
    category: 'burgers'
  }
];

export interface ExtraMenuItem {
  id: string;
  name: string;
  category: 'sides' | 'beverages';
  price: number;
  description: string;
  calories: string;
  tag?: string;
  image: string;
}

export const EXTRA_MENU_ITEMS: ExtraMenuItem[] = [
  {
    id: 'truffle-fries',
    name: 'Parmesan Truffle Fries',
    category: 'sides',
    price: 149,
    description: 'Crispy skin-on golden potatoes tossed with black truffle oil, aged parmesan, and fresh rosemary.',
    calories: '420 kcal',
    tag: 'Best Seller',
    image: truffleFriesImg,
  },
  {
    id: 'onion-rings',
    name: 'Smoked Paprika Onion Rings',
    category: 'sides',
    price: 129,
    description: 'Thick-cut sweet Indore onions in golden crunchy batter dusted with smoked paprika.',
    calories: '380 kcal',
    image: thumbSmokyImg,
  },
  {
    id: 'sweet-potato',
    name: 'Crisp Sweet Potato Wedges',
    category: 'sides',
    price: 139,
    description: 'Hand-cut roasted sweet potato wedges served with a side of maple chipotle dip.',
    calories: '340 kcal',
    image: thumbWoodfireImg,
  },
  {
    id: 'salted-caramel-shake',
    name: 'Smoked Sea Salt Caramel Shake',
    category: 'beverages',
    price: 169,
    description: 'Hand-spun Madagascar vanilla gelato with swirl of burnt caramel and Himalayan salt.',
    calories: '560 kcal',
    tag: 'Signature Drink',
    image: caramelShakeImg,
  },
  {
    id: 'blood-orange-soda',
    name: 'Craft Blood Orange Fizz',
    category: 'beverages',
    price: 99,
    description: 'Sparkling artisan soda infused with natural blood oranges and fresh crushed mint leaves.',
    calories: '120 kcal',
    image: heroFlyingImg,
  },
  {
    id: 'haven-coldbrew',
    name: 'Nitro Cold Brew Float',
    category: 'beverages',
    price: 139,
    description: 'Single-origin Karnataka cold brew coffee with a float of bourbon vanilla cream.',
    calories: '140 kcal',
    image: caramelShakeImg,
  },
];

export interface CartItem {
  id: string;
  burgerId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  bunType: string;
  extraToppings: string[];
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'Pending' | 'Sizzling on Grill' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
  estimatedDelivery: string;
}

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord-101',
    orderNumber: '#BLING-8421',
    customerName: 'Aseem Joshi',
    customerEmail: 'joshiaseem6@gmail.com',
    customerPhone: '+91 98260 12345',
    deliveryAddress: '167, Vaishali Nagar, Indore, MP 452009',
    items: [
      {
        id: 'item-1',
        burgerId: 'ultimate-haven',
        name: 'The Ultimate Bling Burger (DOUBLE)',
        price: 399,
        quantity: 2,
        image: heroFlyingImg,
        bunType: 'Brioche',
        extraToppings: ['Applewood Smoked Bacon', 'Secret Bling Truffle Drizzle'],
      },
      {
        id: 'item-2',
        burgerId: 'truffle-fries',
        name: 'Parmesan Truffle Fries',
        price: 149,
        quantity: 1,
        image: truffleFriesImg,
        bunType: 'N/A',
        extraToppings: [],
      }
    ],
    subtotal: 947,
    discount: 100,
    deliveryFee: 0,
    totalAmount: 847,
    paymentMethod: 'UPI / Online Payment',
    status: 'Sizzling on Grill',
    createdAt: 'Today, 04:15 PM',
    estimatedDelivery: '18 mins',
  },
  {
    id: 'ord-102',
    orderNumber: '#BLING-8420',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.s@outlook.com',
    customerPhone: '+91 94250 88712',
    deliveryAddress: '167, Vaishali Nagar, Indore, MP 452009',
    items: [
      {
        id: 'item-3',
        burgerId: 'gold-royale',
        name: 'Bling Gold Royale 24K',
        price: 499,
        quantity: 1,
        image: goldRoyaleImg,
        bunType: 'Gold Glazed Brioche',
        extraToppings: ['Extra Melted Cheddar'],
      },
      {
        id: 'item-4',
        burgerId: 'salted-caramel-shake',
        name: 'Smoked Sea Salt Caramel Shake',
        price: 169,
        quantity: 2,
        image: caramelShakeImg,
        bunType: 'N/A',
        extraToppings: [],
      }
    ],
    subtotal: 837,
    discount: 0,
    deliveryFee: 0,
    totalAmount: 837,
    paymentMethod: 'Cash on Delivery',
    status: 'Out for Delivery',
    createdAt: 'Today, 03:45 PM',
    estimatedDelivery: '8 mins',
  },
  {
    id: 'ord-103',
    orderNumber: '#BLING-8419',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul.v@gmail.com',
    customerPhone: '+91 99811 44521',
    deliveryAddress: '167, Vaishali Nagar, Indore, MP 452009',
    items: [
      {
        id: 'item-5',
        burgerId: 'paneer-tikka-flame',
        name: 'Spiced Paneer Tikka Flame',
        price: 279,
        quantity: 2,
        image: paneerBurgerImg,
        bunType: 'Brioche',
        extraToppings: [],
      }
    ],
    subtotal: 558,
    discount: 50,
    deliveryFee: 0,
    totalAmount: 508,
    paymentMethod: 'UPI / GPay',
    status: 'Delivered',
    createdAt: 'Today, 02:10 PM',
    estimatedDelivery: 'Delivered',
  },
  {
    id: 'ord-104',
    orderNumber: '#BLING-8418',
    customerName: 'Sneha Patel',
    customerEmail: 'sneha.p@indore.in',
    customerPhone: '+91 97555 11984',
    deliveryAddress: '167, Vaishali Nagar, Indore, MP 452009',
    items: [
      {
        id: 'item-6',
        burgerId: 'smoky-inferno',
        name: 'Smoky Inferno Smash',
        price: 349,
        quantity: 1,
        image: thumbSmokyImg,
        bunType: 'Potato Bun',
        extraToppings: ['Charred Jalapeños'],
      }
    ],
    subtotal: 349,
    discount: 0,
    deliveryFee: 40,
    totalAmount: 389,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    createdAt: 'Today, 01:25 PM',
    estimatedDelivery: 'Delivered',
  }
];
