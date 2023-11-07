'use client';

import { useProfile } from '@/context/ProfileContext';
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { IconCamera, IconMail, IconPencil, IconPhoto, IconTrash, IconUpload, IconUser } from '@tabler/icons-react';
import { useTransition, type FC } from 'react';
import ProfileEditModal from './ProfileEditModal';
import AvatarUploadModal from './AvatarUploadModal';
import { createClient } from '@/utils/supabase/client';
import { updateProfile } from '@/app/profile/page';

interface ProfileSettingsProps {}

const ProfileSettings: FC<ProfileSettingsProps> = ({}) => {
  const { dispatch, state } = useProfile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [uploadPending, startUploadTransition] = useTransition();
  const { isOpen: isOpenAvatar, onOpen: onOpenAvatar, onOpenChange: onOpenChangeAvatar } = useDisclosure();
  const [removePending, startRemoveTransition] = useTransition();

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
      dispatch({ type: 'changed_supabase_profile', payload: { value: profile } });
    } catch (error) {
      console.log('Error uploading avatar!');
    }
  };

  return (
    <>
      <ProfileEditModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <AvatarUploadModal
        isOpen={isOpenAvatar}
        onOpenChange={onOpenChangeAvatar}
        onUploadStart={startUploadTransition}
        pending={uploadPending}
        label='Upload'
      />
      <div className='block min-[640px]:flex justify-between bg-zinc-100 dark:bg-zinc-900 dark:text-gray-200 border-small rounded-small border-default-400 dark:border-default-100'>
        <div className='flex m-4'>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Badge
                isOneChar
                content={<IconCamera size={16} />}
                size='lg'
                color='success'
                className='cursor-pointer'
                placement='top-left'
              >
                <Avatar
                  src={state.supabase_profile?.avatar_url || undefined}
                  alt='avatar'
                  className='p-4 w-28 h-28 md:w-32 md:h-32 mr-4'
                  isBordered={false}
                  radius='sm'
                  size='lg'
                />
              </Badge>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Picture Actions'
              variant='flat'
              disabledKeys={!state.supabase_profile?.avatar_url ? ['view', 'remove'] : ''}
            >
              <DropdownItem key='view' color='secondary' startContent={<IconPhoto size={18} />}>
                View
              </DropdownItem>
              <DropdownItem
                key='upload'
                color='primary'
                startContent={uploadPending ? <Spinner size='sm' /> : <IconUpload size={18} />}
                onClick={onOpenAvatar}
              >
                Upload
              </DropdownItem>
              <DropdownItem
                key='remove'
                color='danger'
                startContent={removePending ? <Spinner size='sm' /> : <IconTrash size={18} />}
                onClick={async () => startRemoveTransition(async () => await removeAvatar())}
              >
                Remove
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <div className='flex flex-col space-y-4'>
            <div>
              <h2 className='text-lg font-semibold'>{state.supabase_profile?.full_name || 'Not set yet'}</h2>
              <span className='text-sm dark:text-gray-400'>{state.supabase_profile?.username || 'Not set yet'}</span>
            </div>
            <div className='space-y-1'>
              <span className='flex items-center space-x-1'>
                <IconMail size={20} />
                <span className='text-sm dark:text-gray-400'>{state.supabase_user?.email}</span>
              </span>
              <span className='flex items-center space-x-1'>
                <IconUser size={20} />
                <span className='text-sm dark:text-gray-400'>{state.supabase_profile?.tmdb_account_id}</span>
              </span>
            </div>
          </div>
        </div>
        <div>
          <button
            type='button'
            onClick={onOpen}
            className='text-gray-700 dark:text-gray-300 text-sm border rounded-lg p-2 duration-150 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center m-4'
          >
            <IconPencil size={20} className='mr-1' />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
