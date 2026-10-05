import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, KeyRound, Sparkles } from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  onOpenAdminDirectly?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'user' | 'admin'>('user');
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('167, Vaishali Nagar, Indore, MP 452009');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminQuickFill = () => {
    setEmail('admin@burgerbling.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  const handleUserQuickFill = () => {
    setName('Aseem Joshi');
    setEmail('joshiaseem6@gmail.com');
    setPhone('+91 98260 12345');
    setPassword('bling123');
    setAddress('167, Vaishali Nagar, Indore, MP 452009');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'admin') {
      // Validate Admin Credentials
      if (
        (email.trim().toLowerCase() === 'admin@burgerbling.com' || email.trim().toLowerCase() === 'admin') &&
        password === 'admin123'
      ) {
        onLoginSuccess({
          name: 'Chief Grill Master (Admin)',
          email: 'admin@burgerbling.com',
          phone: '+91 98260 00000',
          address: '167, Vaishali Nagar, Indore, MP 452009',
          role: 'admin',
        });
        onClose();
      } else {
        setErrorMsg('Invalid admin credentials. Use admin@burgerbling.com / admin123');
      }
    } else {
      // User sign-in or sign-up
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Please provide both email and password.');
        return;
      }
      onLoginSuccess({
        name: name.trim() || 'Aseem Joshi',
        email: email.trim(),
        phone: phone.trim() || '+91 98260 12345',
        address: address.trim() || '167, Vaishali Nagar, Indore, MP 452009',
        role: 'user',
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              {currentUser
                ? 'Your Account'
                : mode === 'admin'
                ? 'Admin Terminal'
                : isSignUp
                ? 'Join Burger Bling'
                : 'Customer Sign In'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Close Auth"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is already logged in */}
        {currentUser ? (
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-white text-sm font-bold truncate">
                    {currentUser.name}
                  </h4>
                  {currentUser.role === 'admin' && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ADMIN
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 truncate">{currentUser.email}</p>
                <p className="text-[11px] text-orange-400/90 truncate mt-0.5">{currentUser.address}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl font-semibold text-xs bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>

              <button
                onClick={() => {
                  onLogout();
                }}
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Mode Switcher: Customer vs Admin */}
            <div className="grid grid-cols-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setMode('user');
                  setErrorMsg('');
                }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'user'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Customer Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('admin');
                  setErrorMsg('');
                }}
                className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'admin'
                    ? 'bg-orange-500 text-white shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </div>

            {/* Admin Helper Banner */}
            {mode === 'admin' && (
              <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between text-orange-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" /> Demo Admin Access
                  </span>
                  <button
                    type="button"
                    onClick={handleAdminQuickFill}
                    className="text-[11px] underline hover:text-orange-300 cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>
                <div className="text-[11px] text-neutral-300 leading-relaxed">
                  Email: <strong className="text-white">admin@burgerbling.com</strong>
                  <br />
                  Password: <strong className="text-white">admin123</strong>
                </div>
              </div>
            )}

            {/* Customer Demo Quick Fill */}
            {mode === 'user' && !isSignUp && (
              <div className="flex items-center justify-between px-3 py-2 bg-neutral-900/50 border border-neutral-800/80 rounded-xl text-xs">
                <span className="text-neutral-400 text-[11px]">Testing as regular diner?</span>
                <button
                  type="button"
                  onClick={handleUserQuickFill}
                  className="text-orange-400 hover:text-orange-300 text-xs font-semibold underline cursor-pointer"
                >
                  Quick Fill User
                </button>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center">
                {errorMsg}
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'user' && isSignUp && (
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aseem Joshi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                  {mode === 'admin' ? 'Admin ID / Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type={mode === 'admin' ? 'text' : 'email'}
                    required
                    placeholder={mode === 'admin' ? 'admin@burgerbling.com' : 'you@example.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600"
                  />
                </div>
              </div>

              {mode === 'user' && isSignUp && (
                <>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98260 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Delivery Address (Indore)
                    </label>
                    <input
                      type="text"
                      placeholder="167, Vaishali Nagar, Indore"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>
                  {mode === 'admin'
                    ? 'Enter Admin Portal'
                    : isSignUp
                    ? 'Create Account'
                    : 'Sign In to Burger Bling'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle sign in / sign up */}
            {mode === 'user' && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isSignUp
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Sign Up"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
