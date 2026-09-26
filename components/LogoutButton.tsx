"use client";

import type { FC } from "react";
import type { ButtonProps } from "@heroui/react";
import { Button } from "@heroui/react";

interface LogoutButtonProps extends ButtonProps {
  label?: string;
}

const LogoutButton: FC<LogoutButtonProps> = ({ label = "Logout", ...props }) => {
  return (
    <form action="/auth/logout" method="post">
      <Button className="bg-red-400 opacity-95 hover:bg-red-500" {...props}>
        {label}
      </Button>
    </form>
  );
};

export default LogoutButton;
