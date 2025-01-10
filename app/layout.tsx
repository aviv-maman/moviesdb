import type { Metadata, Viewport } from 'next';
import { Providers } from '@/app/providers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { MovieItem, SeriesItem } from '@/lib/api.types';
import { getAllFavoritesUsingRecursion } from '@/lib/api_account';
import { getProfile } from '@/lib/auth';
import { GeistSans } from '@/lib/fonts';
import '@/styles/globals.css';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'MoviesDB',
  description: "Search for movies and TV shows to watch, and keep track of what you've watched.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser())?.data?.user;
  const { profile } = await getProfile(user?.id as string);
  let favMovies, favSeries;
  if (user) {
    if (profile && profile?.tmdb_account_id && profile?.tmdb_session_id) {
      try {
        const [favoriteMovies, favoriteSeries] = await Promise.all([
          getAllFavoritesUsingRecursion({
            account_id: profile?.tmdb_account_id,
            session_id: profile?.tmdb_session_id,
            media_type: 'movie',
          }),
          getAllFavoritesUsingRecursion({
            account_id: profile?.tmdb_account_id,
            session_id: profile?.tmdb_session_id,
            media_type: 'tv',
          }),
        ]);
        favMovies = (favoriteMovies.results || []) as MovieItem[];
        favSeries = (favoriteSeries.results || []) as SeriesItem[];
      } catch (error) {
        // console.error(error);
      }
    }
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={`${GeistSans.className} min-h-screen bg-background text-foreground antialiased`}>
        <Providers>
          <Header user={user} profile={profile} favMovies={favMovies} favSeries={favSeries} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
