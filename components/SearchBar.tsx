'use client';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchSelect from './SearchSelect';
import SearchAutoComplete from './SearchAutoComplete';
import ButtonCustom from './ButtonCustom';
import { Input } from '@nextui-org/react';
import { IconFilterSearch } from '@tabler/icons-react';
import { LANGUAGES, SEARCH_TYPES } from '@/lib/data/search_filters';
import { type FilterOptions as FormState } from '@/lib/api_search';

const SearchNavbar: React.FC = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const handleFilter = async (prevState: FormState, formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    const defaultParams: FormState & { [key: string]: string } = { media_type: 'multi', language: 'English' };
    for (const [key, value] of Object(formData.entries())) {
      const stringKey = String(key);
      if (value !== '' && value !== defaultParams[stringKey]) {
        if (key === 'language') formData.set(key, LANGUAGES.find((item) => item.label === value)?.value || value);
        params.set(key, key === 'language' ? formData.get('language') : value);
      } else {
        params.delete(key);
      }
    }
    push(`/search?${params.toString()}`);
    return { ...prevState };
  };

  const initialState: FormState = { media_type: 'multi', query: searchParams.get('query') || '', language: searchParams.get('language') || 'en-US' };
  const [formState, formAction] = useFormState(handleFilter, initialState);
  const [mediaType, setMediaType] = useState(formState.media_type);

  useEffect(() => {
    if (searchParams.get('media_type') === 'movie' || searchParams.get('media_type') === 'tv' || searchParams.get('media_type') === 'person')
      setMediaType((prevState) => searchParams.get('media_type') as 'multi' | 'movie' | 'tv' | 'person');
  }, []);

  return (
    <header className='sticky top-[65px] border-b w-full md:text-sm bg-slate-100 dark:bg-[#0d0d0d] px-1 z-10'>
      <form id='search-filter' action={formAction} className='flex items-center w-full justify-between'>
        <div className='flex w-full'>
          <SearchSelect
            name='media_type'
            label='Content Type'
            items={SEARCH_TYPES}
            setMediaType={setMediaType}
            defaultValue={searchParams.get('media_type')}
          />
          <SearchAutoComplete name='language' label='Language' items={LANGUAGES} defaultValue={searchParams.get('language')} />
          {(mediaType === 'movie' || mediaType === 'tv') && (
            <Input
              id='year'
              name='year'
              label='Year'
              placeholder='YYYY'
              size='sm'
              variant='faded'
              type='number'
              min={1885}
              max={new Date().getFullYear() + 100}
              classNames={{ base: 'max-w-[4rem]', input: '[&::-webkit-inner-spin-button]:appearance-none' }}
            />
          )}
        </div>
        <ButtonCustom
          type='submit'
          isIconOnly
          size='sm'
          className='text-secondary-500 bg-secondary-200 dark:bg-secondary-300 dark:text-secondary-700 justify-self-end'
          variant='ghost'
          startContent={<IconFilterSearch size={18} />}
        />
      </form>
    </header>
  );
};

export default SearchNavbar;
