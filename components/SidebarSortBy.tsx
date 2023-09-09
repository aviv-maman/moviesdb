'use client';

import { type FC } from 'react';
import { Accordion, AccordionItem, Select, SelectItem } from '@nextui-org/react';
import { useForm } from '@/context/FormContext';
import { SORT_BY } from '@/lib/data/search_filters';

interface SidebarSortByProps {}

const SidebarSortBy: FC<SidebarSortByProps> = ({}) => {
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
          selectionMode='single'
          className='max-w-xs my-4'
          defaultSelectedKeys={[SORT_BY[0].value]}
          variant='bordered'
          color='success'
          labelPlacement='outside'
          scrollShadowProps={{ hideScrollBar: false, offset: 15 }}
          onChange={(e) => handleSortBy(e.target.value)}>
          {SORT_BY.map((option) => (
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
