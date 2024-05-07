'use client';

import { FC, useRef, useTransition } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { updateProfile } from '@/lib/api_profile';
import { useProfile } from '@/context/ProfileContext';

interface ProfileEditModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ProfileEditModal: FC<ProfileEditModalProps> = ({ isOpen, onOpenChange }) => {
  const { dispatch, state } = useProfile();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={pending}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className='flex flex-col gap-1'>Edit Details</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label='Full Name'
                placeholder='Enter your full name'
                variant='bordered'
                name='full_name'
                defaultValue={state.supabase_profile?.full_name || undefined}
                ref={fullNameRef}
              />
              <Input
                label='Username'
                placeholder='Enter your username'
                variant='bordered'
                name='username'
                defaultValue={state.supabase_profile?.username || undefined}
                ref={usernameRef}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant='faded'
                onPress={onClose}
                className='bg-red-100 dark:bg-red-500 text-red-500 dark:text-red-100 hover:bg-red-300 hover:dark:bg-red-300 hover:text-red-600 hover:dark:text-red-600 border-red-400'>
                Close
              </Button>
              <Button
                className='bg-indigo-100 dark:bg-indigo-500 text-indigo-500 dark:text-indigo-100 hover:bg-indigo-300 hover:dark:bg-indigo-300 hover:text-indigo-600 hover:dark:text-indigo-600 border-indigo-400'
                variant='faded'
                isLoading={pending}
                onClick={async () => {
                  startTransition(async () => {
                    const data = await updateProfile({
                      full_name: fullNameRef.current?.value,
                      username: usernameRef.current?.value,
                      avatar_url: state.supabase_profile?.avatar_url,
                    });
                    if (data) dispatch({ type: 'changed_supabase_profile', payload: { value: data } });
                    onClose();
                  });
                }}>
                Submit
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileEditModal;
