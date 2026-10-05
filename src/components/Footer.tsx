import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenMenu: () => void;
  onOpenShop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenMenu, onOpenShop }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-black border-t border-neutral-900 py-12 px-6 sm:px-10 lg:px-16 text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white/80"
              viewBox="0 0 44 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            >
              <polygon points="22,2 41,13 41,35 22,46 3,35 3,13" stroke="currentColor" fill="none" opacity="0.8" />
              <path d="M14 17c0-3.5 3.5-5 8-5s8 1.5 8 5" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M13 22h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 26c1.5 1 3.5 1 5 0s3.5-1 5 0 3.5 1 5 0 3.5-1 5 0" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M14 30h16c0 2.5-3.5 4-8 4s-8-1.5-8-4z" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-white text-xs tracking-widest font-extrabold uppercase">
                BURGER BLING
              </span>
              <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 font-bold">
                INDORE
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-neutral-600" />
              <span>167, Vaishali Nagar, Indore</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
          <button
            onClick={() => onScrollTo('home')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={onOpenMenu}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Menu
          </button>
          <button
            onClick={() => onScrollTo('about')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onScrollTo('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={onOpenShop}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Shop
          </button>
        </div>

        {/* Back to top button & copyright */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-neutral-500">
            © 2026 Burger Bling. Indore, MP.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
