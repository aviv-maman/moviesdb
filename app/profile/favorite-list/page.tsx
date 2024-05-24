'use server';
import FavoriteListMenu from '@/components/FavoriteListMenu';
import FavoriteListSection from '@/components/FavoriteListSection';
import { createClient } from '@/utils/supabase/server';
import { getFavorites } from '@/lib/api_account';
import { getProfile } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface SearchProps {
  searchParams?: {
    media_type?: 'movie' | 'tv';
    page?: number;
  };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const supabase = createClient();
  const user = (await supabase.auth.getSession())?.data?.session?.user;
  if (!user) redirect('/login'); // This route can only be accessed by authenticated users.
  const { profile } = await getProfile(user?.id as string);
  const favoritesMovies = await getFavorites({
    account_id: profile?.tmdb_account_id || 0,
    session_id: profile?.tmdb_session_id || '',
    media_type: 'movie',
  });
  const favoritesSeries = await getFavorites({
    account_id: profile?.tmdb_account_id || 0,
    session_id: profile?.tmdb_session_id || '',
    media_type: 'tv',
  });

  return (
    <main className='animate-in w-full min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)] sm:flex p-4'>
      <FavoriteListMenu />
      <FavoriteListSection favoritesMovies={favoritesMovies} favoritesSeries={favoritesSeries} profile={profile} user={user} />
    </main>
  );
};

export default Search;
