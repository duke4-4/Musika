import type { User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  full_name?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  sessionToken: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (params: { email: string; password: string; fullName?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

