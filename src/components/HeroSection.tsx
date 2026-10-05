import React from 'react';
import { Heart, Maximize2, Sparkles, ChevronDown } from 'lucide-react';
import { BurgerItem } from '../data/burgers';

interface HeroSectionProps {
  burgers: BurgerItem[];
  selectedIndex: number;
  onSelectBurger: (index: number) => void;
  onOrderNow: (burger: BurgerItem) => void;
  onViewMenu: () => void;
  onZoomBurger: (burger: BurgerItem) => void;
  isLiked: boolean;
  onToggleLike: () => void;
  likesCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  burgers,
  selectedIndex,
  onSelectBurger,
  onOrderNow,
  onViewMenu,
  onZoomBurger,
  isLiked,
  onToggleLike,
  likesCount,
}) => {
  const currentBurger = burgers[selectedIndex] || burgers[2];

  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-8 pb-12 z-10"
    >
      {/* Main Grid: Left copy & CTAs, Right side floating controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto w-full">
        {/* Left Column: Headlines, Paragraph, CTAs, Thumbnails */}
        <div className="lg:col-span-8 flex flex-col justify-center max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4 w-fit backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 300 FPS Masterpiece</span>
          </div>

          {/* Main Display Headline */}
          <div className="mb-4">
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase text-white tracking-wider leading-[0.92] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {currentBurger.headlineFirst}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 block mt-1 drop-shadow-[0_4px_20px_rgba(249,115,22,0.4)]">
                {currentBurger.headlineSecond}
              </span>
            </h1>
          </div>

          {/* Subtitle / Paragraph with frosted glass backing for contrast */}
          <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            {currentBurger.description}
          </p>

          {/* Action CTAs: Order Now & View Menu */}
          <div className="flex items-center gap-6 mb-8 sm:mb-10">
            <button
              onClick={() => onOrderNow(currentBurger)}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 shadow-[0_4px_25px_rgba(249,115,22,0.55)] hover:shadow-[0_6px_35px_rgba(249,115,22,0.8)] hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Order Now</span>
            </button>

            <button
              onClick={onViewMenu}
              className="text-orange-400 hover:text-orange-300 font-semibold text-sm sm:text-base transition-colors duration-200 cursor-pointer hover:underline underline-offset-4 bg-black/30 backdrop-blur-md px-5 py-3 rounded-xl border border-orange-500/20 hover:border-orange-500/40"
            >
              View Menu
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="pt-2">
            <div className="flex items-end gap-3 sm:gap-4">
              {burgers.map((burger, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div key={burger.id} className="relative flex flex-col items-center">
                    {/* Active Indicator Arrow Pointer */}
                    {isSelected ? (
                      <div className="mb-1 text-orange-500 transition-all duration-300 animate-bounce">
                        <svg className="w-3.5 h-2.5 fill-current" viewBox="0 0 14 10">
                          <polygon points="0,0 14,0 7,10" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-3.5 mb-1" />
                    )}

                    {/* Thumbnail Card */}
                    <button
                      onClick={() => onSelectBurger(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                        isSelected
                          ? 'border-2 border-orange-500 ring-2 ring-orange-500/40 scale-105 shadow-[0_0_20px_rgba(249,115,22,0.45)]'
                          : 'border border-neutral-700/80 hover:border-neutral-400 bg-neutral-900/80 opacity-80 hover:opacity-100 backdrop-blur-sm'
                      }`}
                      aria-label={`Select ${burger.name}`}
                    >
                      <img
                        src={burger.thumbImage}
                        alt={burger.name}
                        className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Floating Side Actions & Live Controls */}
        <div className="lg:col-span-4 flex justify-end items-center">
          <aside aria-label="Quick burger actions" className="flex flex-col items-center gap-4">
            {/* Glass Pill with Like Heart & Expand Icons */}
            <div className="flex flex-col items-center bg-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 gap-3.5 shadow-2xl">
              {/* Heart Button */}
              <button
                onClick={onToggleLike}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 group"
                title={isLiked ? 'Unlike' : 'Like this burger'}
                aria-label={isLiked ? 'Unlike' : 'Like this burger'}
              >
                <Heart
                  className={`w-6 h-6 transition-all duration-200 ${
                    isLiked
                      ? 'fill-red-500 text-red-500 scale-110'
                      : 'text-neutral-300 group-hover:text-white stroke-[2]'
                  }`}
                />
              </button>

              {/* Fullscreen Expand / Zoom Button */}
              <button
                onClick={() => onZoomBurger(currentBurger)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 text-neutral-300 hover:text-white"
                title="Expand preview"
                aria-label="Expand preview"
              >
                <Maximize2 className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Sparkle Count Widget (42 in screenshot) */}
            <div className="flex flex-col items-center justify-center bg-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-2xl px-3.5 py-2.5 shadow-2xl min-w-[56px]">
              <span className="font-heading text-sm font-bold text-white tracking-wider tabular-nums">
                {likesCount}
              </span>
              <Sparkles className="w-4 h-4 text-orange-400 mt-0.5" />
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex flex-col items-center justify-center pt-8 pointer-events-none select-none">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-neutral-300 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping inline-block" />
          <span>Scroll down to build the burger</span>
          <ChevronDown className="w-4 h-4 text-orange-400 animate-bounce ml-1" />
        </div>
      </div>
    </section>
  );
};
