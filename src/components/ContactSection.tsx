import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Table Reservation',
    guests: '2 Guests',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'Table Reservation',
      guests: '2 Guests',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-black/65 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-[0.25em] mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect & Dine</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white uppercase tracking-wider leading-[1.05]">
            VISIT BURGER BLING
            <br />
            <span className="text-orange-500">AT VAISHALI NAGAR, INDORE</span>
          </h2>
          <p className="mt-5 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Come taste the gold standard of smash burgers at our flagship diner in Indore, or book a tasting table for your friends and family.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <MapPin className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  Flagship Store
                </h3>
                <p className="text-neutral-300 text-sm mt-1 font-medium leading-relaxed">
                  167, Vaishali Nagar, Indore
                </p>
                <p className="text-neutral-400 text-xs mt-0.5">
                  Madhya Pradesh 452009, India
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                  <span>Free Valet & Dine-in Parking</span>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <Clock className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  Kitchen Hours
                </h3>
                <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-neutral-400">
                  <div className="flex justify-between">
                    <span>Monday – Thursday:</span>
                    <span className="text-white font-medium">11:30 AM – 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday – Saturday:</span>
                    <span className="text-white font-medium">11:30 AM – 12:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-white font-medium">12:00 PM – 11:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Line & Inquiries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Call Hub</div>
                  <a href="tel:+919826012345" className="text-xs font-semibold text-white hover:text-orange-400 transition-colors truncate block">
                    +91 98260 12345
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Direct Email</div>
                  <a href="mailto:indore@burgerbling.com" className="text-xs font-semibold text-white hover:text-orange-400 transition-colors truncate block">
                    indore@burgerbling.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation / Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
                  Request Confirmed!
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our Indore team has logged your <strong className="text-orange-400">{formData.inquiryType.toLowerCase()}</strong> for 167, Vaishali Nagar, and will notify you at <strong className="text-white">{formData.email}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-neutral-900 hover:bg-neutral-800 text-white transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-2">
                  Reserve a Table or Send an Inquiry
                </h3>

                {/* Inquiry Type Tabs */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Inquiry Reason
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Table Reservation', 'Private Catering', 'Dine-In Feedback'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, inquiryType: type })}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                          formData.inquiryType === type
                            ? 'border-orange-500 bg-orange-500/10 text-white'
                            : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aseem Joshi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. joshiaseem6@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600"
                    />
                  </div>
                </div>

                {/* Phone & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98260 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Party Size
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests (Standard Table)</option>
                      <option value="3-4 Guests">3-4 Guests (Booth)</option>
                      <option value="5-8 Guests">5-8 Guests (Chef's Counter)</option>
                      <option value="8+ Large Party">8+ Large Party</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Notes or Special Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Preferred time, seating preference at 167 Vaishali Nagar..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-600 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Indore Kitchen</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
