import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { BurgerItem, CartItem } from '../data/burgers';

interface OrderModalProps {
  burger: BurgerItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  burger,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !burger) return null;

  const [patties, setPatties] = useState<'single' | 'double' | 'triple'>('double');
  const [bun, setBun] = useState<'Brioche' | 'Gluten-Free' | 'Potato Bun'>('Brioche');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const extrasList = [
    { name: 'Applewood Smoked Bacon', price: 60 },
    { name: 'Extra Melted Cheddar', price: 40 },
    { name: 'Caramelized Sweet Onions', price: 30 },
    { name: 'Charred Jalapeño Rings', price: 25 },
    { name: 'Secret Bling Truffle Drizzle', price: 50 },
  ];

  const pattyUpcharge = patties === 'single' ? -50 : patties === 'triple' ? 90 : 0;
  const extrasTotal = selectedExtras.reduce((sum, extraName) => {
    const item = extrasList.find((e) => e.name === extraName);
    return sum + (item ? item.price : 0);
  }, 0);

  const unitPrice = Math.max(199, burger.price + pattyUpcharge + extrasTotal);
  const totalPrice = unitPrice * quantity;

  const toggleExtra = (name: string) => {
    setSelectedExtras((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleConfirm = () => {
    const newItem: CartItem = {
      id: `${burger.id}-${Date.now()}`,
      burgerId: burger.id,
      name: `${burger.name} (${patties.toUpperCase()})`,
      price: unitPrice,
      quantity,
      image: burger.thumbImage,
      bunType: bun,
      extraToppings: selectedExtras,
    };
    onAddToCart(newItem);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              Customize Your Order
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Item Preview */}
          <div className="flex items-center gap-4 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80">
            <img
              src={burger.thumbImage}
              alt={burger.name}
              className="w-20 h-20 rounded-lg object-cover border border-neutral-800 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-heading text-white text-base font-bold">
                {burger.name}
              </h3>
              <p className="text-neutral-400 text-xs mt-0.5 line-clamp-2">
                {burger.description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-orange-400">
                <span>₹{burger.price} base</span>
                <span>•</span>
                <span>{burger.calories}</span>
              </div>
            </div>
          </div>

          {/* Patty Configuration */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Patty Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'single', label: 'Single Patty', note: '-₹50' },
                { key: 'double', label: 'Double (Standard)', note: 'Included' },
                { key: 'triple', label: 'Triple Beast', note: '+₹90' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setPatties(opt.key as any)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    patties === opt.key
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{opt.label}</div>
                  <div className="text-[11px] text-orange-400/90 mt-0.5">{opt.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Bun Selection */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Artisan Bun
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Brioche', 'Gluten-Free', 'Potato Bun'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBun(b as any)}
                  className={`p-2.5 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                    bun === b
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Toppings */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Extra Toppings & Gourmet Sauces
            </label>
            <div className="space-y-2">
              {extrasList.map((extra) => {
                const isChecked = selectedExtras.includes(extra.name);
                return (
                  <button
                    key={extra.name}
                    type="button"
                    onClick={() => toggleExtra(extra.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                      isChecked
                        ? 'border-orange-500/80 bg-orange-500/10 text-white'
                        : 'border-neutral-800/80 bg-neutral-950/40 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'border-orange-500 bg-orange-500 text-white'
                            : 'border-neutral-600 bg-neutral-900'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{extra.name}</span>
                    </div>
                    <span className="text-orange-400 font-semibold tabular-nums">
                      +₹{extra.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-neutral-400 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-white text-sm font-bold min-w-[20px] text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleConfirm}
            disabled={addedSuccess}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.4)]'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <span>Add to Order</span>
                <span>•</span>
                <span className="tabular-nums font-bold">₹{totalPrice}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
