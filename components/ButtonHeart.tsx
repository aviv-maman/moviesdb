'use client';

import { Button } from '@heroui/react';
import { toast } from 'sonner';
import { Heart, HeartFilled } from '@/assets/icons';
import { useProfile } from '@/context/ProfileContext';
import { getFavorites, toggleFavorite } from '@/lib/api_account';

type ButtonHeartPageProps = {
  mediaId: number;
};

const ButtonHeart: React.FC<ButtonHeartPageProps> = ({ mediaId }) => {
  const { dispatch, state } = useProfile();

  const handleFavorite = async () => {
    if (!state.supabase_profile?.tmdb_account_id || !state.supabase_profile?.tmdb_session_id) return;
    const res = await toggleFavorite({
      account_id: state.supabase_profile?.tmdb_account_id,
      session_id: state.supabase_profile?.tmdb_session_id,
      media_type: 'movie',
      media_id: mediaId,
      favorite: state.favorites['movie'].includes(mediaId) ? false : true,
    });
    if (!res.success) {
      toast.error('An error was occurred');
      return;
    }
    toast.success(
      state.favorites['movie'].includes(mediaId) ? 'Item was removed from favorites' : 'Item was added to favorites',
    );
    dispatch({ type: 'toggled_favorite_item', payload: { value: { media_type: 'movie', id: mediaId } } });
    const favRes = await getFavorites({
      account_id: state.supabase_profile?.tmdb_account_id,
      session_id: state.supabase_profile?.tmdb_session_id,
      media_type: 'movie',
      revalidate: 0,
    });
    if (!favRes.results) return;
    dispatch({
      type: 'changed_favorite_movie',
      payload: { value: favRes.results.map((item) => item.id) },
    });
  };

  return (
    <Button
      isIconOnly
      size='sm'
      aria-label='Like'
      isDisabled={!state.supabase_profile?.tmdb_session_id}
      onClick={handleFavorite}>
      {state.favorites['movie'].includes(mediaId) ? <HeartFilled className='size-5' /> : <Heart className='size-5' />}
    </Button>
  );
};

export default ButtonHeart;
