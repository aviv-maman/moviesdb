'use server';

import { type FC } from 'react';
import ProfileSection from '@/components/ProfileSection';
import type { CreateRequestTokenResponse, DeleteTmdbSessionIdResponse } from '@/lib/api.types';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';

interface ProfileProps {}

export const handleLinkAccount = async () => {
  'use server';
  const options: RequestInit = {
    method: 'GET',
    cache: 'no-cache',
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
    redirect(
      `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/api/tmdb-approved`
    );
  } else {
    throw new Error(res.statusText);
  }
};

export const handleUnlinkAccount = async () => {
  'use server';
  const options: RequestInit = {
    method: 'DELETE',
    cache: 'no-cache',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
  };
  const res = await fetch('https://api.themoviedb.org/3/authentication/session', options);
  if (res.ok) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('profiles')
      .update({
        tmdb_session_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user?.id as string);
    if (error) {
      throw new Error(error.message);
    }
    const data: DeleteTmdbSessionIdResponse = await res.json();
    data.success && cookies().delete('tmdb_session_id');
  }
};

const Profile: FC<ProfileProps> = async ({}) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id as string)
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className='w-full block min-[960px]:flex m-auto justify-center'>
      <ProfileSection profile={profile} />
    </div>
  );
};

export default Profile;
