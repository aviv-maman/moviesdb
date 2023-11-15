'use client';
import { type FC } from 'react';
import ButtonCustom from './ButtonCustom';
import { IconSearch } from '@tabler/icons-react';
import { useForm } from '@/context/FormContext';

interface SearchButtonProps {}

const SearchButton: FC<SearchButtonProps> = ({}) => {
  const { state } = useForm();

  const keywords = state.keywords.map((item) => item.value).join(' ');

  return (
    <ButtonCustom
      label='Search'
      className='mt-4'
      variant='faded'
      startContent={keywords ? undefined : <IconSearch size={18} />}
      //   type='submit'
    />
  );
};

export default SearchButton;
