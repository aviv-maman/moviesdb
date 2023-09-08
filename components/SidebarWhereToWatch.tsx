'use client';

import { type FC } from 'react';
import { Accordion, AccordionItem, Avatar, Checkbox, CheckboxGroup, Select, SelectItem } from '@nextui-org/react';
import movieProviders from '@/lib/data/movie_providers.json';
import countries from '@/lib/data/countries.json';
import { useForm } from '@/context/FormContext';

interface SidebarWhereToWatchProps {}

const SidebarWhereToWatch: FC<SidebarWhereToWatchProps> = ({}) => {
  const { results: whereToWatchList } = movieProviders;
  const { results: countryList } = countries;
  const { dispatch, state } = useForm();

  return (
    <Accordion defaultExpandedKeys={['where-to-watch']} variant='bordered'>
      <AccordionItem
        key='where-to-watch'
        aria-label='Accordion of where to watch'
        title='Where to Watch'
        subtitle='Streaming Services'
        className='flex flex-col w-full'>
        <Select
          label='Select country'
          aria-label='country selection'
          className='max-w-xs'
          defaultSelectedKeys={[state.where_to_watch.country]}
          variant='bordered'
          color='success'
          labelPlacement='outside'
          startContent={
            <Avatar
              alt={state.where_to_watch.country}
              className='w-6 h-6'
              radius='sm'
              src={`https://flagcdn.com/${state.where_to_watch.country.toLowerCase()}.svg`}
            />
          }
          onChange={(e) => dispatch({ type: 'changed_country', payload: { value: e.target.value } })}>
          {countryList.map((option) => (
            <SelectItem
              key={option.iso_3166_1}
              value={option.iso_3166_1}
              startContent={
                <Avatar alt={option.english_name} className='w-6 h-6' src={`https://flagcdn.com/${option.iso_3166_1.toLowerCase()}.svg`} />
              }>
              {option.native_name}
            </SelectItem>
          ))}
        </Select>
        <Checkbox defaultSelected color='warning' className='mb-1'>
          Select My Services
        </Checkbox>
        <CheckboxGroup orientation='horizontal'>
          {whereToWatchList.map((option) => (
            <Checkbox key={option.provider_id} value={option.provider_name}>
              {option.provider_name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarWhereToWatch;
