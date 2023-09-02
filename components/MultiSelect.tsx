import { type FC, useState } from 'react';
import AsyncSelect from 'react-select/async';

type MultiOptions = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: MultiOptions[];
}

const MultiSelect: FC<MultiSelectProps> = ({ options }) => {
  const [selected, setSelected] = useState<MultiOptions[]>([]);

  const results = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const filterOptions = (inputValue: string) => {
    return results.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<MultiOptions[]>((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 1000);
    });

  return (
    <AsyncSelect
      id='multi-select'
      name='MultiSelect'
      instanceId={new Date().getTime().toString()}
      isMulti
      placeholder='Type to search...'
      loadOptions={promiseOptions}
      openMenuOnClick={false}
    />
  );
};

export default MultiSelect;
