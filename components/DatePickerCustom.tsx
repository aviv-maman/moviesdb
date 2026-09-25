"use client";

import { useState } from "react";
import { Button, Calendar, DateField, DatePicker, Label } from "@heroui/react";

function ReleaseDatePicker({ name, label }: { name: string; label: string }) {
  const [value, setValue] = useState<DatePicker["Props"]["value"]>(null);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  return (
    <div className="flex items-end gap-2">
      <DatePicker name={name} value={value} onChange={setValue} className="min-w-0 flex-1">
        <Label>{label}</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger>
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DatePicker.Popover placement="top start" shouldFlip>
          <Calendar aria-label={label} isYearPickerOpen={isYearPickerOpen} onYearPickerOpenChange={setIsYearPickerOpen}>
            <Calendar.Header>
              <Calendar.YearPickerTrigger>
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator />
              </Calendar.YearPickerTrigger>
              {!isYearPickerOpen && <Calendar.NavButton slot="previous" />}
              {!isYearPickerOpen && <Calendar.NavButton slot="next" />}
            </Calendar.Header>
            {isYearPickerOpen ? (
              <Calendar.YearPickerGrid>
                <Calendar.YearPickerGridBody>
                  {({ year }) => <Calendar.YearPickerCell year={year} />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            ) : (
              <Calendar.Grid>
                <Calendar.GridHeader>{(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}</Calendar.GridHeader>
                <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
              </Calendar.Grid>
            )}
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        aria-label={`Clear ${label.toLowerCase()} date`}
        isDisabled={!value}
        onPress={() => setValue(null)}>
        Clear
      </Button>
    </div>
  );
}

export default function DatePickerCustom() {
  return (
    <fieldset className="my-3 flex min-w-0 flex-col gap-2">
      <legend className="mb-2 text-sm text-muted">Release Dates</legend>
      <ReleaseDatePicker name="release_date.gte" label="From" />
      <ReleaseDatePicker name="release_date.lte" label="Until" />
    </fieldset>
  );
}
