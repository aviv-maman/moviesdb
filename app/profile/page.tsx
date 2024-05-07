'use server';
import { type FC } from 'react';
import ProfileSection from '@/components/ProfileSection';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ProfileMenu from '@/components/ProfileMenu';
import { getProfile, getUserDetails } from '@/lib/auth';

interface ProfileProps {}

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
