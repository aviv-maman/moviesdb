'use client';

import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Divider, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react';
import type { FC } from 'react';
import MultiSelect from './MultiSelect';
import ButtonCustom from './ButtonCustom';
import CheckboxGenre from './CheckboxGenre';
import { AVAILABILITIES, GENRES, LANGUAGES, RELEASE_DATES, SHOW_ME } from '@/lib/data/search_filters';
import { useForm } from '@/context/FormContext';

interface SidebarFiltersProps {}

const SidebarFilters: FC<SidebarFiltersProps> = ({}) => {
  const { dispatch, state } = useForm();

  const handleShowMe = (value: string) => {
    dispatch({ type: 'show_me', payload: { value } });
  };

  const handleAvailabilities = (value: string[]) => {
    dispatch({ type: 'toggled_availability', payload: { value } });
  };

  const handleReleaseDates = (value: string[]) => {
    dispatch({ type: 'toggled_release_date', payload: { value } });
  };

  const handleGenres = (value: string[]) => {
    dispatch({ type: 'toggled_genre', payload: { value } });
  };

  const handleLanguage = (value: string) => {
    dispatch({ type: 'changed_language', payload: { value } });
  };

  const handleUserScore = (value: number | [number, number]) => {
    if (typeof value === 'number') dispatch({ type: 'changed_user_score', payload: { min: value, max: value } });
    else dispatch({ type: 'changed_user_score', payload: { min: value[0], max: value[1] } });
  };

  return (
    <Accordion variant='bordered'>
      <AccordionItem key='filters' aria-label='Accordion of filters' title='Filters' subtitle='Filter Results' className='flex flex-col w-full'>
        <RadioGroup defaultValue={'everything'} orientation='vertical' label='Show Me' onValueChange={handleShowMe}>
          {SHOW_ME.map((option) => (
            <Radio key={option.value} value={option.value} color='warning'>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
        <Divider orientation='horizontal' className='my-4' />
        <CheckboxGroup
          defaultValue={AVAILABILITIES.map((option) => option.value)}
          orientation='vertical'
          label='Availabilities'
          onValueChange={handleAvailabilities}>
          {AVAILABILITIES.map((option) => (
            <Checkbox key={option.value} value={option.value} color='success'>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-4' />
        <CheckboxGroup
          defaultValue={RELEASE_DATES.map((option) => option.value)}
          orientation='vertical'
          label='Release Dates'
          onValueChange={handleReleaseDates}>
          {RELEASE_DATES.map((option) => (
            <Checkbox key={option.value} value={option.value} color='danger'>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-4' />
        <CheckboxGroup defaultValue={GENRES.map((option) => option.value)} orientation='horizontal' label='Genres' onValueChange={handleGenres}>
          {GENRES.map((option) => (
            <CheckboxGenre key={option.value} aria-label={option.label} value={option.value} label={option.label} color='primary' />
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='mt-5 mb-3' />
        <div className='relative flex flex-col gap-2 my-10'>
          <Select
            label='Select language'
            aria-label='language selection'
            className='max-w-xs'
            defaultSelectedKeys={[state.language]}
            variant='bordered'
            color='success'
            labelPlacement='outside'
            onChange={(e) => handleLanguage(e.target.value)}>
            {LANGUAGES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <span className='relative text-medium text-foreground-500'>User Score</span>
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <span className='relative text-medium text-foreground-500'>Keywords</span>
          <MultiSelect />
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <span className='relative text-medium text-foreground-500'>Minimum User Votes</span>
          <input type='range' min='1' max='500' />
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <span className='relative text-medium text-foreground-500'>Runtime</span>
          <input type='range' min='1' max='400' />
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <ButtonCustom label='Clear Filters' className='w-full mt-4' variant='faded' />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarFilters;
