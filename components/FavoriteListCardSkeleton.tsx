'use client';

const FavoriteListCardSkeleton: React.FC = () => {
  return (
    <div role='status' className='border border-gray-200 shadow animate-pulse dark:border-gray-700 flex bg-gray-100 dark:bg-gray-900'>
      <div className='flex items-center justify-center w-28 h-[168px] md:w-56 md:h-[336px] bg-gray-300 dark:bg-gray-700'>
        <svg
          className='w-10 h-10 text-gray-200 dark:text-gray-600'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 16 20'>
          <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z' />
          <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
        </svg>
      </div>
      <div className='flex flex-1 flex-col justify-between'>
        <div className='border-s border-gray-900/10 p-2 sm:border-l-transparent sm:p-6'>
          <div className='flex justify-between mb-4 md:mb-4'>
            <div>
              <div className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-40 mb-2 md:w-80'></div>
              <div className='h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-40 mb-2 md:hidden'></div>
              <div className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-20'></div>
            </div>
            <div className='bg-gray-300 rounded dark:bg-gray-700 w-8 h-8 mb-4'></div>
          </div>
          <div className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 mb-2'></div>
          <div className='h-3 bg-gray-300 rounded-full dark:bg-gray-700 mb-2'></div>
          <div className='h-3 bg-gray-300 rounded-full dark:bg-gray-700'></div>
        </div>

        <div className='my-1 md:flex flex-wrap gap-1 p-6 hidden'>
          <div className='h-5 w-16 bg-gray-300 rounded-full dark:bg-gray-700 mb-2'></div>
          <div className='h-5 w-16 bg-gray-300 rounded-full dark:bg-gray-700 mb-2'></div>
          <div className='h-5 w-16 bg-gray-300 rounded-full dark:bg-gray-700'></div>
        </div>
      </div>

      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default FavoriteListCardSkeleton;
