import { type FC } from 'react';
import AsyncSelect from 'react-select/async';
import keywords from '@/lib/data/keyword_ids_09_04_2023.json';
import type { KeywordList } from '@/lib/api.types';
import { useForm } from '@/context/FormContext';
import { useDarkMode } from '@/context/DarkModeContext';

type MultiOptions = {
  id: number;
  value: string;
  label: string;
};

const MultiSelect: FC = () => {
  const { results } = keywords as KeywordList;

  const { state, dispatch } = useForm();
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
      onChange={(newValue, actionMeta) => {
        if (actionMeta.action === 'remove-value') dispatch({ type: 'deleted_keyword', payload: { id: actionMeta.removedValue?.id } });
        if (actionMeta.action === 'select-option') {
          if (state.keywords.some((option) => option.id === actionMeta.option?.id)) return;
          if (actionMeta.option?.id && actionMeta.option?.value)
            dispatch({ type: 'added_keyword', payload: { id: actionMeta.option?.id, value: actionMeta.option?.value } });
        }
      }}
    />
  );
};

export default MultiSelect;
