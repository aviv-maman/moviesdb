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
    <Accordion variant='bordered' defaultExpandedKeys={['filters']}>
      <AccordionItem
        key='filters'
        aria-label='Accordion of filters'
        title='Filters'
        subtitle='Filter Results'
        className='flex flex-col w-full'
        classNames={{ title: 'text-md', content: 'overflow-x-hidden' }}
      >
        <RadioGroup
          defaultValue='everything'
          orientation='vertical'
          label='Show Me'
          onValueChange={handleShowMe}
          classNames={{ label: 'text-sm' }}
        >
          {SHOW_ME.map((option) => (
            <Radio key={option.value} value={option.value} classNames={{ label: 'font-normal text-sm' }}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
        <Divider orientation='horizontal' className='my-4' />
        <span className='relative block text-foreground-500 text-sm'>Availabilities</span>
        <CheckboxGroup defaultValue={[state.availabilities[0]]} onValueChange={handleAvailabilities}>
          <Checkbox key={'search-all-availabilities'} value={'all-availabilities'} classNames={{ label: 'my-2 text-sm font-normal' }}>
            Search all availabilities
          </Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          defaultValue={AVAILABILITIES.map((option) => option.value)}
          orientation='horizontal'
          onValueChange={handleAvailabilities}
          isDisabled={state.availabilities[0] === 'all-availabilities'}
        >
          {AVAILABILITIES.map((option) => (
            <Checkbox key={option.value} value={option.value} color='secondary' classNames={{ label: 'text-sm font-normal' }}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-3' />
        <DatePickerCustom />
        <span className='relative text-foreground-500 block text-sm'>Release Types</span>
        <CheckboxGroup defaultValue={[state.release_dates[0]]} onValueChange={handleReleaseDates}>
          <Checkbox key={'search-all-releases'} value={'all-releases'} classNames={{ label: 'my-2 text-sm font-normal' }}>
            Search all releases
          </Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          defaultValue={RELEASE_DATES.map((option) => option.value)}
          orientation='horizontal'
          onValueChange={handleReleaseDates}
          isDisabled={state.release_dates[0] === 'all-releases'}
        >
          {RELEASE_DATES.map((option) => (
            <Checkbox key={option.value} value={option.value} color='secondary' classNames={{ label: 'text-sm font-normal' }}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-4' />
        <CheckboxGroup
          defaultValue={GENRES.map((option) => option.value)}
          orientation='horizontal'
          label='Genres'
          onValueChange={handleGenres}
          classNames={{ label: 'text-sm', wrapper: 'gap-1' }}
        >
          {GENRES.map((option) => (
            <CheckboxGenre
              key={option.value}
              aria-label={option.label}
              value={option.value}
              label={option.label}
              color='primary'
              className='mx-0 px-0'
            />
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='mt-5 mb-3' />
        <div className='relative flex flex-col gap-2 mt-4 mb-2'>
          <Select
            label='Select language'
            aria-label='language selection'
            className='max-w-xs'
            defaultSelectedKeys={[state.language]}
            variant='bordered'
            color='success'
            labelPlacement='outside'
            onChange={(e) => handleLanguage(e.target.value)}
          >
            {LANGUAGES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <Divider orientation='horizontal' className='my-3' />
          <SliderCustom label='User Score' maxValue={10} step={1} defaultValue={[0, 10]} />
          <Divider orientation='horizontal' className='my-3' />
          <MultiSelect title='Keywords' />
          <Divider orientation='horizontal' className='my-3' />
          <SliderCustom label='Minimum User Votes' maxValue={500} step={50} marksInterval={100} />
          <Divider orientation='horizontal' className='my-3' />
          <SliderCustom label='Runtime' maxValue={360} step={15} marksInterval={60} defaultValue={[0, 360]} />
          <Divider orientation='horizontal' className='my-3' />
          <ButtonCustom label='Clear Filters' className='w-full' variant='faded' />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarFilters;
