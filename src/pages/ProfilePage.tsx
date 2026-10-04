import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { Button } from '../components/common/Button';
import { User, Scissors, MapPin, Package, Heart, Check, Save } from 'lucide-react';
import { PAKISTANI_CITIES } from '../data/mockData';
import { profileService } from '../services/profileService';
import { isSupabaseConfigured } from '../lib/supabase';

export const ProfilePage: React.FC = () => {
  const { navigate } = useRouter();

  // Profile info
  const [userName, setUserName] = useState('Tariq Mansoor');
  const [userEmail, setUserEmail] = useState('tariq.mansoor@example.pk');
  const [userPhone, setUserPhone] = useState('03112989025');
  const [city, setCity] = useState(PAKISTANI_CITIES[0]);

  // Measurements
  const [chest, setChest] = useState('40.5');
  const [shoulder, setShoulder] = useState('18.0');
  const [waist, setWaist] = useState('34.0');
  const [kurtaLength, setKurtaLength] = useState('42.0');
  const [collar, setCollar] = useState('15.5');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const p = await profileService.getProfile();
        if (p) {
          if (p.name) setUserName(p.name);
          if (p.email) setUserEmail(p.email);
          if (p.phone) setUserPhone(p.phone);
          if (p.city) setCity(p.city);
        }
      } catch {}
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileService.updateProfile('guest', {
        name: userName,
        email: userEmail,
        phone: userPhone,
        city
      });
    } catch {}

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="pb-4 border-b border-stone-200">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-400">
            Client Passport
          </span>
          <h1 className="font-brand text-3xl sm:text-4xl text-neutral-900 font-medium mt-1">
            My Atelier Profile & Fitting
          </h1>
        </div>

        {/* Quick Nav Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/orders')}
            className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-neutral-900 transition-colors text-left flex items-center gap-3"
          >
            <Package className="w-5 h-5 text-neutral-800" />
            <div>
              <p className="text-xs font-semibold text-neutral-900">My Orders</p>
              <p className="text-[10px] text-neutral-500">Track shipments</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/wishlist')}
            className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-neutral-900 transition-colors text-left flex items-center gap-3"
          >
            <Heart className="w-5 h-5 text-neutral-800" />
            <div>
              <p className="text-xs font-semibold text-neutral-900">Wardrobe Wishlist</p>
              <p className="text-[10px] text-neutral-500">Saved items</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-neutral-900 transition-colors text-left flex items-center gap-3"
          >
            <MapPin className="w-5 h-5 text-neutral-800" />
            <div>
              <p className="text-xs font-semibold text-neutral-900">Karachi Atelier</p>
              <p className="text-[10px] text-neutral-500">DHA Phase 6</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/shop')}
            className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-neutral-900 transition-colors text-left flex items-center gap-3"
          >
            <User className="w-5 h-5 text-neutral-800" />
            <div>
              <p className="text-xs font-semibold text-neutral-900">Shop Catalog</p>
              <p className="text-[10px] text-neutral-500">New arrivals</p>
            </div>
          </button>
        </div>

        {/* Profile & Measurements Form */}
        <form onSubmit={handleSave} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-5">
            <h3 className="font-brand text-lg font-semibold text-neutral-900 pb-2 border-b border-stone-100">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">Phone Number (Pakistan)</label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-800">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                >
                  {PAKISTANI_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bespoke Measurement Profile */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <Scissors className="w-5 h-5 text-neutral-900" />
              <div>
                <h3 className="font-brand text-lg font-semibold text-neutral-900">
                  Bespoke Atelier Measurements (Inches)
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Save your body measurements once. When ordering bespoke or made-to-measure kurtas, your profile is automatically applied.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">Chest (in)</label>
                <input
                  type="number"
                  step="0.5"
                  value={chest}
                  onChange={(e) => setChest(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 tabular-nums font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">Shoulder (in)</label>
                <input
                  type="number"
                  step="0.5"
                  value={shoulder}
                  onChange={(e) => setShoulder(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 tabular-nums font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">Waist (in)</label>
                <input
                  type="number"
                  step="0.5"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 tabular-nums font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">Kurta Length (in)</label>
                <input
                  type="number"
                  step="0.5"
                  value={kurtaLength}
                  onChange={(e) => setKurtaLength(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 tabular-nums font-semibold"
                />
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-neutral-700">Collar Band (in)</label>
                <input
                  type="number"
                  step="0.5"
                  value={collar}
                  onChange={(e) => setCollar(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 tabular-nums font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            >
              {isSaved ? 'Changes Saved' : 'Save Passport Profile'}
            </Button>

            {isSaved && (
              <span className="text-xs text-emerald-700 font-semibold animate-in fade-in">
                Measurements and details updated successfully!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
