'use server';
import { createClient } from '@/utils/supabase/server';
import type { Profile } from './database.types';
import type { PostgrestError } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const headersInstance = headers();
const protocol = headersInstance.get('x-forwarded-proto');
const host = headersInstance.get('host');

export const signUp = async (formData: FormData) => {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();
  const authRes = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${protocol}://${host}/auth/callback` },
  });
  if (authRes.error) return redirect('/login?message=Could not authenticate user');
  return redirect('/login?message=Check email to continue sign in process');
};

export const signIn = async (formData: FormData) => {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();
  const authRes = await supabase.auth.signInWithPassword({ email, password });
  if (authRes.error) return redirect('/login?message=Could not authenticate user');
  return redirect('/');
};

export const signOut = async () => {
  'use server';
  const supabase = createClient();
  const { error: authError } = await supabase.auth.signOut();
  return authError ? authError : redirect('/');
};

export const getSession = async () => {
  'use server';
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('getSession Error:', error);
    throw error;
  }
};

//To be used in account page
export const getUserDetails = async (id: string) => {
  'use server';
  const supabase = createClient();
  try {
    const res = await supabase.auth.getUser();
    return { data: res.data.user, error: res.error };
  } catch (error) {
    console.error('getUserDetails Error:', error);
    throw error;
  }
};

export const getProfile = async (id: string) => {
  'use server';
  if (!id) throw new Error('No id provided to getProfile');
  const supabase = createClient();
  try {
    const { data, error, status } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error && status !== 406) throw error;
    return { profile: data, error } as { profile: Profile | null; error: PostgrestError | null };
  } catch (error) {
    console.error('getProfile Error:', error);
    throw error;
  }
};
