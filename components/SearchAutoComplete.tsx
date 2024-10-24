'use client';

import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

interface SearchAutoCompleteProps {
  items: { label: string; value: string }[];
  name: string;
  label: string;
  defaultValue?: string | null;
}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({ items, name, label, defaultValue }) => {
  return (
    <Autocomplete
      id={name}
      name={name}
      label={label}
      defaultSelectedKey={defaultValue || items[0].value}
      allowsEmptyCollection={false}
      classNames={{ base: 'max-w-[8.5rem]', clearButton: 'hidden' }}
      variant='faded'
      size='sm'>
      {items.map((item) => (
        <AutocompleteItem key={item.value} value={item.value}>
          {item.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default SearchAutoComplete;
