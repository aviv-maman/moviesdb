'use client';

import { type FC } from 'react';
import { Accordion, AccordionItem, Avatar, Checkbox, CheckboxGroup, Divider, Select, SelectItem } from '@nextui-org/react';
import countries from '@/lib/data/countries.json';
import { useForm } from '@/context/FormContext';
import CheckboxService from './CheckboxService';

interface SidebarWhereToWatchProps {}

const SidebarWhereToWatch: FC<SidebarWhereToWatchProps> = ({}) => {
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
          className='max-w-xs my-4'
          defaultSelectedKeys={[state.where_to_watch.country]}
          variant='bordered'
          color='success'
          labelPlacement='outside'
          scrollShadowProps={{ hideScrollBar: false, offset: 15 }}
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
                <Avatar
                  alt={option.english_name}
                  className='w-6 h-6'
                  radius='sm'
                  src={`https://flagcdn.com/${option.iso_3166_1.toLowerCase()}.svg`}
                />
              }>
              {option.native_name}
            </SelectItem>
          ))}
        </Select>
        <Divider orientation='horizontal' className='mt-5 mb-3' />
        <h2 className='relative text-small text-foreground-500'>Available Services</h2>

        <Checkbox color='warning' className='my-1'>
          <span className='text-small'>Select my services</span>
        </Checkbox>
        <CheckboxGroup orientation='horizontal'>
          {state.where_to_watch.providers.map((option) => (
            <CheckboxService
              key={option.provider_id}
              provider_id={option.provider_id}
              value={option.provider_name}
              avatar={`https://image.tmdb.org/t/p/w500/${option.logo_path}`}
            />
          ))}
        </CheckboxGroup>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarWhereToWatch;
