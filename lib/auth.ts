import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

import type { Profile, Database } from './database.types';
import { PostgrestError } from '@supabase/supabase-js';

export const createServerSupabaseClient = cache(() => createServerComponentClient<Database>({ cookies }));

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

//To be used in account page
export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase.from('users').select('*').single();
    return userDetails as Profile | null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function signOut() {
  const supabase = createServerSupabaseClient();
  try {
    const authError = await supabase.auth.signOut();
    return authError.error;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getProfile() {
  const supabase = createServerSupabaseClient();
  try {
    const { user } = (await supabase.auth.getUser()).data;
    const { data: profile, error, status } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
    if (error && status !== 406) {
      throw error;
    }
    return { profile, error } as { profile: Profile | null; error: PostgrestError | null };
  } catch (error) {
    console.error('Error:', error);
    return { profile: null, error };
  }
}
