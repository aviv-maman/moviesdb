"use client";

import { Label, ListBox } from "@heroui/react";
import { TopologyStar, UserCog } from "@/assets/icons";
import { useProfile } from "@/context/ProfileContext";

const ProfileMenu: React.FC = () => {
  const { dispatch } = useProfile();
  return (
    <div className="my-4 mr-0 rounded-sm border border-slate-200 px-1 py-2 dark:border-slate-100 sm:w-full md:my-0 md:mr-4 md:max-w-[260px]">
      <ListBox
        aria-label="Actions"
        onAction={(key) =>
          dispatch({
            type: "changed_active_view",
            payload: {
              value: key as "profile" | "integrations",
            },
          })
        }>
        <ListBox.Item key="profile" id={"profile"} textValue={"Profile Settings"}>
          {<UserCog />}
          <Label>Profile Settings</Label>
        </ListBox.Item>
        <ListBox.Item key="integrations" id={"integrations"} textValue={"Integrations"}>
          {<TopologyStar />}
          <Label>Integrations</Label>
        </ListBox.Item>
      </ListBox>
    </div>
  );
};
export default ProfileMenu;
