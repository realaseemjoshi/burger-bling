import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { CartItem, OrderRecord } from '../data/burgers';
import { UserProfile } from './AuthModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currentUser: UserProfile | null;
  onOrderPlaced: (order: OrderRecord) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentUser,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [placedOrderRecord, setPlacedOrderRecord] = useState<OrderRecord | null>(null);

  // Checkout form state with Vaishali Nagar Indore default
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Aseem Joshi',
    phone: currentUser?.phone || '+91 98260 12345',
    address: currentUser?.address || '167, Vaishali Nagar, Indore, MP 452009',
    paymentMethod: 'UPI (GPay / PhonePe / Paytm)',
    instructions: 'Ring doorbell, leave at front gate.',
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const percentDiscountAmount = (subtotal * discountPercent) / 100;
  const totalDiscount = percentDiscountAmount + flatDiscount;
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 40;
  const taxes = Math.round((subtotal - totalDiscount) * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - totalDiscount + deliveryFee + taxes);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'BLING20') {
      setDiscountPercent(20);
      setFlatDiscount(0);
      setPromoMessage('20% Burger Bling discount applied!');
    } else if (code === 'INDORE100') {
      setFlatDiscount(100);
      setDiscountPercent(0);
      setPromoMessage('₹100 Indore City Special discount applied!');
    } else {
      setPromoMessage('Invalid code. Try "BLING20" or "INDORE100"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `#BLING-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: formData.name,
      customerEmail: currentUser?.email || 'joshiaseem6@gmail.com',
      customerPhone: formData.phone,
      deliveryAddress: formData.address,
      items: [...items],
      subtotal,
      discount: totalDiscount,
      deliveryFee,
      totalAmount: grandTotal,
      paymentMethod: formData.paymentMethod,
      status: 'Sizzling on Grill',
      createdAt: 'Just now',
      estimatedDelivery: '20-25 mins',
    };

    onOrderPlaced(newRecord);
    setPlacedOrderRecord(newRecord);
    setStep('success');
  };

  const handleResetAndClose = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-neutral-950 border-l border-neutral-800 h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <span className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              {step === 'cart'
                ? 'Your Order Bag'
                : step === 'checkout'
                ? 'Indore Delivery'
                : 'Order Confirmed!'}
            </span>
          </div>
          <button
            onClick={step === 'success' ? handleResetAndClose : onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Views */}
        {step === 'cart' && (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4 text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-white text-base font-bold mb-1">
                  Your bag is empty
                </h3>
                <p className="text-neutral-400 text-xs max-w-xs mb-6">
                  Add some sizzling artisan burgers or crispy sides to begin your Burger Bling feast.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-orange-500 hover:bg-orange-600 text-white transition-colors cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Bar in INR */}
                <div className="px-6 py-2.5 bg-neutral-900/60 border-b border-neutral-800 text-xs">
                  {subtotal >= 499 ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Free Express Delivery across Indore!
                    </span>
                  ) : (
                    <span className="text-neutral-300">
                      Add <strong className="text-orange-400">₹{499 - subtotal}</strong> more for free Indore delivery
                    </span>
                  )}
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-neutral-900/40 rounded-xl border border-neutral-800/80"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover border border-neutral-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-xs font-bold truncate">
                          {item.name}
                        </h4>
                        {item.bunType !== 'N/A' && (
                          <p className="text-[11px] text-neutral-400 truncate">
                            {item.bunType}
                            {item.extraToppings.length > 0 && ` • +${item.extraToppings.length} extras`}
                          </p>
                        )}
                        <div className="text-orange-400 font-semibold text-xs mt-1 tabular-nums">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          ) : (
                            <Minus className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="text-xs text-white font-bold w-4 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Input */}
                  <form onSubmit={applyPromo} className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (BLING20, INDORE100)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 uppercase tracking-wider"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p
                        className={`text-[11px] mt-1.5 ${
                          totalDiscount > 0 ? 'text-emerald-400' : 'text-neutral-400'
                        }`}
                      >
                        {promoMessage}
                      </p>
                    )}
                  </form>
                </div>

                {/* Bill Breakdown in INR */}
                <div className="p-6 border-t border-neutral-800 bg-neutral-950/80 space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-semibold text-neutral-200">
                      ₹{subtotal}
                    </span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400">
                      <span>Discount</span>
                      <span className="tabular-nums">-₹{totalDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Delivery (Indore)</span>
                    <span className="tabular-nums">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Taxes & GST (5%)</span>
                    <span className="tabular-nums">₹{taxes}</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                    <span>Total Amount</span>
                    <span className="text-orange-400 font-heading text-lg tabular-nums">
                      ₹{grandTotal}
                    </span>
                  </div>

                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full mt-4 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* Step: Checkout Form */}
        {step === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Delivery Address (Indore)
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <p className="text-[10px] text-neutral-400 mt-1">
                  Kitchen hub: 167, Vaishali Nagar, Indore
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Payment Method
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="UPI (GPay / PhonePe / Paytm)">UPI (GPay / PhonePe / Paytm)</option>
                  <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Delivery Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-neutral-800">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer"
              >
                Place Order (₹{grandTotal})
              </button>
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="w-full py-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Back to Order Bag
              </button>
            </div>
          </form>
        )}

        {/* Step: Order Success Screen */}
        {step === 'success' && placedOrderRecord && (
          <div className="flex-1 flex flex-col justify-between p-6 text-center">
            <div className="my-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
                Order Placed!
              </h3>
              <p className="text-neutral-300 text-xs max-w-xs mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>! Your burger is now sizzling on our cast iron grill.
              </p>

              {/* Order Status Box */}
              <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 text-left space-y-2.5 text-xs text-neutral-300 max-w-sm mx-auto">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Order Reference</span>
                  <span className="font-mono text-orange-400 font-bold">{placedOrderRecord.orderNumber}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Total Amount</span>
                  <span className="font-heading text-white font-bold">₹{placedOrderRecord.totalAmount}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Estimated Arrival: <strong>20–25 mins</strong></span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="truncate">{placedOrderRecord.deliveryAddress}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 rounded-xl font-semibold text-xs bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
            >
              Done & Return to Burger Bling
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
