'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { toast } from 'sonner';
import { Dots, Heart, HeartFilled, Movie } from '@/assets/icons';
import { useProfile } from '@/context/ProfileContext';
import { getFavorites, toggleFavorite } from '@/lib/api_account';

interface CarouselDropdownProps {
  className?: HTMLElement['className'];
  mediaId: number;
  mediaType: 'movie' | 'tv';
  href: string;
}

const CarouselDropdown: React.FC<CarouselDropdownProps> = ({ className, mediaId, mediaType, href }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none size-[18px]';

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
    if (!res.success) {
      toast.error('An error was occurred');
      return;
    }
    toast.success(
      state.favorites['movie'].includes(mediaId) ? 'Item was removed from favorites' : 'Item was added to favorites',
    );
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
    <>
      <Dropdown className={className}>
        <DropdownTrigger>
          <button className='absolute left-1 top-1 rounded-lg bg-default-300 hover:bg-current'>
            <Dots className='pointer-events-none text-xl text-default-500' />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          variant='faded'
          aria-label='Dropdown menu with icons'
          disabledKeys={state.supabase_profile?.tmdb_session_id ? undefined : ['list', 'favorites', 'rate']}>
          <DropdownItem key='details' href={href} startContent={<Movie className={iconClasses} />}>
            View details
          </DropdownItem>
          <DropdownItem
            key='favorites'
            startContent={
              state.favorites[mediaType].includes(mediaId) ? (
                <HeartFilled className={iconClasses} />
              ) : (
                <Heart className={iconClasses} />
              )
            }
            onPress={handleFavorite}>
            {state.favorites[mediaType].includes(mediaId) ? 'Remove from favorites' : 'Add to favorites'}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default CarouselDropdown;
