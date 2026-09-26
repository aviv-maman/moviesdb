"use client";

import type { ReactNode } from "react";
import { Tabs } from "@heroui/react";

interface CarouselTabsProps {
  label: string;
  items: { id: string; label: string; content: ReactNode }[];
  defaultSelectedKey?: string;
  inlineControls?: boolean;
}

export default function CarouselTabs({ label, items, defaultSelectedKey, inlineControls = false }: CarouselTabsProps) {
  return (
    <Tabs defaultSelectedKey={defaultSelectedKey} className="min-w-0 w-full">
      <div className={`border-b pb-4 ${inlineControls ? "mb-5 pr-24" : ""}`}>
        <Tabs.List aria-label={label} className="flex w-fit gap-1 bg-transparent p-0">
          {items.map((item) => (
            <Tabs.Tab
              key={item.id}
              id={item.id}
              className="min-w-0 w-auto rounded-lg px-3 py-2 text-sm font-medium text-muted data-[selected=true]:bg-foreground data-[selected=true]:text-background">
              {item.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </div>
      {items.map((item) => (
        <Tabs.Panel key={item.id} id={item.id} className="min-w-0 px-0 pt-0">
          {item.content}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
