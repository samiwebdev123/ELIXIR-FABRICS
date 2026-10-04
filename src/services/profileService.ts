import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DbProfile } from '../types/supabase';

const PROFILE_LOCAL_KEY = 'elixir_profile_v3';

export const profileService = {
  async getProfile(userId: string = 'guest'): Promise<DbProfile | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (!error && data) {
          return data as DbProfile;
        }
      } catch (err) {
        console.warn('Error reading profile from Supabase:', err);
      }
    }

    try {
      const saved = localStorage.getItem(PROFILE_LOCAL_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}

    return {
      id: userId,
      name: 'Tariq Mansoor',
      email: 'tariq.mansoor@example.pk',
      phone: '03112989025',
      address: 'Suite 402, Bukhari Commercial, DHA Phase 6',
      city: 'Karachi',
      province: 'Sindh',
      postal_code: '75500'
    };
  },

  async updateProfile(userId: string = 'guest', updates: Partial<DbProfile>): Promise<DbProfile> {
    const existing = await this.getProfile(userId);
    const updated: DbProfile = {
      ...(existing || {
        id: userId,
        name: '',
        email: '',
        phone: '',
        address: '',
        city: 'Karachi',
        province: 'Sindh',
        postal_code: ''
      }),
      ...updates
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('profiles')
          .upsert([updated]);
      } catch (err) {
        console.warn('Error saving profile to Supabase:', err);
      }
    }

    try {
      localStorage.setItem(PROFILE_LOCAL_KEY, JSON.stringify(updated));
    } catch {}

    return updated;
  }
};
