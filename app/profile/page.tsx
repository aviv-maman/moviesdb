'use server';
import { type FC } from 'react';
import ProfileSection from '@/components/ProfileSection';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import type { Database } from '@/lib/database.types';
import ProfileMenu from '@/components/ProfileMenu';
import { getProfile, getUserDetails } from '@/lib/auth';

interface ProfileProps {}

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

const Profile: FC<ProfileProps> = async ({}) => {
  const supabase = createClient();
  const user = (await supabase.auth.getSession())?.data?.session?.user;
  if (!user) redirect('/login'); // This route can only be accessed by authenticated users.
  const { profile, error } = await getProfile(user?.id);

  return (
    <main className='animate-in md:flex m-4 min-h-[76vh]'>
      <ProfileMenu />
      <ProfileSection profile={profile} user={user} />
    </main>
  );
};

export default Profile;
