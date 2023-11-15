import { type FC } from 'react';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface DatePickerCustomProps {}

const DatePickerCustom: FC<DatePickerCustomProps> = ({}) => {
  return (
    <div className='my-3 flex flex-col gap-2'>
      <span className='relative text-foreground-500 block text-sm'>Release Dates</span>
      <span className='relative font-normal text-sm mr-3'>From</span>
      <DatePicker
        name='release_date.gte'
        format='dd-MM-yyyy'
        className='bg-default-50 w-fit'
        menuClassName='dark:bg-gray-800'
        placeholder='Select Date Start'
      />
      <span className='relative font-normal text-sm mr-3'>Until</span>
      <DatePicker
        name='release_date.lte'
        format='dd-MM-yyyy'
        className='bg-default-50 w-fit'
        menuClassName='dark:bg-gray-800'
        placeholder='Select Date End'
      />
    </div>
  );
};

export default DatePickerCustom;
