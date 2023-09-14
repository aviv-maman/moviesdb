'use client';

import type { FC } from 'react';
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Divider, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react';
import MultiSelect from './MultiSelect';
import ButtonCustom from './ButtonCustom';
import CheckboxGenre from './CheckboxGenre';
import { AVAILABILITIES, GENRES, LANGUAGES, RELEASE_DATES, SHOW_ME } from '@/lib/data/search_filters';
import { useForm } from '@/context/FormContext';
import SliderCustom from './SliderCustom';
import DatePickerCustom from './DatePickerCustom';

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
        <RadioGroup defaultValue={'everything'} orientation='vertical' label='Show Me' onValueChange={handleShowMe} className='font-normal'>
          {SHOW_ME.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
        <Divider orientation='horizontal' className='my-4' />
        <span className='relative text-medium text-foreground-500 block font-normal'>Availabilities</span>
        <CheckboxGroup defaultValue={[state.availabilities[0]]} onValueChange={handleAvailabilities}>
          <Checkbox key={'search-all-availabilities'} value={'all-availabilities'} className='my-1 font-normal'>
            Search all availabilities
          </Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          defaultValue={AVAILABILITIES.map((option) => option.value)}
          orientation='horizontal'
          onValueChange={handleAvailabilities}
          className='font-normal'
          isDisabled={state.availabilities[0] === 'all-availabilities'}>
          {AVAILABILITIES.map((option) => (
            <Checkbox key={option.value} value={option.value} color='secondary'>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-3' />
        <DatePickerCustom />
        <span className='relative text-medium text-foreground-500 block font-normal'>Release Types</span>
        <CheckboxGroup defaultValue={[state.release_dates[0]]} onValueChange={handleReleaseDates}>
          <Checkbox key={'search-all-releases'} value={'all-releases'} className='my-1 font-normal'>
            Search all releases
          </Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          defaultValue={RELEASE_DATES.map((option) => option.value)}
          orientation='horizontal'
          onValueChange={handleReleaseDates}
          className='font-normal'
          isDisabled={state.release_dates[0] === 'all-releases'}>
          {RELEASE_DATES.map((option) => (
            <Checkbox key={option.value} value={option.value} color='secondary'>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-4' />
        <CheckboxGroup defaultValue={GENRES.map((option) => option.value)} orientation='horizontal' label='Genres' onValueChange={handleGenres}>
          {GENRES.map((option) => (
            <CheckboxGenre
              key={option.value}
              aria-label={option.label}
              value={option.value}
              label={option.label}
              color='primary'
              className='mx-0 px-1'
            />
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
          <SliderCustom type='range' title='User Score' />
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <span className='relative text-medium text-foreground-500'>Keywords</span>
          <MultiSelect />
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <SliderCustom type='slider' min={0} max={500} step={50} title='Minimum User Votes' />
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <SliderCustom type='range' min={0} max={360} step={15} marksInterval={4} title='Runtime' />
          <Divider orientation='horizontal' className='mt-5 mb-3' />
          <ButtonCustom label='Clear Filters' className='w-full mt-4' variant='faded' />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarFilters;
