import { type FC } from 'react';
import { Accordion, AccordionItem, Select, SelectItem } from '@nextui-org/react';
import { SORT_BY } from '@/lib/data/search_filters';

interface SidebarSortByProps {}

const SidebarSortBy: FC<SidebarSortByProps> = ({}) => {
  return (
    <Accordion variant='bordered'>
      <AccordionItem key='sort-by' aria-label='Sort' title='Sort' subtitle='Sort Results By' classNames={{ title: 'text-md' }}>
        <Select
          name='sort_by'
          label='Select sorting option'
          aria-label='sort selection'
          selectionMode='single'
          className='max-w-xs mt-4 mb-2'
          defaultSelectedKeys={[SORT_BY[0].value]}
          variant='bordered'
          color='success'
          labelPlacement='outside'
          scrollShadowProps={{ hideScrollBar: false, offset: 15 }}
        >
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
