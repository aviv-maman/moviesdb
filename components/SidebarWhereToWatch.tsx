'use client';

import { type FC } from 'react';
import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { IconVideoPlus } from '@tabler/icons-react';

interface SidebarWhereToWatchProps {}

const SidebarWhereToWatch: FC<SidebarWhereToWatchProps> = ({}) => {
  const whereToWatchList = [
    { label: 'Netflix', value: 'netflix' },
    { label: 'Amazon Prime Video', value: 'amazon-prime-video' },
    { label: 'FlixOlé', value: 'flixole' },
    { label: 'Zee5', value: 'zee5' },
    { label: 'Sun NXT', value: 'sun-nxt' },
    { label: 'Mubi', value: 'mubi' },
    { label: 'Argo', value: 'argo' },
    { label: 'ConTV', value: 'contv' },
    { label: 'Curiosity Stream', value: 'curiosity-stream' },
    { label: 'Spuul', value: 'spuul' },
    { label: 'Classix', value: 'classix' },
    { label: 'Spamflix', value: 'spamflix' },
    { label: 'OSN', value: 'osn' },
    { label: 'Shahid VIP', value: 'shahid-vip' },
    { label: 'Public Domain Movies', value: 'public-domain-movies' },
    { label: 'Magellan TV', value: 'magellan-tv' },
    { label: 'BroadwayHD', value: 'broadway-hd' },
    { label: 'WOW Presents Plus', value: 'wow-presents-plus' },
    { label: 'Dekkoo', value: 'dekkoo' },
    { label: 'Filmzie', value: 'filmzie' },
    { label: 'True Story', value: 'true-story' },
    { label: 'Rakuten Viki', value: 'rakuten-viki' },
    { label: 'Hoichoi', value: 'hoichoi' },
    { label: 'Eventive', value: 'eventive' },
    { label: 'Cultpix', value: 'cultpix' },
    { label: 'iQIYI', value: 'iqiyi' },
    { label: 'Takflix', value: 'takflix' },
    { label: 'Apple TV', value: 'apple-tv' },
    { label: 'Apple TV Plus', value: 'apple-tv-plus' },
    { label: 'Crunchyroll', value: 'crunchyroll' },
  ];

  return (
    <Accordion defaultExpandedKeys={['where-to-watch']} variant='bordered'>
      <AccordionItem
        key='where-to-watch'
        aria-label='Accordion of where to watch'
        title='Where to Watch'
        subtitle='Streaming Services'
        className='flex flex-col w-full'>
        <Checkbox defaultSelected icon={<IconVideoPlus />} color='warning' className='mb-1'>
          Select My Services
        </Checkbox>
        <CheckboxGroup defaultValue={['netflix']} orientation='horizontal'>
          {whereToWatchList.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarWhereToWatch;
