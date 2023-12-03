'use client';
import { useState } from 'react';
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
    for (const [key, value] of Object(formData.entries())) {
      if (value !== '') {
        if (key === 'language' && value === 'en-US') continue;
        if (key === 'media_type' && value === 'multi') continue;
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    push(`/search?${params.toString()}`);
    return { ...prevState };
  };

  const initialState: FormState = { media_type: 'multi', query: searchParams.get('query') || '', language: 'en-US' };
  const [formState, formAction] = useFormState(handleFilter, initialState);
  const [mediaType, setMediaType] = useState(formState.media_type);

  return (
    <header className='sticky top-[65px] border-b w-full md:text-sm bg-zinc-200 dark:bg-zinc-600'>
      <form id='search-filter' action={formAction} className='flex items-center'>
        <SearchSelect name='media_type' label='Content Type' items={SEARCH_TYPES} setMediaType={setMediaType} />
        <SearchAutoComplete name='language' label='Language' items={LANGUAGES} />
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
        <ButtonCustom
          type='submit'
          label='Apply'
          className='text-secondary-500 bg-secondary-200 dark:bg-secondary-300 dark:text-secondary-700'
          variant='ghost'
          startContent={<IconFilterSearch size={18} />}
        />
      </form>
    </header>
  );
};

export default SearchNavbar;
