import React from 'react';
import { X, Plus, Package } from 'lucide-react';
import { CartItem } from '../data/burgers';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  defaultBurgerImage: string;
}

interface MerchItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'bling-sauce-bottle',
    name: 'Secret Bling Umami Drizzle (350ml)',
    category: 'Bottled Sauces',
    price: 249,
    description: 'Our iconic golden umami sauce bottled fresh at Vaishali Nagar, Indore. Ideal for dipping and burgers.',
  },
  {
    id: 'chipotle-campfire-sauce',
    name: 'Smoky Inferno Campfire Sauce (300ml)',
    category: 'Bottled Sauces',
    price: 229,
    description: 'Slow-smoked jalapeño and roasted garlic sauce with a medium fiery kick.',
  },
  {
    id: 'bling-snapback-cap',
    name: 'Burger Bling Corduroy Cap',
    category: 'Streetwear Merch',
    price: 599,
    description: 'Premium black corduroy 6-panel cap featuring the golden embroidered Burger Bling emblem.',
  },
  {
    id: 'bling-heavy-apron',
    name: 'Master Grill Heavy Canvas Apron',
    category: 'Streetwear Merch',
    price: 899,
    description: 'Commercial 16oz waxed cotton canvas with brass rivets and tool pockets for grill masters.',
  },
];

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  defaultBurgerImage,
}) => {
  if (!isOpen) return null;

  const handleAddMerch = (item: MerchItem) => {
    onAddToCart({
      id: `${item.id}-${Date.now()}`,
      burgerId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: defaultBurgerImage,
      bunType: 'N/A',
      extraToppings: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-400" />
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              Burger Bling Shop & Merch
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MERCH_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-white text-sm font-bold mt-1">
                    {item.name}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-neutral-800/80">
                  <span className="text-orange-400 font-heading text-base font-bold tabular-nums">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAddMerch(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
