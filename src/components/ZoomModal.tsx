import React from 'react';
import { X, Flame, Sparkles, Clock, ShieldCheck, Heart } from 'lucide-react';
import { BurgerItem } from '../data/burgers';

interface ZoomModalProps {
  burger: BurgerItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderNow: (burger: BurgerItem) => void;
  isLiked: boolean;
  onToggleLike: () => void;
}

export const ZoomModal: React.FC<ZoomModalProps> = ({
  burger,
  isOpen,
  onClose,
  onOrderNow,
  isLiked,
  onToggleLike,
}) => {
  if (!isOpen || !burger) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Huge Burger Image with Floating Details */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex items-center justify-center bg-black relative">
          <div className="relative w-full max-w-sm flex items-center justify-center">
            <div className="absolute inset-0 bg-orange-600/10 blur-3xl rounded-full pointer-events-none" />
            <img
              src={burger.image}
              alt={burger.name}
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform hover:scale-105 duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right: Details & Ingredients */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-neutral-800 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {burger.badge || 'Chef Signature'}
              </span>
              <button
                onClick={onToggleLike}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-400'
                  }`}
                />
                <span className="tabular-nums">{burger.likesCount + (isLiked ? 1 : 0)}</span>
              </button>
            </div>

            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider leading-tight">
                {burger.name}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-orange-400 font-heading text-2xl font-bold tabular-nums">
                  ₹{burger.price}
                </span>
                {burger.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through tabular-nums">
                    ₹{burger.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {burger.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 flex items-center gap-2.5 text-xs">
                <Clock className="w-4 h-4 text-orange-400" />
                <div>
                  <div className="text-neutral-400 text-[10px]">Prep Time</div>
                  <div className="text-white font-semibold">{burger.prepTime}</div>
                </div>
              </div>

              <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 flex items-center gap-2.5 text-xs">
                <Flame className="w-4 h-4 text-orange-400" />
                <div>
                  <div className="text-neutral-400 text-[10px]">Energy</div>
                  <div className="text-white font-semibold">{burger.calories}</div>
                </div>
              </div>
            </div>

            {/* Premium Ingredients */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Craft Ingredients</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {burger.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 rounded-lg border border-neutral-800"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Allergens Notice */}
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>Contains: {burger.allergens.join(', ')}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-neutral-800">
            <button
              onClick={() => {
                onClose();
                onOrderNow(burger);
              }}
              className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all cursor-pointer"
            >
              Order {burger.name} (₹{burger.price})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
