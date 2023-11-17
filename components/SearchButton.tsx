import { type FC } from 'react';
import ButtonCustom from './ButtonCustom';
import { IconSearch } from '@tabler/icons-react';

interface SearchButtonProps {}

const SearchButton: FC<SearchButtonProps> = ({}) => {
  return <ButtonCustom type='submit' label='Search' className='mt-4' variant='faded' startContent={<IconSearch size={18} />} />;
};

export default SearchButton;
