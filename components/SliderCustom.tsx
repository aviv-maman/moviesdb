import { type FC } from 'react';

interface SliderCustomProps {}

const SliderCustom: FC<SliderCustomProps> = ({}) => {
  return (
    <div className='h-6 w-full'>
      <input type='range' min='0' max='10' className='w-full cursor-grab' />
      <div className='w-full flex justify-between text-xs'>
        {Array.from(Array(11).keys()).map((item) => (
          <span key={item} className='text-gray-400 dark:text-gray-500'>
            {item < 10 ? `0${item}` : item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SliderCustom;
