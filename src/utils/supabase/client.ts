import { createBrowserClient } from "@supabase/ssr";

const getEnv = (key: string) => {
  let val = import.meta.env[key];
  if (typeof val === 'string' && val.trim() !== '') {
    const trimmed = val.trim();
    // Handle cases where the user accidentally pasted "KEY=VALUE" or "KEY = VALUE"
    if (trimmed.includes('=') && (trimmed.startsWith('VITE_') || trimmed.startsWith('NEXT_PUBLIC_'))) {
      const parts = trimmed.split('=');
      // If the first part looks like an env key, take the rest
      if (parts[0].trim().match(/^[A-Z0-9_]+$/)) {
        return parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      }
    }
    // Remove optional quotes
    return trimmed.replace(/^['"]|['"]$/g, '');
  }
  return null;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL') || getEnv('NEXT_PUBLIC_SUPABASE_URL') || 'https://lbgwlghiwpamhthdgukw.supabase.co';
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') || 'sb_publishable_PHF4KyIwnRBzWXE21_krug_2BZvMtG-';

export const createClient = () => {
  if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    console.error('Supabase URL is invalid:', supabaseUrl);
    // Return a dummy client or throw a more descriptive error
    throw new Error(`Invalid Supabase URL: ${supabaseUrl}. Please set VITE_SUPABASE_URL.`);
  }
  return createBrowserClient(
    supabaseUrl,
    supabaseKey!,
  );
};

export const supabase = createClient();
