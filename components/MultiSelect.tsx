import { type FC } from 'react';
import AsyncSelect from 'react-select/async';
import { useDarkMode } from '@/context/DarkModeContext';
import type { KeywordList } from '@/lib/api.types';
import keywords from '@/lib/data/keyword_ids_10_23_2024.json';

type MultiOptions = {
  id: number;
  value: string;
  label: string;
};

interface MultiSelectProps {
  title?: string;
  name?: string;
}

const MultiSelect: FC<MultiSelectProps> = ({ title, name }) => {
  const { results } = keywords as KeywordList;
  const { isDarkMode } = useDarkMode();

  const filterOptions = (inputValue: string) => {
    return results.filter((i) => i.name.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<MultiOptions[]>((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue).map((i) => ({ id: i.id, value: i.name, label: i.name })));
      }, 1000);
    });

  return (
    <section>
      <span className='text-sm text-foreground-500'>{title}</span>
      <AsyncSelect
        id='with_keywords'
        name={name}
        instanceId={new Date().getTime().toString()}
        isMulti
        placeholder='Type to search...'
        loadOptions={promiseOptions}
        openMenuOnClick={false}
        className='mt-2 text-sm font-normal text-foreground-500'
        styles={{
          control: (baseStyles, { isFocused, isDisabled }) => ({
            ...baseStyles,
            backgroundColor: 'transparent',
            border: isDisabled
              ? '2px solid rgb(156 163 175)'
              : isFocused
                ? '2px solid #17c964'
                : isDarkMode
                  ? '2px solid #3f3f46'
                  : '2px solid #e5e7eb',
            minHeight: 40,
            borderRadius: 10,
            boxShadow: undefined,
            '&:hover': {
              borderColor: isFocused ? '2px solid #17c964' : isDarkMode ? '#71717a' : '#a1a1aa',
              cursor: 'text',
            },
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            borderRadius: 10,
          }),
          indicatorsContainer: (baseStyles) => ({
            ...baseStyles,
            cursor: 'pointer',
          }),
        }}
      />
    </section>
  );
};

export default MultiSelect;
