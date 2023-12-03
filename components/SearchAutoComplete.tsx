'use client';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

interface SearchAutoCompleteProps {
  items: { label: string; value: string }[];
  name: string;
  label: string;
}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({ items, name, label }) => {
  return (
    <Autocomplete
      id={name}
      name={name}
      label={label}
      defaultSelectedKey={items[0].value}
      allowsEmptyCollection={false}
      classNames={{ base: 'max-w-[8.5rem]', clearButton: 'hidden' }}
      variant='faded'
      size='sm'
    >
      {items.map((item) => (
        <AutocompleteItem key={item.value} textValue={item.value}>
          {item.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default SearchAutoComplete;
