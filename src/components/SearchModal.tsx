import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { BurgerItem } from '../data/burgers';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  burgers: BurgerItem[];
  onSelectBurger: (burger: BurgerItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  burgers,
  onSelectBurger,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? burgers.filter(
        (b) =>
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.description.toLowerCase().includes(query.toLowerCase()) ||
          b.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase()))
      )
    : burgers;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-800">
          <Search className="w-5 h-5 text-orange-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search burgers, ingredients, sauces..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-500 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-white bg-neutral-900 px-2 py-1 rounded cursor-pointer"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              No matching burger found for "{query}".
            </div>
          ) : (
            filtered.map((burger) => (
              <button
                key={burger.id}
                onClick={() => {
                  onSelectBurger(burger);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={burger.thumbImage}
                    alt={burger.name}
                    className="w-12 h-12 rounded-lg object-cover border border-neutral-800"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-heading text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                      {burger.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">
                      {burger.ingredients.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-orange-400 text-xs font-bold tabular-nums">
                    ₹{burger.price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
