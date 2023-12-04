'use client';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { IconDots, IconHeart, IconHeartFilled, IconList, IconStarFilled } from '@tabler/icons-react';
import { useProfile } from '@/context/ProfileContext';
import { getFavorites, toggleFavorite } from '@/lib/api_account';

interface CarouselDropdownProps {
  className?: HTMLElement['className'];
  mediaId: number;
  mediaType: 'movie' | 'tv';
}

const CarouselDropdown: React.FC<CarouselDropdownProps> = ({ className, mediaId, mediaType }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

  const { dispatch, state } = useProfile();

  const handleFavorite = async () => {
    if (!state.supabase_profile?.tmdb_account_id || !state.supabase_profile?.tmdb_session_id) return;
    const res = await toggleFavorite({
      account_id: state.supabase_profile?.tmdb_account_id,
      session_id: state.supabase_profile?.tmdb_session_id,
      media_type: mediaType,
      media_id: mediaId,
      favorite: state.favorites[mediaType].includes(mediaId) ? false : true,
    });
    if (!res.success) return;
    dispatch({ type: 'toggled_favorite_item', payload: { value: { media_type: mediaType, id: mediaId } } });
    const favRes = await getFavorites({
      account_id: state.supabase_profile?.tmdb_account_id,
      session_id: state.supabase_profile?.tmdb_session_id,
      media_type: mediaType,
      revalidate: 0,
    });
    if (!favRes.results) return;
    dispatch({
      type: mediaType === 'movie' ? 'changed_favorite_movie' : 'changed_favorite_tv',
      payload: { value: favRes.results.map((item) => item.id) },
    });
  };

  return (
    <Dropdown className={className}>
      <DropdownTrigger className='absolute top-1 left-1'>
        <button className='rounded-lg bg-default-300 hover:bg-current'>
          <IconDots className='text-xl text-default-500 pointer-events-none flex-shrink-0' />
        </button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
        <DropdownItem key='list' startContent={<IconList className={iconClasses} size={18} />}>
          Add to watch list
        </DropdownItem>
        <DropdownItem
          key='favorites'
          startContent={
            state.favorites[mediaType].includes(mediaId) ? (
              <IconHeart className={iconClasses} size={18} />
            ) : (
              <IconHeartFilled className={iconClasses} size={18} />
            )
          }
          onClick={handleFavorite}
        >
          {state.favorites[mediaType].includes(mediaId) ? 'Remove from favorites' : 'Add to favorites'}
        </DropdownItem>
        <DropdownItem key='rate' startContent={<IconStarFilled className={iconClasses} size={18} />}>
          Rate
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CarouselDropdown;
