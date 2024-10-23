'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { CreateRequestTokenResponse, DeleteTmdbSessionIdResponse } from '@/lib/api.types';
import type { Database } from '@/lib/database.types';
import { createClient } from '@/utils/supabase/server';

export const handleLinkAccount = async () => {
  'use server';
  const options: RequestInit = {
    method: 'GET',
    cache: 'no-cache', // cache: 'force-cache',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
  };

  const res = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
  if (res.ok) {
    const data: CreateRequestTokenResponse = await res.json();
    const cookieStore = cookies();
    cookieStore.set('tmdb_request_token', data.request_token, {
      expires: new Date(data.expires_at),
      path: '/',
      httpOnly: true,
      secure: true,
    });
    const PUBLIC_DOMAIN = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/tmdb-approved`
      : 'http://localhost:3000/api/tmdb-approved';
    redirect(PUBLIC_DOMAIN);
  } else {
    throw new Error(`Error ${res.status}: ${res.statusText}.`);
  }
};

export const handleUnlinkAccount = async () => {
  'use server';
  const options: RequestInit = {
    method: 'DELETE',
    cache: 'no-cache', // cache: 'force-cache',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
  };
  const res = await fetch('https://api.themoviedb.org/3/authentication/session', options);
  if (res.ok) {
    const supabase = createClient();
    const userRes = await supabase.auth.getUser();
    const { error, status } = await supabase
      .from('profiles')
      .update({
        tmdb_session_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userRes.data.user?.id as string);
    if ((error && status !== 406) || (userRes.error && userRes.error.status !== 406)) throw error;

    const data: DeleteTmdbSessionIdResponse = await res.json();
    if (data?.success) {
      const cookieStore = cookies();
      cookieStore.delete('tmdb_session_id');
    }
  }
};

export const updateProfile = async (profile: Database['public']['Tables']['profiles']['Update']) => {
  'use server';
  const { full_name, username, avatar_url } = profile;
  try {
    const supabase = createClient();
    const userRes = await supabase.auth.getUser();
    const { data, error, status } = await supabase
      .from('profiles')
      .upsert({
        id: userRes.data.user?.id as string,
        full_name,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();
    if ((error && status !== 406) || (userRes.error && userRes.error.status !== 406)) throw error;
    return data;
    console.error('Profile updated!');
  } catch (error) {
    console.error('Error updating the data!');
  }
};
