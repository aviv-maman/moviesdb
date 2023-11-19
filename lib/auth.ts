'use server';
import { createClient } from '@/utils/supabase/server';
import type { Profile } from './database.types';
import type { PostgrestError } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function getSession() {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('getSession Error:', error);
    return null;
  }
}

//To be used in account page
export async function getUserDetails() {
  const supabase = createClient();
  try {
    const { data: userDetails } = await supabase.from('users').select('*').single();
    return userDetails as Profile | null;
  } catch (error) {
    console.error('getUserDetails Error:', error);
    return null;
  }
}

export const signOut = async () => {
  const supabase = createClient();
  const { error: authError } = await supabase.auth.signOut();
  return authError ? authError : redirect('/');
};

export async function getProfile() {
  const supabase = createClient();
  try {
    const { user } = (await supabase.auth.getUser()).data;
    const {
      data: profile,
      error,
      status,
    } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id as string)
      .single();
    if (error && status !== 406) {
      throw error;
    }
    return { profile, error } as { profile: Profile | null; error: PostgrestError | null };
  } catch (error) {
    console.error('getProfile Error:', error);
    return { profile: null, error };
  }
}
