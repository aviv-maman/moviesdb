import { type FC } from 'react';
import { DateRangePicker } from 'rsuite';

interface DatePickerCustomProps {}

const DatePickerCustom: FC<DatePickerCustomProps> = ({}) => {
  return (
    <div className='my-3'>
      <span className='relative text-medium text-foreground-500 block mb-3'>Release Dates</span>
      <span className='relative text-small mr-3'>Period</span>
      <DateRangePicker format='dd-MM-yyyy' className='bg-default-50' menuClassName='dark:bg-gray-800' placeholder='Select Date Range' />
    </div>
  );
};

export default DatePickerCustom;
