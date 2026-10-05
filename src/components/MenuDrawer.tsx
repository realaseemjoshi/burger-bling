import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { BurgerItem, CartItem, EXTRA_MENU_ITEMS, ExtraMenuItem } from '../data/burgers';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  burgers: BurgerItem[];
  onSelectBurgerToOrder: (burger: BurgerItem) => void;
  onQuickAdd: (item: CartItem) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  burgers,
  onSelectBurgerToOrder,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  const [activeCategory, setActiveCategory] = useState<'all' | 'burgers' | 'sides' | 'beverages'>('all');

  const filteredExtras =
    activeCategory === 'all'
      ? EXTRA_MENU_ITEMS
      : EXTRA_MENU_ITEMS.filter((item) => item.category === activeCategory);

  const showBurgers = activeCategory === 'all' || activeCategory === 'burgers';

  const handleQuickAddExtra = (item: ExtraMenuItem) => {
    onQuickAdd({
      id: `${item.id}-${Date.now()}`,
      burgerId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      bunType: 'N/A',
      extraToppings: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-neutral-950 border-l border-neutral-800 h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div>
            <h2 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
              Burger Bling Artisan Menu
            </h2>
            <p className="text-neutral-400 text-xs mt-0.5">
              Freshly grilled at 167, Vaishali Nagar, Indore
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-3 border-b border-neutral-800/80 bg-neutral-900/40 flex items-center gap-2 overflow-x-auto">
          {[
            { key: 'all', label: 'All Items' },
            { key: 'burgers', label: 'Signature Burgers' },
            { key: 'sides', label: 'Crispy Sides' },
            { key: 'beverages', label: 'Craft Shakes & Drinks' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Signature Burgers Section */}
          {showBurgers && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-sm text-neutral-300 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>Artisan Burgers ({burgers.length})</span>
                </h3>
                <span className="text-xs text-neutral-500">100% Fresh Daily</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {burgers.map((burger) => (
                  <div
                    key={burger.id}
                    className="flex flex-col justify-between p-4 rounded-xl border border-neutral-800/90 bg-neutral-900/40 hover:border-neutral-700 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={burger.thumbImage}
                        alt={burger.name}
                        className="w-18 h-18 rounded-xl object-cover border border-neutral-800 shrink-0 transform group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-heading text-white text-sm font-bold truncate">
                            {burger.name}
                          </h4>
                          {burger.badge && (
                            <span className="text-[9px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                              {burger.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-400 text-xs line-clamp-2 mt-1">
                          {burger.description}
                        </p>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          {burger.calories} • {burger.prepTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800/60">
                      <div>
                        <span className="text-orange-400 font-heading text-base font-bold tabular-nums">
                          ₹{burger.price}
                        </span>
                        {burger.originalPrice && (
                          <span className="text-xs text-neutral-500 line-through ml-1.5 tabular-nums">
                            ₹{burger.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectBurgerToOrder(burger);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Customize</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sides & Drinks Section with dedicated images */}
          {filteredExtras.length > 0 && (
            <div>
              <h3 className="font-heading text-sm text-neutral-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span>
                  {activeCategory === 'beverages'
                    ? 'Craft Shakes & Cold Beverages'
                    : activeCategory === 'sides'
                    ? 'Crispy Gourmet Sides'
                    : 'Sides & Hand-Spun Shakes'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredExtras.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between p-4 rounded-xl border border-neutral-800/90 bg-neutral-900/40 hover:border-neutral-700 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-neutral-800 shrink-0 transform group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading text-white text-sm font-bold truncate">
                            {item.name}
                          </h4>
                          {item.tag && (
                            <span className="text-[9px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 shrink-0 ml-1">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-400 text-xs mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          {item.calories}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800/60">
                      <span className="text-orange-400 font-heading text-base font-bold tabular-nums">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => handleQuickAddExtra(item)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-orange-500 hover:text-white text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
