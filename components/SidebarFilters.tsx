'use client';

import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Divider, Radio, RadioGroup, cn } from '@nextui-org/react';
import { type FC } from 'react';

interface SidebarFiltersProps {}

const SidebarFilters: FC<SidebarFiltersProps> = ({}) => {
  const showMe = [
    { label: 'Everything', value: 'everything' },
    { label: "Movies I Haven't Seen", value: 'not-seen' },
    { label: 'Movies I Have Seen', value: 'seen' },
  ];

  const availabilities = [
    { label: 'Stream', value: 'stream' },
    { label: 'Free', value: 'free' },
    { label: 'Ads', value: 'ads' },
    { label: 'Rent', value: 'rent' },
    { label: 'Buy', value: 'buy' },
  ];

  const releaseDates = [
    { label: 'Premiere', value: 'premiere' },
    { label: 'Theatrical', value: 'theatrical' },
    { label: 'Theatrical (Limited)', value: 'theatrical-limited' },
    { label: 'Digital', value: 'digital' },
    { label: 'Physical', value: 'physical' },
    { label: 'TV', value: 'tv' },
    // { label: 'Streaming', value: 'streaming' },
  ];

  const genres = [
    { label: 'Action', value: 'action' },
    { label: 'Adventure', value: 'adventure' },
    { label: 'Animation', value: 'animation' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Crime', value: 'crime' },
    { label: 'Documentary', value: 'documentary' },
    { label: 'Drama', value: 'drama' },
    { label: 'Family', value: 'family' },
    { label: 'Fantasy', value: 'fantasy' },
    { label: 'History', value: 'history' },
    { label: 'Horror', value: 'horror' },
    { label: 'Music', value: 'music' },
    { label: 'Mystery', value: 'mystery' },
    { label: 'Romance', value: 'romance' },
    { label: 'Science Fiction', value: 'science-fiction' },
    { label: 'TV Movie', value: 'tv-movie' },
    { label: 'Thriller', value: 'thriller' },
    { label: 'War', value: 'war' },
    { label: 'Western', value: 'western' },
  ];

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Russian', value: 'ru' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Dutch', value: 'nl' },
    { label: 'Polish', value: 'pl' },
    { label: 'Swedish', value: 'sv' },
    { label: 'Danish', value: 'da' },
    { label: 'Finnish', value: 'fi' },
    { label: 'Norwegian', value: 'no' },
    { label: 'Hebrew', value: 'he' },
    { label: 'Thai', value: 'th' },
    { label: 'Czech', value: 'cs' },
    { label: 'Romanian', value: 'ro' },
    { label: 'Hungarian', value: 'hu' },
    { label: 'Greek', value: 'el' },
    { label: 'Indonesian', value: 'id' },
    { label: 'Ukrainian', value: 'uk' },
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Malay', value: 'ms' },
    { label: 'Persian', value: 'fa' },
    { label: 'Bulgarian', value: 'bg' },
    { label: 'Afrikaans', value: 'af' },
    { label: 'Icelandic', value: 'is' },
    { label: 'Lithuanian', value: 'lt' },
    { label: 'Slovenian', value: 'sl' },
    { label: 'Estonian', value: 'et' },
    { label: 'Slovak', value: 'sk' },
    { label: 'Latvian', value: 'lv' },
    { label: 'Serbian', value: 'sr' },
    { label: 'Basque', value: 'eu' },
    { label: 'Croatian', value: 'hr' },
    { label: 'Tagalog', value: 'tl' },
    { label: 'Catalan', value: 'ca' },
    { label: 'Galician', value: 'gl' },
    { label: 'Urdu', value: 'ur' },
    { label: 'Bengali', value: 'bn' },
    { label: 'Bosnian', value: 'bs' },
    { label: 'Macedonian', value: 'mk' },
    { label: 'Albanian', value: 'sq' },
    { label: 'Tamil', value: 'ta' },
    { label: 'Telugu', value: 'te' },
    { label: 'Belarusian', value: 'be' },
    { label: 'Azerbaijani', value: 'az' },
    { label: 'Georgian', value: 'ka' },
    { label: 'Armenian', value: 'hy' },
  ];

  return (
    <Accordion variant='bordered'>
      <AccordionItem key='filters' aria-label='Accordion of filters' title='Filters' subtitle='Filters for Results' className='flex flex-col w-full'>
        <RadioGroup defaultValue={'everything'} orientation='vertical' label='Show Me'>
          {showMe.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
        <Divider orientation='horizontal' className='my-4' />
        <CheckboxGroup defaultValue={availabilities.map((option) => option.value)} orientation='vertical' label='Availabilities '>
          {availabilities.map((option) => (
            <Checkbox key={option.value} value={option.value} color='success'>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-4' />
        <CheckboxGroup defaultValue={releaseDates.map((option) => option.value)} orientation='vertical' label='Release Dates'>
          {releaseDates.map((option) => (
            <Checkbox key={option.value} value={option.value} color='success'>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <Divider orientation='horizontal' className='my-4' />
        <CheckboxGroup defaultValue={genres.map((option) => option.value)} orientation='horizontal' label='Genres'>
          {genres.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              aria-label={option.label}
              color='success'
              classNames={{
                base: cn(
                  'inline-flex max-w-md bg-content1 m-0',
                  'hover:bg-content2 items-center justify-start',
                  'cursor-pointer rounded-lg gap-2 p-4 border-1 border-transparent',
                  'data-[selected=true]:border-primary'
                ),
                label: 'w-full',
              }}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarFilters;
