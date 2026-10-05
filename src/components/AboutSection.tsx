import React from 'react';
import { Flame, Clock, Award, Sparkles, ChefHat, MapPin } from 'lucide-react';

interface AboutSectionProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOrderNow, onViewMenu }) => {
  return (
    <section id="about" className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-black/55 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-[0.25em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Burger Bling Philosophy</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white uppercase tracking-wider leading-[1.05]">
            CRAFTED WITH
            <br />
            <span className="text-orange-500">OBSESSIVE PERFECTION</span>
          </h2>
          <p className="mt-5 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Welcome to Burger Bling at 167, Vaishali Nagar, Indore. Every single burger we smash on our 600°F cast iron grill is a testament to gourmet craftsmanship, wild-fermented brioche buns, and proprietary golden umami sauces.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-orange-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-3">
              600°F Hard Sear
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Prime Angus beef and fresh Malwa paneer steaks smashed over blazing cast iron to lock in sizzling juices and develop an ultra-crispy caramelized crust.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-orange-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-105 transition-transform">
              <Clock className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-3">
              36-Hour Brioche
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Hand-rolled French brioche buns fermented with wild yeast, enriched with pure churned cream butter, and toasted in clarified ghee right before assembly.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-orange-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-3">
              Secret Bling Drizzle
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              A 24-hour slow reduction of smoked bone marrow, charred chilies, confit garlic, and golden truffle essence providing our signature umami burst.
            </p>
          </div>
        </div>

        {/* Quality Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-neutral-950/40 border border-neutral-800 mb-12">
          <div className="text-center p-3">
            <div className="font-heading text-2xl sm:text-3xl font-black text-white tabular-nums">
              100%
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
              Fresh Daily Cuts
            </div>
          </div>

          <div className="text-center p-3 border-l border-neutral-800/80">
            <div className="font-heading text-2xl sm:text-3xl font-black text-orange-400 tabular-nums">
              600°F
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
              Cast Iron Sear
            </div>
          </div>

          <div className="text-center p-3 border-l border-neutral-800/80">
            <div className="font-heading text-2xl sm:text-3xl font-black text-white tabular-nums">
              36 hrs
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
              Brioche Ferment
            </div>
          </div>

          <div className="text-center p-3 border-l border-neutral-800/80">
            <div className="font-heading text-2xl sm:text-3xl font-black text-orange-400 tabular-nums">
              4.9 ★
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
              Indore Diner Rating
            </div>
          </div>
        </div>

        {/* Chef Statement & Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-neutral-950 via-neutral-900/60 to-orange-950/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white text-sm sm:text-base font-medium italic">
                "We don't cut corners. We don't freeze patties. Every single bite must be pure culinary bling."
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-orange-400 font-bold">
                  Chef Marco & Team — 167, Vaishali Nagar, Indore
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onViewMenu}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 transition-colors cursor-pointer"
            >
              View Menu
            </button>
            <button
              onClick={onOrderNow}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:brightness-110 shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all cursor-pointer"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
