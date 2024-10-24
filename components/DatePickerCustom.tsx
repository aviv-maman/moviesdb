import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

const DatePickerCustom: React.FC = () => {
  return (
    <div className='my-3 flex flex-col gap-2'>
      <span className='relative block text-sm text-foreground-500'>Release Dates</span>
      <span className='relative mr-3 text-sm font-normal'>From</span>
      <DatePicker
        name='release_date.gte'
        format='dd-MM-yyyy'
        className='w-fit bg-default-50'
        menuClassName='dark:bg-gray-800'
        placeholder='Select Date Start'
      />
      <span className='relative mr-3 text-sm font-normal'>Until</span>
      <DatePicker
        name='release_date.lte'
        format='dd-MM-yyyy'
        className='w-fit bg-default-50'
        menuClassName='dark:bg-gray-800'
        placeholder='Select Date End'
      />
    </div>
  );
};

export default DatePickerCustom;
