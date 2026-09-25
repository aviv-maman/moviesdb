"use client";

import { useMemo, useState } from "react";
import { Button, ComboBox, Input, Label, ListBox } from "@heroui/react";
import keywords from "@/lib/data/keyword_ids_10_23_2024.json";

interface MultiSelectProps {
  title?: string;
  name?: string;
}

const keywordOptions = keywords.results.map(({ id, name }) => ({ id, name, searchName: name.toLowerCase() }));
const keywordById = new Map(keywordOptions.map((item) => [String(item.id), item]));

export default function MultiSelect({ title = "Keywords", name }: MultiSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const items = useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    const matches = [];
    if (query) {
      for (const item of keywordOptions) {
        if (item.searchName.includes(query)) matches.push(item);
        if (matches.length === 50) break;
      }
    }
    return matches;
  }, [inputValue]);

  return (
    <section>
      <ComboBox
        selectionMode="multiple"
        value={selectedIds}
        onChange={(keys) => setSelectedIds(keys.map(String))}
        inputValue={inputValue}
        onInputChange={setInputValue}
        items={items}
        menuTrigger="input"
        allowsEmptyCollection>
        <Label>{title}</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Type to search..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox
            items={items}
            selectionMode="multiple"
            renderEmptyState={() => (inputValue.trim() ? "No matching keywords" : "Type to search keywords")}>
            {(item) => (
              <ListBox.Item id={String(item.id)} textValue={item.name}>
                <Label>{item.name}</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
      <ul aria-label="Selected keywords" className="mt-2 flex flex-wrap gap-2">
        {selectedIds.map((id) => (
          <li key={id}>
            <input type="hidden" name={name} value={id} />
            <Button
              type="button"
              size="sm"
              variant="secondary"
              aria-label={`Remove ${keywordById.get(id)?.name ?? id}`}
              onPress={() => setSelectedIds((ids) => ids.filter((value) => value !== id))}>
              {keywordById.get(id)?.name ?? id} <span aria-hidden="true">&times;</span>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
