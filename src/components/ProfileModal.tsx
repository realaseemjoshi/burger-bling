import React from 'react';
import { X, Award, Sparkles, Clock, Shield, MapPin, LogOut } from 'lucide-react';
import { UserProfile } from './AuthModal';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  likesCount: number;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  likesCount,
  currentUser,
  onLogout,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-400" />
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              Bling Passport
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

        <div className="p-6 space-y-6">
          {/* Member Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-orange-950/40 border border-neutral-800 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  {currentUser?.role === 'admin' ? 'Burger Bling Admin' : 'Gold Bling Diner'}
                </span>
                <h3 className="font-heading text-white text-base font-bold mt-0.5">
                  {currentUser ? currentUser.name : 'Aseem Joshi'}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span className="truncate">{currentUser ? currentUser.address : '167, Vaishali Nagar, Indore'}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-heading font-bold text-xs">
                {currentUser ? currentUser.name.slice(0, 2).toUpperCase() : 'AJ'}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                  Bling Points
                </div>
                <div className="text-xl font-heading font-bold text-white flex items-center gap-1.5">
                  <span>{likesCount}</span>
                  <Sparkles className="w-4 h-4 text-orange-400" />
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                  Tier
                </div>
                <div className="text-xs font-semibold text-emerald-400">
                  {currentUser?.role === 'admin' ? 'Grill Admin' : 'Active VIP'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Perks */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Indore Diner Privileges
            </h4>
            <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center gap-3">
              <Award className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Free Truffle Fries with every 50 Bling Points</span>
            </div>
            <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center gap-3">
              <Clock className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Priority cast iron sear at Vaishali Nagar kitchen</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-red-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Sign In / Switch User
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
