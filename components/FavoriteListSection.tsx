'use client';
import { Suspense, useEffect, type FC } from 'react';
import FavoriteListCardSkeleton from './FavoriteListCardSkeleton';
import type { MovieListResponse, SeriesListResponse } from '@/lib/api.types';
import FavoriteListCard from './FavoriteListCard';
import LoadPageBtn from './LoadPageBtn';
import { useProfile } from '@/context/ProfileContext';
import type { Profile } from '@/lib/database.types';
import type { User } from '@supabase/supabase-js';

interface FavoriteListSectionProps {
  favoritesMovies?: MovieListResponse | SeriesListResponse;
  favoritesSeries?: MovieListResponse | SeriesListResponse;
  profile: Profile | null;
  user?: User | null;
}

const FavoriteListSection: FC<FavoriteListSectionProps> = ({ favoritesMovies, favoritesSeries, profile, user }) => {
  const SKELETON_LENGTH = 10;
  const { dispatch, state } = useProfile();

  useEffect(() => {
    dispatch({ type: 'changed_active_favlist', payload: { value: 'movie' } });
    dispatch({ type: 'changed_supabase_profile', payload: { value: profile } });
    dispatch({ type: 'changed_supabase_user', payload: { value: user ? user : null } });
  }, [dispatch, profile, user]);

  return (
    <div className='p-4 max-w-7xl mx-auto w-full'>
      <Suspense
        fallback={
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>{`Favorite ${
              state.active_favlist === 'movie' ? 'Movies' : 'Series'
            }`}</h1>
            <span className='shadow animate-pulse h-4 bg-gray-300 rounded-lg w-16 dark:bg-gray-600 ml-1'></span>
          </div>
        }>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>{`Favorite ${
            state.active_favlist === 'movie' ? 'Movies' : 'Series'
          }`}</h1>
          <span className='p-1 ml-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-md'>
            {state.active_favlist === 'movie' ? favoritesMovies?.total_results : favoritesSeries?.total_results} items
          </span>
        </div>
      </Suspense>
      <Suspense
        fallback={
          <>
            {Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
              <FavoriteListCardSkeleton key={index} />
            ))}
          </>
        }>
        {state.active_favlist === 'movie'
          ? favoritesMovies?.results?.map((item) => <FavoriteListCard key={item.id} data={item} />)
          : favoritesSeries?.results?.map((item) => <FavoriteListCard key={item.id} data={item} />)}

        {((favoritesMovies && favoritesMovies?.total_pages > 1) || (favoritesSeries && favoritesSeries?.total_pages > 1)) && (
          <div className='flex justify-between w-full'>
            <LoadPageBtn label='Back' totalPages={state.active_favlist === 'movie' ? favoritesMovies?.total_pages : favoritesSeries?.total_pages} />
            <LoadPageBtn label='Next' totalPages={state.active_favlist === 'movie' ? favoritesMovies?.total_pages : favoritesSeries?.total_pages} />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default FavoriteListSection;
