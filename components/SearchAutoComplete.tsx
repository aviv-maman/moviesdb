"use client";

import type { FC } from "react";
import { ComboBox, Input, Label, ListBox } from "@heroui/react";

interface SearchAutoCompleteProps {
  items: { label: string; value: string }[];
  name: string;
  label: string;
  defaultValue?: string | null;
}

const SearchAutoComplete: FC<SearchAutoCompleteProps> = ({ items, name, label, defaultValue }) => {
  return (
    <ComboBox
      name={name}
      defaultSelectedKey={defaultValue || items[0].value}
      className="min-w-0 flex-1 max-w-[8.5rem]"
      allowsEmptyCollection={false}>
      <Label>{label}</Label>
      <ComboBox.InputGroup>
        <Input />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          {items.map((item) => (
            <ListBox.Item key={item.value} id={item.value} textValue={item.label}>
              {item.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
};

export default SearchAutoComplete;
