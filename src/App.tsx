import React, { useState, useEffect } from 'react';
import { BURGER_ITEMS, BurgerItem, CartItem, OrderRecord, INITIAL_ORDERS } from './data/burgers';
import { Navbar, NavTabType } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { MenuDrawer } from './components/MenuDrawer';
import { CartDrawer } from './components/CartDrawer';
import { ZoomModal } from './components/ZoomModal';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';
import { ShopModal } from './components/ShopModal';
import { AuthModal, UserProfile } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { BurgerCanvas } from './components/BurgerCanvas';

const ORDERS_STORAGE_KEY = 'burger_bling_orders_v1';
const USER_STORAGE_KEY = 'burger_bling_user_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('home');
  // Default to index 2: "The Ultimate Bling Haven" which corresponds to thumbnail #3
  const [selectedBurgerIndex, setSelectedBurgerIndex] = useState<number>(2);

  // Likes and counter (starts with 42 matching the screenshot)
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(42);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Auth & Admin state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Orders state (persisted in localStorage for Admin view)
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [currentUser]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderTargetBurger, setOrderTargetBurger] = useState<BurgerItem | null>(null);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  // Scroll spy to highlight active nav link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const homeElem = document.getElementById('home');
      const aboutElem = document.getElementById('about');
      const contactElem = document.getElementById('contact');

      if (contactElem && scrollPosition >= contactElem.offsetTop) {
        setActiveTab('contact');
      } else if (aboutElem && scrollPosition >= aboutElem.offsetTop) {
        setActiveTab('about');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      const navOffset = 70;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Navigation handler
  const handleNavigate = (tab: NavTabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'about') {
      scrollToSection('about');
    } else if (tab === 'contact') {
      scrollToSection('contact');
    } else if (tab === 'menu') {
      setIsMenuDrawerOpen(true);
    } else if (tab === 'shop') {
      setIsShopOpen(true);
    }
  };

  // Handle like toggle
  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  // Select burger from thumbnails
  const handleSelectBurger = (index: number) => {
    setSelectedBurgerIndex(index);
  };

  const handleSelectBurgerByItem = (burger: BurgerItem) => {
    const idx = BURGER_ITEMS.findIndex((b) => b.id === burger.id);
    if (idx !== -1) {
      setSelectedBurgerIndex(idx);
    }
  };

  // Open customization modal
  const handleOrderNow = (burger: BurgerItem) => {
    setOrderTargetBurger(burger);
    setIsOrderModalOpen(true);
  };

  // Add to cart handler
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.burgerId === item.burgerId &&
          i.bunType === item.bunType &&
          i.name === item.name &&
          JSON.stringify(i.extraToppings) === JSON.stringify(item.extraToppings)
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Placed new order -> appends to orders list so Admin sees live revenue immediately
  const handleOrderPlaced = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Update order status from Admin portal
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderRecord['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Total cart items count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const currentBurger = BURGER_ITEMS[selectedBurgerIndex] || BURGER_ITEMS[2];

  // Login handler
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setIsAdminDashboardOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminDashboardOpen(false);
  };

  return (
    <div className="min-h-screen bg-transparent text-neutral-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      {/* 1. Fullscreen Fixed Scroll Animation Background (Z-0) */}
      <BurgerCanvas />

      {/* 2. Soft Ambient Vignette for High Text Contrast (Z-1) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        className="bg-gradient-to-r from-black/85 via-black/45 to-black/20 pointer-events-none"
      />

      {/* 3. All Webpage Content Layered on Top of the Animation (Z-10) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <Navbar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          currentUser={currentUser}
          onOpenAdmin={() => setIsAdminDashboardOpen(true)}
        />

        {/* Main Sections */}
        <main className="flex-1 flex flex-col">
          {/* Hero Section */}
          <HeroSection
            burgers={BURGER_ITEMS}
            selectedIndex={selectedBurgerIndex}
            onSelectBurger={handleSelectBurger}
            onOrderNow={handleOrderNow}
            onViewMenu={() => setIsMenuDrawerOpen(true)}
            onZoomBurger={() => setIsZoomOpen(true)}
            isLiked={isLiked}
            onToggleLike={handleToggleLike}
            likesCount={likesCount}
          />

          {/* About Section */}
          <AboutSection
            onOrderNow={() => handleOrderNow(currentBurger)}
            onViewMenu={() => setIsMenuDrawerOpen(true)}
          />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer
          onScrollTo={(id) => handleNavigate(id as NavTabType)}
          onOpenMenu={() => setIsMenuDrawerOpen(true)}
          onOpenShop={() => setIsShopOpen(true)}
        />
      </div>

      {/* 4. Modals and Drawers (Z-50) */}
      {/* Admin Dashboard Portal */}
      {isAdminDashboardOpen && (
        <AdminDashboard
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onClose={() => setIsAdminDashboardOpen(false)}
          onLogout={handleLogout}
        />
      )}

      {/* Auth Modal (Admin and Normal User Login) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Burger Customization & Order Modal */}
      <OrderModal
        burger={orderTargetBurger}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Full Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        burgers={BURGER_ITEMS}
        onSelectBurgerToOrder={handleOrderNow}
        onQuickAdd={handleAddToCart}
      />

      {/* Shopping Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Fullscreen Zoom Lightbox Modal */}
      <ZoomModal
        burger={currentBurger}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        onOrderNow={handleOrderNow}
        isLiked={isLiked}
        onToggleLike={handleToggleLike}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        burgers={BURGER_ITEMS}
        onSelectBurger={(burger) => {
          handleSelectBurgerByItem(burger);
        }}
      />

      {/* Member Passport Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        likesCount={likesCount}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Merch & Bottled Sauces Shop Modal */}
      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        onAddToCart={handleAddToCart}
        defaultBurgerImage={currentBurger.thumbImage}
      />
    </div>
  );
}
