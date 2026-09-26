"use client";
import { Accordion, Label, ListBox, Select } from "@heroui/react";
import { useFilterDraft } from "@/context/FilterDraftContext";
import { SORT_BY } from "@/lib/data/search_filters";

const SidebarSortBy: React.FC = () => {
  const { values } = useFilterDraft();
  return (
    <Accordion variant="surface">
      <Accordion.Item key="sort-by" aria-label="Sort" id={"sort-by"}>
        <Accordion.Heading>
          <Accordion.Trigger>
            <span>
              {"Sort"}
              <span className="block text-xs text-muted">{"Sort Results By"}</span>
            </span>
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="overflow-x-hidden">
            <Select
              name="sort_by"
              aria-label="sort selection"
              selectionMode="single"
              className="mb-2 mt-4 max-w-xs"
              defaultValue={values.sort_by?.[0] || SORT_BY[0].value}>
              <Label>{"Select sorting option"}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {SORT_BY.map((option) => (
                    <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                      <Label>{option.label}</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
export default SidebarSortBy;
