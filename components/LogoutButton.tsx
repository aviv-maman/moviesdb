"use client";

import type { FC } from "react";
import { Button } from "@heroui/react";

interface LogoutButtonProps {
  label?: string;
}

const LogoutButton: FC<LogoutButtonProps> = ({ label = "Logout" }) => {
  return (
    <form action="/auth/logout" method="post">
      <Button className="bg-red-400 opacity-95 hover:bg-red-500">{label}</Button>
    </form>
  );
};

export default LogoutButton;
