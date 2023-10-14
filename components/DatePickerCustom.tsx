import { type FC } from 'react';
import { DatePicker } from 'rsuite';

interface DatePickerCustomProps {}

const DatePickerCustom: FC<DatePickerCustomProps> = ({}) => {
  return (
    <div className='my-3 flex flex-col gap-2'>
      <span className='relative text-medium text-foreground-500 block font-normal'>Release Dates</span>
      <span className='relative text-small mr-3'>From</span>
      <DatePicker format='dd-MM-yyyy' className='bg-default-50 w-fit' menuClassName='dark:bg-gray-800' placeholder='Select Date Start' />
      <span className='relative text-small mr-3'>Until</span>
      <DatePicker format='dd-MM-yyyy' className='bg-default-50 w-fit' menuClassName='dark:bg-gray-800' placeholder='Select Date End' />
    </div>
  );
};

export default DatePickerCustom;
