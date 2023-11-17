'use client';
import type { FC } from 'react';
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
  Divider,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react';
import MultiSelect from './MultiSelect';
import ButtonCustom from './ButtonCustom';
import CheckboxGenre from './CheckboxGenre';
import { AVAILABILITIES, GENRES, LANGUAGES, RELEASE_TYPES, SHOW_ME } from '@/lib/data/search_filters';
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
    dispatch({
      type: 'toggled_availability',
      payload: { value: value.includes('all-availabilities') ? ['all-availabilities'] : value },
    });
  };

  const handleReleaseType = (value: string[]) => {
    const numValue = value.map((option) => Number(option));
    dispatch({ type: 'toggled_release_types', payload: { value: numValue.includes(0) ? [0] : numValue } });
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
          name='show_me'
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
        <span className='relative block text-foreground-500 text-sm my-2'>Availabilities</span>
        <CheckboxGroup
          name='with_availabilities'
          orientation='horizontal'
          defaultValue={['all-availabilities', ...AVAILABILITIES.map((option) => option.value)]}
          onValueChange={handleAvailabilities}
        >
          <Checkbox key='all-availabilities' value='all-availabilities' classNames={{ label: 'text-sm font-normal' }}>
            Search all availabilities
          </Checkbox>
          {AVAILABILITIES.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              isDisabled={state.availabilities.includes('all-availabilities')}
              color='secondary'
              classNames={{ label: 'text-sm font-normal' }}
            >
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-3' />
        <DatePickerCustom />
        <span className='relative text-foreground-500 block text-sm my-2'>Release Types</span>
        <CheckboxGroup
          name='with_release_type'
          defaultValue={['0', ...RELEASE_TYPES.map((option) => String(option.value))]}
          orientation='horizontal'
          onValueChange={handleReleaseType}
        >
          <Checkbox key='all-releases' value='0' classNames={{ label: 'text-sm font-normal' }}>
            Search all releases
          </Checkbox>
          {RELEASE_TYPES.map((option) => (
            <Checkbox
              key={option.value}
              value={String(option.value)}
              isDisabled={state.release_types.includes(0)}
              color='secondary'
              classNames={{ label: 'text-sm font-normal' }}
            >
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-3' />
        <CheckboxGroup
          name='with_genres'
          orientation='horizontal'
          label='Genres'
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
            name='language'
            label='Select language'
            aria-label='language selection'
            className='max-w-xs'
            variant='bordered'
            color='success'
            labelPlacement='outside'
          >
            {LANGUAGES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          <Divider orientation='horizontal' className='my-3' />
          <SliderCustom name='vote_average' label='User Score' maxValue={10} step={1} defaultValue={[0, 10]} />
          <Divider orientation='horizontal' className='my-3' />
          <MultiSelect name='with_keywords' title='Keywords' />
          <Divider orientation='horizontal' className='my-3' />
          <SliderCustom name='vote_count.gte' label='Minimum User Votes' maxValue={500} step={50} marksInterval={100} />
          <Divider orientation='horizontal' className='my-3' />
          <SliderCustom name='with_runtime' label='Runtime' maxValue={360} step={15} marksInterval={60} defaultValue={[0, 360]} />
          <Divider orientation='horizontal' className='my-3' />
          <ButtonCustom label='Clear Filters' className='w-full' variant='faded' />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarFilters;
