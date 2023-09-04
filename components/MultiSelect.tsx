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
    { value: 'carrot', label: 'Carrot' },
    { value: 'banana', label: 'Banana' },
    { value: 'apple', label: 'Apple' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'caramel', label: 'Caramel' },
    { value: 'nuts', label: 'Nuts' },
    { value: 'cookies', label: 'Cookies' },
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
      className='font-normal text-small text-foreground-500'
      styles={{
        control: (baseStyles, { isFocused, isDisabled }) => ({
          ...baseStyles,
          backgroundColor: 'transparent',
          border: isDisabled ? '2px solid rgb(156 163 175)' : isFocused ? '2px solid #17c964' : '2px solid #3f3f46',
          minHeight: 40,
          borderRadius: 10,
          boxShadow: undefined,
          '&:hover': {
            borderColor: isFocused ? '2px solid #17c964' : '#71717a',
          },
        }),
      }}
    />
  );
};

export default MultiSelect;
