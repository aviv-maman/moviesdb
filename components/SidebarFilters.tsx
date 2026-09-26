"use client";

import { useState } from "react";
import { Accordion, Checkbox, CheckboxGroup, Label, ListBox, Select, Separator } from "@heroui/react";
import { useFilterDraft } from "@/context/FilterDraftContext";
import { AVAILABILITIES, LANGUAGES, MOVIE_GENRES, RELEASE_TYPES } from "@/lib/data/search_filters";
import CheckboxGenre from "./CheckboxGenre";
import DatePickerCustom from "./DatePickerCustom";
import MultiSelect from "./MultiSelect";
import SliderCustom from "./SliderCustom";

const SidebarFilters: React.FC = () => {
  const { values } = useFilterDraft();
  const [availabilities, setAvailabilities] = useState(
    values.with_availabilities ?? ["all-availabilities", ...AVAILABILITIES.map((option) => option.value)],
  );
  const [releaseTypes, setReleaseTypes] = useState(
    values.with_release_type ?? ["0", ...RELEASE_TYPES.map((option) => String(option.value))],
  );
  return (
    <Accordion variant="surface" defaultExpandedKeys={["filters"]}>
      <Accordion.Item key="filters" aria-label="Accordion of filters" className="flex w-full flex-col" id={"filters"}>
        <Accordion.Heading>
          <Accordion.Trigger>
            <span>
              {"Filters"}
              <span className="block text-xs text-muted">{"Filter Results"}</span>
            </span>
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="overflow-x-hidden">
            {/* <RadioGroup
             name='show_me'
             defaultValue='everything'
             orientation='vertical'
             label='Show Me'
             onValueChange={handleShowMe}
             classNames={{ label: 'text-sm' }}
             >
             {SHOW_ME.map((option) => (
             <Radio key={option.value} value={option.value} classNames={{ label: 'font-normal text-sm' }}>
              {option.label}
             </Radio>
             ))}
             </RadioGroup>
             <Divider orientation='horizontal' className='my-4' /> */}
            <span className="relative block text-sm text-slate-500">Availabilities</span>
            <CheckboxGroup
              name="with_availabilities"
              value={availabilities}
              onChange={setAvailabilities}
              className="flex flex-col gap-2"
              aria-label={"with_availabilities"}>
              <div className="flex flex-wrap gap-2">
                <Checkbox key="all-availabilities" value="all-availabilities">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Label>Search all availabilities</Label>
                  </Checkbox.Content>
                </Checkbox>
                {AVAILABILITIES.map((option) => (
                  <Checkbox
                    key={option.value}
                    value={option.value}
                    isDisabled={availabilities.includes("all-availabilities")}>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Label>{option.label}</Label>
                    </Checkbox.Content>
                  </Checkbox>
                ))}
              </div>
            </CheckboxGroup>
            <Separator orientation="horizontal" className="my-3" />
            <DatePickerCustom />
            <span className="relative my-2 block text-sm text-slate-500">Release Types</span>
            <CheckboxGroup
              name="with_release_type"
              value={releaseTypes}
              onChange={setReleaseTypes}
              className="flex flex-col gap-2"
              aria-label={"with_release_type"}>
              <div className="flex flex-wrap gap-2">
                <Checkbox key="all-releases" value="0">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Label>Search all releases</Label>
                  </Checkbox.Content>
                </Checkbox>
                {RELEASE_TYPES.map((option) => (
                  <Checkbox key={option.value} value={String(option.value)} isDisabled={releaseTypes.includes("0")}>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Label>{option.label}</Label>
                    </Checkbox.Content>
                  </Checkbox>
                ))}
              </div>
            </CheckboxGroup>
            <Separator orientation="horizontal" className="my-3" />
            <CheckboxGroup name="with_genres" defaultValue={values.with_genres} className="flex flex-col gap-2">
              <Label>{"Genres"}</Label>
              <div className="flex flex-wrap gap-2">
                {MOVIE_GENRES.map((option) => (
                  <CheckboxGenre
                    key={option.value}
                    aria-label={option.label}
                    value={option.value}
                    label={option.label}
                    className="mx-0 px-0"
                  />
                ))}
              </div>
            </CheckboxGroup>
            <Separator orientation="horizontal" className="mb-3 mt-5" />
            <div className="relative mb-2 mt-4 flex flex-col gap-2">
              <Select
                name="language"
                defaultValue={values.language?.[0]}
                aria-label="language selection"
                className="max-w-xs">
                <Label>{"Select language"}</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {LANGUAGES.map((option) => (
                      <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                        <Label>{option.label}</Label>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
              <Separator orientation="horizontal" className="my-3" />
              <SliderCustom name="vote_average" label="User Score" maxValue={10} step={1} defaultValue={[0, 10]} />
              <Separator orientation="horizontal" className="my-3" />
              <MultiSelect name="with_keywords" title="Keywords" />
              <Separator orientation="horizontal" className="my-3" />
              <SliderCustom
                name="vote_count.gte"
                label="Minimum User Votes"
                maxValue={500}
                step={50}
                marksInterval={100}
              />
              <Separator orientation="horizontal" className="my-3" />
              <SliderCustom
                name="with_runtime"
                label="Runtime"
                maxValue={360}
                step={15}
                marksInterval={60}
                defaultValue={[0, 360]}
              />
            </div>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
export default SidebarFilters;
