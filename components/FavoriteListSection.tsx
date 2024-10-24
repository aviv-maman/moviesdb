'use client';

import type { User } from '@supabase/supabase-js';
import { Suspense, useEffect } from 'react';
import FavoriteListCard from './FavoriteListCard';
import FavoriteListCardSkeleton from './FavoriteListCardSkeleton';
import LoadPageBtn from './LoadPageBtn';
import { useProfile } from '@/context/ProfileContext';
import type { MovieListResponse, SeriesListResponse } from '@/lib/api.types';
import type { Profile } from '@/lib/database.types';

interface FavoriteListSectionProps {
  favoritesMovies?: MovieListResponse | SeriesListResponse;
  favoritesSeries?: MovieListResponse | SeriesListResponse;
  profile: Profile | null;
  user?: User | null;
}

const FavoriteListSection: React.FC<FavoriteListSectionProps> = ({
  favoritesMovies,
  favoritesSeries,
  profile,
  user,
}) => {
  const SKELETON_LENGTH = 10;
  const { dispatch, state } = useProfile();

  useEffect(() => {
    dispatch({ type: 'changed_active_favlist', payload: { value: 'movie' } });
    dispatch({ type: 'changed_supabase_profile', payload: { value: profile } });
    dispatch({ type: 'changed_supabase_user', payload: { value: user ? user : null } });
  }, [dispatch, profile, user]);

  return (
    <div className='mx-auto w-full max-w-7xl p-4'>
      <Suspense
        fallback={
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>{`Favorite ${
              state.active_favlist === 'movie' ? 'Movies' : 'Series'
            }`}</h1>
            <span className='ml-1 h-4 w-16 animate-pulse rounded-lg bg-gray-300 shadow dark:bg-gray-600'></span>
          </div>
        }>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>{`Favorite ${
            state.active_favlist === 'movie' ? 'Movies' : 'Series'
          }`}</h1>
          <span className='ml-1 rounded-md bg-blue-200 p-1 text-xs font-semibold text-blue-800'>
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

        {((favoritesMovies && favoritesMovies?.total_pages > 1) ||
          (favoritesSeries && favoritesSeries?.total_pages > 1)) && (
          <div className='flex w-full justify-between'>
            <LoadPageBtn
              label='Back'
              totalPages={
                state.active_favlist === 'movie' ? favoritesMovies?.total_pages : favoritesSeries?.total_pages
              }
            />
            <LoadPageBtn
              label='Next'
              totalPages={
                state.active_favlist === 'movie' ? favoritesMovies?.total_pages : favoritesSeries?.total_pages
              }
            />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default FavoriteListSection;
