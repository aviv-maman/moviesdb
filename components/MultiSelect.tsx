"use client";

import { useMemo, useState } from "react";
import { ComboBox, Description, Input, Label, ListBox, Tag, TagGroup } from "@heroui/react";
import { useFilterDraft } from "@/context/FilterDraftContext";
import type { KeywordList } from "@/lib/api.types";
import keywords from "@/lib/data/keyword_ids_10_23_2024.json";

const { results } = keywords as KeywordList;
const keywordById = new Map(results.map((keyword) => [String(keyword.id), keyword]));
const maxMatches = 50;

export default function MultiSelect({ title = "Keywords", name = "with_keywords" }: { title?: string; name?: string }) {
  const { values } = useFilterDraft();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(() => {
    const saved = values[name] ?? [];
    return results
      .filter((keyword) => saved.includes(String(keyword.id)) || saved.includes(keyword.name))
      .map((keyword) => String(keyword.id));
  });
  const normalizedQuery = query.trim().toLowerCase();
  const matches = useMemo(() => {
    const matches = [];
    if (normalizedQuery) {
      for (const keyword of results) {
        if (keyword.name.toLowerCase().includes(normalizedQuery)) matches.push(keyword);
        if (matches.length === maxMatches) break;
      }
    }
    return matches;
  }, [normalizedQuery]);

  return (
    <div className="space-y-2">
      <ComboBox
        value={null}
        onChange={(key) => {
          if (key === null) return;
          const id = String(key);
          setSelected((current) => (current.includes(id) ? current : [...current, id]));
          setQuery("");
        }}
        inputValue={query}
        onInputChange={setQuery}
        items={matches}
        menuTrigger="input"
        allowsEmptyCollection={normalizedQuery.length > 0}
        fullWidth>
        <Label>{title}</Label>
        <ComboBox.InputGroup>
          <Input
            placeholder="Search keywords..."
            className="min-w-0"
            onKeyDown={(event) => {
              if (event.key === "Escape" && query) {
                event.stopPropagation();
                setQuery("");
              }
            }}
          />
          <ComboBox.Trigger aria-label="Show keyword suggestions" />
        </ComboBox.InputGroup>
        <Description>
          {matches.length === maxMatches
            ? "Showing the first 50 matches. Keep typing to narrow the list."
            : "Search and select one or more keywords."}
        </Description>
        <ComboBox.Popover className="rounded-lg">
          <ListBox
            items={matches}
            className="max-h-60 overflow-y-auto"
            renderEmptyState={() => (
              <p className="px-3 py-4 text-sm text-muted">
                {normalizedQuery ? "No keywords found." : "Type to find keywords."}
              </p>
            )}>
            {(keyword) => (
              <ListBox.Item id={String(keyword.id)} textValue={keyword.name}>
                <Label>{keyword.name}</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
      {selected.length > 0 && (
        <TagGroup
          aria-label="Selected keywords"
          onRemove={(keys) => setSelected((current) => current.filter((id) => !keys.has(id)))}>
          <TagGroup.List className="flex flex-wrap gap-2">
            {selected.map((id) => (
              <Tag key={id} id={id} textValue={keywordById.get(id)?.name} className="max-w-full">
                <span className="truncate">{keywordById.get(id)?.name}</span>
                <Tag.RemoveButton aria-label={`Remove ${keywordById.get(id)?.name}`} />
              </Tag>
            ))}
          </TagGroup.List>
        </TagGroup>
      )}
      {selected.map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}
    </div>
  );
}
