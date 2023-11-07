'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signUp = async (formData: FormData) => {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();
  const authRes = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${location.origin}/auth/callback` },
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
