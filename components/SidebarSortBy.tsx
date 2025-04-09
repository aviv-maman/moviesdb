import { Accordion, AccordionItem, Select, SelectItem } from '@heroui/react';
import { SORT_BY } from '@/lib/data/search_filters';

const SidebarSortBy: React.FC = () => {
  return (
    <Accordion variant='bordered' keepContentMounted>
      <AccordionItem
        key='sort-by'
        aria-label='Sort'
        title='Sort'
        subtitle='Sort Results By'
        classNames={{ title: 'text-md' }}>
        <Select
          name='sort_by'
          label='Select sorting option'
          aria-label='sort selection'
          selectionMode='single'
          className='mb-2 mt-4 max-w-xs'
          defaultSelectedKeys={[SORT_BY[0].value]}
          variant='bordered'
          color='success'
          labelPlacement='outside'
          scrollShadowProps={{ hideScrollBar: false, offset: 15 }}>
          {SORT_BY.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarSortBy;
