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
    redirect(
      `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/api/tmdb-approved`
    );
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
    const supabase = createServerComponentClient<Database>({ cookies });
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

// export const updateProfile = async (formData: FormData) => {
//   'use server';
//   const full_name = (formData.get('full_name') as string) || null;
//   const username = (formData.get('username') as string) || null;
//   const avatar_url = (formData.get('avatar_url') as string) || null;
//   try {
//     const supabase = createServerComponentClient<Database>({ cookies });
//     const userRes = await supabase.auth.getUser();
//     const { error, status } = await supabase.from('profiles').upsert({
//       id: userRes.data.user?.id as string,
//       full_name,
//       username,
//       avatar_url,
//       updated_at: new Date().toISOString(),
//     });
//     if ((error && status !== 406) || (userRes.error && userRes.error.status !== 406)) throw error;
//     console.error('Profile updated!');
//   } catch (error) {
//     console.error('Error updating the data!');
//   }
// };

export const updateProfile = async (profile: Database['public']['Tables']['profiles']['Update']) => {
  'use server';
  const { full_name, username, avatar_url } = profile;
  try {
    const supabase = createServerComponentClient<Database>({ cookies });
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

const Profile: FC<ProfileProps> = async ({}) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = (await supabase.auth.getSession())?.data?.session?.user;
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id as string)
    .single();
  if (error) throw error;

  return <ProfileSection profile={profile} user={user} />;
};

export default Profile;
