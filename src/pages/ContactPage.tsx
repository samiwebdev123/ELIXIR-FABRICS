import React, { useState } from 'react';
import { STORE_PHONE, STORE_WHATSAPP, STORE_ADDRESS } from '../data/mockData';
import { Button } from '../components/common/Button';
import { Phone, MessageSquare, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Bespoke Bridal / Groom Fitting');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setIsSent(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="space-y-1">
            <span className="font-brand tracking-[0.3em] text-sm sm:text-base uppercase font-semibold text-neutral-900 block">
              ELIXIR
            </span>
            <span className="font-sans tracking-[0.42em] text-[10px] uppercase font-medium text-neutral-500 block">
              FINE MENSWEAR
            </span>
          </div>
          <h1 className="font-brand text-3xl sm:text-5xl text-neutral-900 font-medium pt-1">
            Contact Atelier
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto">
            Our atelier advisors and master karigars are available for bespoke fittings, bridal party consultations, nationwide orders, and sizing inquiries.
          </p>
        </div>

        {/* 2-Column: Left Contact Cards, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-5">
              {/* Prominent WhatsApp CTA Button */}
              <div>
                <a
                  href={`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent('Hello ELIXIR Atelier, I would like to inquire about your bespoke collection and sizing.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#075E54] hover:bg-[#128C7E] text-white text-xs font-semibold shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WhatsApp Concierge: {STORE_PHONE}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Direct Phone Line
                  </h4>
                  <a
                    href={`tel:${STORE_PHONE}`}
                    className="text-base font-bold text-neutral-900 hover:underline mt-0.5 block tabular-nums"
                  >
                    {STORE_PHONE}
                  </a>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Available Mon–Sat: 11:00 AM – 10:00 PM PKT
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#075E54]/10 flex items-center justify-center text-[#075E54] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    WhatsApp Concierge
                  </h4>
                  <a
                    href={`https://wa.me/${STORE_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#075E54] hover:underline mt-0.5 block"
                  >
                    Message +92 311 2989025
                  </a>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Quick inquiries, fabric swatches & measurement support
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Karachi Flagship Atelier
                  </h4>
                  <p className="text-xs font-medium text-neutral-900 mt-0.5 leading-relaxed">
                    {STORE_ADDRESS}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Atelier Consultation Hours
                  </h4>
                  <p className="text-xs text-neutral-700 mt-0.5">
                    Monday to Saturday: 11:00 AM – 10:00 PM
                  </p>
                  <p className="text-xs text-neutral-700">
                    Sunday: 02:00 PM – 09:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
            <h3 className="font-brand text-xl font-semibold text-neutral-900 mb-1">
              Send an Atelier Inquiry
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Fill in your details and our senior menswear advisor will respond within 4 business hours.
            </p>

            {isSent ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-brand text-lg font-semibold text-neutral-900">
                  Inquiry Dispatched
                </h4>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Thank you. Our atelier master will contact you at <strong>{phone || STORE_PHONE}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-800">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Raza"
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-800">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">Inquiry Purpose</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 font-medium cursor-pointer"
                  >
                    <option value="Bespoke Bridal / Groom Fitting">Bespoke Bridal / Groom Fitting</option>
                    <option value="Sizing & Measurements Consultation">Sizing & Measurements Consultation</option>
                    <option value="Cash on Delivery Order Confirmation">Cash on Delivery Order Confirmation</option>
                    <option value="Bulk / Corporate Gifting">Bulk / Corporate Gifting</option>
                    <option value="Other Inquiries">Other Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-800">Message / Request</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify your wedding date, required sizes, or special instructions..."
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Send Inquiry to Atelier
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
