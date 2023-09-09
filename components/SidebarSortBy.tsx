'use client';

import { type FC } from 'react';
import { Accordion, AccordionItem, Select, SelectItem } from '@nextui-org/react';
import { useForm } from '@/context/FormContext';

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

  const { dispatch } = useForm();

  const handleSortBy = (value: string) => {
    dispatch({ type: 'sort_by', payload: { value } });
  };

  return (
    <Accordion defaultExpandedKeys={['sort-by']} variant='bordered'>
      <AccordionItem key='sort-by' aria-label='Accordion of sort by' title='Sort' subtitle='Sort Results By'>
        <Select
          label='Select sorting option'
          aria-label='sort selection'
          className='max-w-xs my-4'
          defaultSelectedKeys={[sortBy[0].value]}
          variant='bordered'
          color='success'
          labelPlacement='outside'
          scrollShadowProps={{ hideScrollBar: false, offset: 15 }}
          onChange={(e) => handleSortBy(e.target.value)}>
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
