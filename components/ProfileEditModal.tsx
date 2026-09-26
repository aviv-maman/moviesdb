"use client";

import type { FC } from "react";
import { useRef, useTransition } from "react";
import { Button, Modal } from "@heroui/react";
import TextInput from "@/components/TextInput";
import { useProfile } from "@/context/ProfileContext";
import { updateProfile } from "@/lib/api_profile";

interface ProfileEditModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ProfileEditModal: FC<ProfileEditModalProps> = ({ isOpen, onOpenChange }) => {
  const { dispatch, state } = useProfile();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop isDismissable={!pending}>
        <Modal.Container>
          <Modal.Dialog>
            {({ close: onClose }) => (
              <div>
                <Modal.Header className="flex flex-col gap-1">
                  <Modal.Heading>Edit Details</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <TextInput
                    autoFocus
                    label="Full Name"
                    placeholder="Enter your full name"
                    name="full_name"
                    defaultValue={state.supabase_profile?.full_name || undefined}
                    ref={fullNameRef}
                  />
                  <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                    defaultValue={state.supabase_profile?.username || undefined}
                    ref={usernameRef}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onPress={onClose}
                    className="border-red-400 bg-red-100 text-red-500 hover:bg-red-300 hover:text-red-600 dark:bg-red-500 dark:text-red-100 hover:dark:bg-red-300 hover:dark:text-red-600">
                    Close
                  </Button>
                  <Button
                    className="border-indigo-400 bg-indigo-100 text-indigo-500 hover:bg-indigo-300 hover:text-indigo-600 dark:bg-indigo-500 dark:text-indigo-100 hover:dark:bg-indigo-300 hover:dark:text-indigo-600"
                    variant="secondary"
                    onPress={async () => {
                      startTransition(async () => {
                        const data = await updateProfile({
                          full_name: fullNameRef.current?.value,
                          username: usernameRef.current?.value,
                          avatar_url: state.supabase_profile?.avatar_url,
                        });
                        if (data)
                          dispatch({
                            type: "changed_supabase_profile",
                            payload: {
                              value: data,
                            },
                          });
                        onClose();
                      });
                    }}
                    isPending={pending}>
                    Submit
                  </Button>
                </Modal.Footer>
              </div>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
export default ProfileEditModal;
