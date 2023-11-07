'use client';

import { type TransitionStartFunction, type FC, useRef } from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useProfile } from '@/context/ProfileContext';
import { createClient } from '@/utils/supabase/client';
import { updateProfile } from '@/app/profile/page';

interface AvatarUploadModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  pending: boolean;
  onUploadStart: TransitionStartFunction;
  label?: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

const AvatarUploadModal: FC<AvatarUploadModalProps> = ({
  pending,
  onUploadStart,
  label,
  isOpen,
  onOpenChange,
  ...rest
}) => {
  const { dispatch, state } = useProfile();
  const uploadRef = useRef<HTMLInputElement>(null);

  const uploadAvatar = async (file: File) => {
    try {
      if (!file) throw new Error('You must select an image to upload.');
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${state.supabase_user?.id}.${fileExt}`;
      const bucket = supabase.storage.from('avatars');
      const { error: uploadError } = await bucket.upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      const publicUrl = bucket.getPublicUrl(fileName).data.publicUrl;
      return await updateProfile({ avatar_url: publicUrl });
    } catch (error) {
      console.log('Error uploading avatar!');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={pending}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Upload Avatar</ModalHeader>
            <ModalBody>
              <label htmlFor={rest.id}>{label}</label>
              <input
                id='profile_pic'
                name='profile_pic'
                ref={uploadRef}
                // style={{
                //   top: '-9999rem',
                //   position: 'absolute',
                // }}
                disabled={pending}
                type='file'
                accept='image/*'
                // onChange={async (e) => {
                //   onUploadStart(async () => {
                //     if (!e.target?.files) throw new Error('You must select an image to upload.');
                //     const profile = await uploadAvatar(e);
                //     if (profile) dispatch({ type: 'changed_supabase_profile', payload: { value: profile } });
                //     onClose();
                //   });
                // }}
                {...rest}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant='faded'
                onPress={onClose}
                className='bg-red-100 dark:bg-red-500 text-red-500 dark:text-red-100 hover:bg-red-300 hover:dark:bg-red-300 hover:text-red-600 hover:dark:text-red-600 border-red-400'
              >
                Close
              </Button>
              <Button
                className='bg-indigo-100 dark:bg-indigo-500 text-indigo-500 dark:text-indigo-100 hover:bg-indigo-300 hover:dark:bg-indigo-300 hover:text-indigo-600 hover:dark:text-indigo-600 border-indigo-400'
                variant='faded'
                isLoading={pending}
                onClick={async () => {
                  onUploadStart(async () => {
                    if (!uploadRef.current?.files?.[0]) throw new Error('You must select an image to upload.');
                    const profile = await uploadAvatar(uploadRef.current?.files?.[0]);
                    if (profile) dispatch({ type: 'changed_supabase_profile', payload: { value: profile } });
                    onClose();
                  });
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AvatarUploadModal;
