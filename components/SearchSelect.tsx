'use client';
import { type Dispatch, type SetStateAction } from 'react';
import { Select, SelectItem } from '@nextui-org/react';

interface SearchSelectProps {
  items: { label: string; value: string }[];
  name: string;
  label: string;
  setMediaType: Dispatch<SetStateAction<'multi' | 'movie' | 'tv' | 'person'>>;
}

const SearchSelect: React.FC<SearchSelectProps> = ({ items, name, label, setMediaType }) => {
  return (
    <Select
      id={name}
      name={name}
      label={label}
      defaultSelectedKeys={[items[0].value]}
      disallowEmptySelection
      variant='faded'
      size='sm'
      className='max-w-[8rem]'
      onSelectionChange={(e) => {
        const key = e.valueOf();
        if (typeof key === 'string') return;
        if ('currentKey' in key) setMediaType((prevState) => key.currentKey as 'movie' | 'tv' | 'multi' | 'person');
      }}
    >
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SearchSelect;
