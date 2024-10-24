'use server';

const SearchResultCardSkeleton: React.FC = () => {
  return (
    <div
      role='status'
      className='flex animate-pulse border border-gray-200 bg-gray-100 shadow dark:border-gray-700 dark:bg-gray-900'>
      <div className='flex h-[168px] w-28 items-center justify-center bg-gray-300 dark:bg-gray-700 md:h-[336px] md:w-56'>
        <svg
          className='h-10 w-10 text-gray-200 dark:text-gray-600'
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
          <div className='mb-4 flex justify-between md:mb-4'>
            <div>
              <div className='mb-2 h-4 w-40 rounded-full bg-gray-300 dark:bg-gray-700 md:w-80'></div>
              <div className='mb-2 h-4 w-40 rounded-full bg-gray-300 dark:bg-gray-700 md:hidden'></div>
              <div className='h-3 w-20 rounded-full bg-gray-300 dark:bg-gray-700'></div>
            </div>
            <div className='mb-4 h-8 w-8 rounded bg-gray-300 dark:bg-gray-700'></div>
          </div>
          <div className='mb-2 h-3 rounded-full bg-gray-300 dark:bg-gray-700'></div>
          <div className='mb-2 h-3 rounded-full bg-gray-300 dark:bg-gray-700'></div>
          <div className='h-3 rounded-full bg-gray-300 dark:bg-gray-700'></div>
        </div>

        <div className='my-1 hidden flex-wrap gap-1 p-6 md:flex'>
          <div className='mb-2 h-5 w-16 rounded-full bg-gray-300 dark:bg-gray-700'></div>
          <div className='mb-2 h-5 w-16 rounded-full bg-gray-300 dark:bg-gray-700'></div>
          <div className='h-5 w-16 rounded-full bg-gray-300 dark:bg-gray-700'></div>
        </div>
      </div>

      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default SearchResultCardSkeleton;
