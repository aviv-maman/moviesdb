'use client';

import { Accordion, AccordionItem, Avatar, CheckboxGroup, Divider, Select, SelectItem } from '@heroui/react';
import CheckboxService from './CheckboxService';
import { useForm } from '@/context/FormContext';
import countries from '@/lib/data/countries.json';

// import { useGeoLocation } from '@/hooks/useGeoLocation';
// import useSWR from 'swr';
// import type { LocationResponse } from '@/lib/api.types';

const SidebarWhereToWatch: React.FC = () => {
  const { results: countryList } = countries;
  const { dispatch, state } = useForm();
  //   const { error, loading, position } = useGeoLocation();

  //   const [latitude, longitude] = [String(position?.coords.latitude), String(position?.coords.longitude)];
  //   const [geoURL, geoArgs] = [
  //     '/api/geo-location',
  //     { headers: { latitude: latitude, longitude: longitude } } as RequestInit | undefined,
  //   ];

  //   const {
  //     data: location,
  //     error: locationError,
  //     isLoading,
  //     isValidating,
  //   } = useSWR<{ data: LocationResponse }, Error>(position ? { url: geoURL, options: geoArgs } : null);

  const handleChangeCountry = (value: string) => {
    value = value.toUpperCase();
    dispatch({ type: 'changed_country', payload: { value } });
  };

  //   useEffect(() => {
  //     if (location?.data && 'address' in location.data && location.data.address.country_code !== null) {
  //       handleChangeCountry(location.data.address.country_code.toUpperCase());
  //     }
  //     console.log('locationError', locationError);
  //     console.log('location', location);
  //   }, [location]);

  return (
    <Accordion variant='bordered' defaultExpandedKeys={['where-to-watch']} keepContentMounted>
      <AccordionItem
        key='where-to-watch'
        aria-label='Where to watch'
        title='Where to Watch'
        subtitle='Streaming Services'
        classNames={{ title: 'text-md' }}>
        <Select
          name='watch_region'
          label='Select country'
          aria-label='Select country'
          className='mt-4 max-w-xs'
          //   isLoading={isLoading || isValidating}
          variant='bordered'
          color='success'
          labelPlacement='outside'
          scrollShadowProps={{ hideScrollBar: false, offset: 15 }}
          startContent={
            state.where_to_watch.country.length ? (
              <Avatar
                alt={state.where_to_watch.country}
                className='h-6 w-7'
                radius='sm'
                src={`https://flagcdn.com/${state.where_to_watch.country.toLowerCase()}.svg`}
              />
            ) : null
          }
          onChange={(e) => handleChangeCountry(e.target.value)}>
          {countryList.map((option) => (
            <SelectItem
              key={option.iso_3166_1}
              startContent={
                <Avatar
                  alt={option.english_name}
                  className='h-6 w-6'
                  radius='sm'
                  src={`https://flagcdn.com/${option.iso_3166_1.toLowerCase()}.svg`}
                />
              }>
              {option.native_name}
            </SelectItem>
          ))}
        </Select>
        <Divider orientation='horizontal' className='mb-3 mt-5' />
        <h2 className='relative mb-2 text-sm font-normal text-foreground-500'>Available Services</h2>
        <CheckboxGroup
          name='with_watch_providers'
          orientation='horizontal'
          className='mb-2'
          classNames={{ wrapper: 'flex justify-center', base: 'overflow-hidden' }}>
          {state.where_to_watch.providers.map((option) => (
            <CheckboxService
              key={option.provider_id}
              value={String(option.provider_id)}
              provider_name={option.provider_name}
              avatar={`https://image.tmdb.org/t/p/w500/${option.logo_path}`}
            />
          ))}
        </CheckboxGroup>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarWhereToWatch;
