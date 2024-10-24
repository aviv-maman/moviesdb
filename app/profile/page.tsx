'use server';

import { redirect } from 'next/navigation';
import ProfileMenu from '@/components/ProfileMenu';
import ProfileSection from '@/components/ProfileSection';
import { getProfile } from '@/lib/auth';
import { createClient } from '@/utils/supabase/server';

const Profile: React.FC = async () => {
  const supabase = createClient();
  const user = (await supabase.auth.getSession())?.data?.session?.user;
  if (!user) redirect('/login'); // This route can only be accessed by authenticated users.
  const { profile } = await getProfile(user?.id);

  return (
    <main className='animate-in min-h-[calc(100vh-162px)] p-4 sm:min-h-[calc(100vh-154px)] md:flex'>
      <ProfileMenu />
      <ProfileSection profile={profile} user={user} />
    </main>
  );
};

export default Profile;
