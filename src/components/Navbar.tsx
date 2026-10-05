import React from 'react';
import { User, ShoppingCart, ShieldCheck } from 'lucide-react';
import { UserProfile } from './AuthModal';

export type NavTabType = 'home' | 'menu' | 'about' | 'contact' | 'shop';

interface NavbarProps {
  activeTab: NavTabType;
  onNavigate: (tab: NavTabType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAuth,
  currentUser,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-6 sm:px-10 lg:px-16 py-4 bg-black/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between transition-colors">
      {/* Brand Zone - Stylized Hexagonal Burger Bling Logo */}
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg text-left cursor-pointer"
        aria-label="Burger Bling Home"
      >
        <div className="relative flex items-center justify-center w-10 h-10 transition-transform duration-200 group-hover:scale-105">
          {/* Hexagon Outline Graphic */}
          <svg
            className="w-10 h-10 text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
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
        <div className="flex flex-col">
          <span className="font-heading text-xs tracking-[0.2em] font-extrabold text-white uppercase leading-tight group-hover:text-orange-400 transition-colors">
            BURGER
          </span>
          <span className="font-heading text-[10px] tracking-[0.28em] font-bold text-orange-400 uppercase leading-tight group-hover:text-orange-300 transition-colors">
            BLING
          </span>
        </div>
      </button>

      {/* Nav Links Center */}
      <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm tracking-wide font-medium">
        <button
          onClick={() => onNavigate('home')}
          className={`transition-colors duration-200 cursor-pointer ${
            activeTab === 'home'
              ? 'text-orange-500 font-semibold'
              : 'text-neutral-300 hover:text-white'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('menu')}
          className={`transition-colors duration-200 cursor-pointer ${
            activeTab === 'menu'
              ? 'text-orange-500 font-semibold'
              : 'text-neutral-300 hover:text-white'
          }`}
        >
          Menu
        </button>
        <button
          onClick={() => onNavigate('about')}
          className={`transition-colors duration-200 cursor-pointer ${
            activeTab === 'about'
              ? 'text-orange-500 font-semibold'
              : 'text-neutral-300 hover:text-white'
          }`}
        >
          About
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className={`transition-colors duration-200 cursor-pointer ${
            activeTab === 'contact'
              ? 'text-orange-500 font-semibold'
              : 'text-neutral-300 hover:text-white'
          }`}
        >
          Contact
        </button>
        <button
          onClick={() => onNavigate('shop')}
          className={`transition-colors duration-200 cursor-pointer ${
            activeTab === 'shop'
              ? 'text-orange-500 font-semibold'
              : 'text-neutral-300 hover:text-white'
          }`}
        >
          Shop
        </button>
      </nav>

      {/* Right Controls: Admin quick link, Search, User/Auth, Cart */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Admin Portal Direct Button */}
        {currentUser?.role === 'admin' ? (
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(249,115,22,0.6)] cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border border-neutral-800 hover:border-orange-500/40 text-neutral-400 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
            title="Admin & User Login"
          >
            <ShieldCheck className="w-3 h-3 text-orange-400" />
            <span>Admin</span>
          </button>
        )}

        {/* Search trigger */}
        <button
          onClick={onOpenSearch}
          className="relative text-neutral-300 hover:text-white transition-colors p-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded-full cursor-pointer"
          title="Search Menu"
          aria-label="Search Menu"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-white/90 hover:bg-orange-400 transition-colors inline-block shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
          </div>
        </button>

        {/* User Account / Login */}
        <button
          onClick={onOpenAuth}
          className="text-neutral-300 hover:text-white transition-colors p-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded-full cursor-pointer flex items-center gap-1.5"
          title={currentUser ? currentUser.name : 'Sign In'}
          aria-label="User Account"
        >
          <div className="relative">
            <User className="w-5 h-5 stroke-[2.2]" />
            {currentUser && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </div>
        </button>

        {/* Shopping Cart */}
        <button
          onClick={onOpenCart}
          className="relative text-neutral-300 hover:text-white transition-colors p-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded-full cursor-pointer"
          title="Shopping Cart"
          aria-label={`Shopping Cart (${cartCount} items)`}
        >
          <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
