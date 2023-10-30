'use client';

import { useEffect, type FC } from 'react';
import ProfileMenu from '@/components/ProfileMenu';
import ProfileSettings from '@/components/ProfileSettings';
import ProfileTMDB from './ProfileTMDB';
import { useProfile } from '@/context/ProfileContext';
import type { Profile } from '@/lib/database.types';

interface ProfileSectionProps {
  profile: Profile | null;
}

const ProfileSection: FC<ProfileSectionProps> = ({ profile }) => {
  const { dispatch, state } = useProfile();

  useEffect(() => {
    dispatch({ type: 'changed_active_view', payload: { value: 'profile' } });
    dispatch({ type: 'changed_supabase_profile', payload: { value: profile } });
  }, [dispatch, profile]);

  return (
    <div className='w-full block min-[960px]:flex m-auto justify-center'>
      <ProfileMenu />
      {state.active_view === 'profile' && <ProfileSettings />}
      {state.active_view === 'tmdb' && <ProfileTMDB />}
    </div>
  );
};

export default ProfileSection;
