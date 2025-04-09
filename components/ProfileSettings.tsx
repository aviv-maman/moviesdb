'use client';

import { Avatar, Badge, Spinner, useDisclosure } from '@heroui/react';
import { useTransition } from 'react';
import ProfileEditModal from './ProfileEditModal';
import { Pencil, PhotoOff, Upload } from '@/assets/icons';
import { useProfile } from '@/context/ProfileContext';
import { updateProfile } from '@/lib/api_profile';
import { createClient } from '@/utils/supabase/client';

const ProfileSettings: React.FC = () => {
  const { dispatch, state } = useProfile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [uploadPending, startUploadTransition] = useTransition();
  const [removePending, startRemoveTransition] = useTransition();

  const uploadAvatar = async (file: File) => {
    try {
      if (!file) throw new Error('You must select an image to upload.');
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${state.supabase_user?.id}.${fileExt}`;
      const bucket = supabase.storage.from('avatars');
      const { error: uploadError } = await bucket.upload(fileName, file, {
        upsert: true,
      });
      if (uploadError) throw uploadError;
      const publicUrl = bucket.getPublicUrl(fileName).data.publicUrl;
      return await updateProfile({ avatar_url: publicUrl });
    } catch (error) {
      console.log('Error uploading avatar!');
    }
  };
  const removeAvatar = async () => {
    try {
      const supabase = createClient();
      const bucket = supabase.storage.from('avatars');
      if (!state.supabase_profile?.avatar_url) throw new Error('Avatar not found.');
      const fileName = state.supabase_profile.avatar_url.split('/').pop();
      if (!fileName) throw new Error('Invalid avatar url.');
      const { error: removeError } = await bucket.remove([fileName]);
      if (removeError) throw removeError;
      const profile = await updateProfile({ avatar_url: null });
      if (!profile) throw new Error('Profile not found.');
      dispatch({
        type: 'changed_supabase_profile',
        payload: { value: profile },
      });
    } catch (error) {
      console.log('Error uploading avatar!');
    }
  };

  return (
    <>
      <ProfileEditModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className='block'>
        <div className='mb-4'>
          <h1 className='text-lg font-extrabold'>Profile Settings</h1>
          <p className='text-sm text-orange-600 dark:text-orange-500'>Edit your profile information.</p>
        </div>
        <div className='block justify-between rounded-small border-small border-default-400 bg-zinc-100 dark:border-default-200 dark:bg-zinc-900 dark:text-gray-200 min-[640px]:flex'>
          <div className='m-4 flex'>
            <Badge
              isOneChar
              className='rounded-md'
              content={
                <label htmlFor='profile_pic' className='cursor-pointer'>
                  <input
                    id='profile_pic'
                    name='profile_pic'
                    className='absolute top-[-1000px]'
                    disabled={uploadPending || removePending}
                    type='file'
                    accept='image/*'
                    onChange={async (e) => {
                      startUploadTransition(async () => {
                        if (!e.target?.files) throw new Error('You must select an image to upload.');
                        const profile = await uploadAvatar(e.target.files[0]);
                        if (profile)
                          dispatch({
                            type: 'changed_supabase_profile',
                            payload: { value: profile },
                          });
                      });
                    }}
                  />
                  <Upload className='size-4' />
                </label>
              }
              size='lg'
              color='warning'
              placement='top-left'>
              <Avatar
                src={state.supabase_profile?.avatar_url || undefined}
                alt='avatar'
                className='mr-4 size-28 p-4 md:size-32'
                isBordered={false}
                radius='sm'
                size='lg'
              />
            </Badge>

            <div className='flex flex-col space-y-2'>
              <div>
                <h5 className='text-xs leading-5 text-amber-600'>Full Name</h5>
                <h2 className='mb-2 text-lg font-semibold' style={{ lineHeight: 0.75 }}>
                  {state.supabase_profile?.full_name || 'Not set yet'}
                </h2>
                <h5 className='text-xs leading-5 text-amber-600'>Username</h5>
                <h4 className='text-sm dark:text-gray-400' style={{ lineHeight: 0.75 }}>
                  {state.supabase_profile?.username || 'Not set yet'}
                </h4>
              </div>
              <div>
                <h5 className='text-xs leading-5 text-amber-600'>Email</h5>
                <h4 className='mb-2 text-sm dark:text-gray-400' style={{ lineHeight: 0.75 }}>
                  {state.supabase_user?.email}
                </h4>
                <h5 className='text-xs leading-5 text-amber-600'>TMDB ID</h5>
                <h4 className='text-sm dark:text-gray-400' style={{ lineHeight: 0.75 }}>
                  {state.supabase_profile?.tmdb_account_id || 'Not linked yet'}
                </h4>
              </div>
            </div>
          </div>
          <div>
            <button
              type='button'
              onClick={onOpen}
              className='m-4 flex items-center rounded-lg border p-1 text-sm text-gray-700 duration-150 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600'>
              <Pencil className='size-[18px]' />
            </button>
            <button
              type='button'
              className='disabled:cursor m-4 flex items-center rounded-lg border p-1 text-sm text-gray-700 duration-150 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-inherit dark:text-gray-300 dark:hover:bg-gray-600 disabled:dark:hover:bg-inherit'
              aria-label='Remove Avatar'
              disabled={!state.supabase_profile?.avatar_url || removePending || uploadPending}
              onClick={async () => startRemoveTransition(async () => await removeAvatar())}>
              {removePending || uploadPending ? (
                <Spinner classNames={{ wrapper: 'w-[18px] h-[18px]' }} />
              ) : (
                <PhotoOff className='size-[18px]' />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
