'use client';
import { useEffect, type FC } from 'react';
import ProfileSettings from '@/components/ProfileSettings';
import ProfileIntegrations from './ProfileIntegrations';
import { useProfile } from '@/context/ProfileContext';
import type { Profile } from '@/lib/database.types';
import type { User } from '@supabase/supabase-js';

interface ProfileSectionProps {
  profile: Profile | null;
  user?: User | null;
}

const ProfileSection: FC<ProfileSectionProps> = ({ profile, user }) => {
  const { dispatch, state } = useProfile();

  useEffect(() => {
    dispatch({ type: 'changed_active_view', payload: { value: 'profile' } });
    dispatch({ type: 'changed_supabase_profile', payload: { value: profile } });
    dispatch({ type: 'changed_supabase_user', payload: { value: user ? user : null } });
  }, [dispatch, profile, user]);

  return (
    <>
      {state.active_view === 'profile' && <ProfileSettings />}
      {state.active_view === 'integrations' && <ProfileIntegrations />}
    </>
  );
};

export default ProfileSection;
