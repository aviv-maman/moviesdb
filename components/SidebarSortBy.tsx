'use client';

import { type FC } from 'react';
import { Accordion, AccordionItem, Select, SelectItem } from '@nextui-org/react';
import { useForm } from '@/context/FormContext';
import { SORT_BY } from '@/lib/data/search_filters';

interface SidebarSortByProps {}

const SidebarSortBy: FC<SidebarSortByProps> = ({}) => {
  const { dispatch, state } = useForm();

  const handleSortBy = (value: string) => {
    dispatch({ type: 'sort_by', payload: { value } });
  };

  return (
    <Accordion variant='bordered'>
      <AccordionItem key='sort-by' aria-label='Accordion of sort by' title='Sort' subtitle='Sort Results By'>
        <Select
          label='Select sorting option'
          aria-label='sort selection'
          selectionMode='single'
          className='max-w-xs mt-4 mb-2'
          defaultSelectedKeys={[SORT_BY[0].value]}
          variant='bordered'
          color='success'
          labelPlacement='outside'
          selectedKeys={[state.sort_by]}
          scrollShadowProps={{ hideScrollBar: false, offset: 15 }}
          onChange={(e) => {
            if (e.target.value === '') return handleSortBy(state.sort_by);
            handleSortBy(e.target.value);
          }}>
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
