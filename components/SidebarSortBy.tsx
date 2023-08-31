'use client';

import { type FC } from 'react';
import { Accordion, AccordionItem, Select, SelectItem } from '@nextui-org/react';

interface SidebarSortByProps {}

const SidebarSortBy: FC<SidebarSortByProps> = ({}) => {
  const sortBy = [
    { label: 'Popularity (Highest)', value: 'popularity.desc' },
    { label: 'Popularity (Lowest)', value: 'popularity.asc' },
    { label: 'Release Date (Newest)', value: 'primary_release_date.desc' },
    { label: 'Release Date (Oldest)', value: 'primary_release_date.asc' },
    { label: 'Revenue (Most Grossing)', value: 'revenue.desc' },
    { label: 'Revenue (Least Grossing)', value: 'revenue.asc' },
    { label: 'Title (A-Z)', value: 'original_title.asc' },
    { label: 'Title (Z-A)', value: 'original_title.desc' },
    { label: 'Vote Average (Highest)', value: 'vote_average.desc' },
    { label: 'Vote Average (Lowest)', value: 'vote_average.asc' },
    { label: 'Vote Count (Highest)', value: 'vote_count.desc' },
    { label: 'Vote Count (Lowest)', value: 'vote_count.asc' },
  ];

  return (
    <Accordion defaultExpandedKeys={['sort-by']} variant='bordered'>
      <AccordionItem key='sort-by' aria-label='Accordion of sort by' title='Sort' subtitle='Sort Results By'>
        <Select className='max-w-xs' defaultSelectedKeys={[sortBy[0].value]} variant='bordered' color='success' labelPlacement='outside'>
          {sortBy.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarSortBy;
