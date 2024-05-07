'use server';
import type { CreateRequestTokenResponse, DeleteTmdbSessionIdResponse } from '@/lib/api.types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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
    cookies().set('tmdb_request_token', data.request_token, {
      expires: new Date(data.expires_at),
      path: '/',
      httpOnly: true,
      secure: true,
    });
    redirect(`https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/api/tmdb-approved`);
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
    data.success && cookies().delete('tmdb_session_id');
  }
};
