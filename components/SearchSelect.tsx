"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label, ListBox, Select } from "@heroui/react";

interface SearchSelectProps {
  items: {
    label: string;
    value: string;
  }[];
  name: string;
  label: string;
  setMediaType: Dispatch<SetStateAction<"multi" | "movie" | "tv" | "person">>;
  defaultValue?: string | null;
}
const SearchSelect: React.FC<SearchSelectProps> = ({ items, name, label, setMediaType, defaultValue }) => {
  return (
    <Select
      id={name}
      name={name}
      className="w-24 shrink-0 sm:w-32"
      onChange={(value) => {
        if (typeof value === "string") setMediaType(value as "multi" | "movie" | "tv" | "person");
      }}
      defaultValue={defaultValue || items[0].value}>
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {items.map((item) => (
            <ListBox.Item key={item.value} id={item.value} textValue={item.label}>
              <Label>{item.label}</Label>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
export default SearchSelect;
