"use client";

import { useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { Button, Description, Dropdown, Label } from "@heroui/react";
import { ChevronDown } from "@/assets/icons";

interface HeaderDropdownProps {
  targetSegment: string;
  links: {
    href: string;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[];
}
const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ targetSegment, links }) => {
  const router = useRouter();
  const activeSegment = useSelectedLayoutSegment();
  const activeSegments = useSelectedLayoutSegments();
  const dropdownLabel = targetSegment;
  const capitalizedLabel = dropdownLabel.charAt(0).toUpperCase() + dropdownLabel.slice(1);
  return (
    <Dropdown>
      <Button variant="ghost" className="rounded-md">
        {capitalizedLabel} {<ChevronDown className="size-[18px]" />}
      </Button>
      <Dropdown.Popover className="rounded-lg">
        <Dropdown.Menu aria-label={`${capitalizedLabel} Menu`} className="w-[340px] max-w-[calc(100vw-2rem)]">
          {links.map((link) => {
            const { href, label, description, icon } = link;
            return (
              <Dropdown.Item
                key={href}
                className={`rounded-md ${href === `/${activeSegment}/${activeSegments[1]}` ? "bg-blue-500/10" : ""}`}
                id={href}
                textValue={label}
                onAction={() => router.push(href)}>
                <span className="shrink-0">{icon}</span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Label>{label}</Label>
                  <Description>{description}</Description>
                </div>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
export default HeaderDropdown;
