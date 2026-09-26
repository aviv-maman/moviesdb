"use client";

import type { FC } from "react";
import { Avatar, Checkbox, type CheckboxProps } from "@heroui/react";

interface CheckboxServiceProps extends CheckboxProps {
  avatar?: string;
  provider_name: string;
}

const CheckboxService: FC<CheckboxServiceProps> = ({ avatar, provider_name, ...props }) => {
  return (
    <Checkbox
      {...props}
      aria-label={provider_name}
      className="relative rounded-md border-2 border-transparent p-1 data-[selected=true]:border-accent">
      <Checkbox.Content>
        <Checkbox.Control className="sr-only">
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Avatar className="rounded-md">
          <Avatar.Image src={avatar} alt={provider_name} />
          <Avatar.Fallback>{provider_name.slice(0, 2)}</Avatar.Fallback>
        </Avatar>
      </Checkbox.Content>
    </Checkbox>
  );
};

export default CheckboxService;
