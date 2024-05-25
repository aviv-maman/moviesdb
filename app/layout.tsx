import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import type { Viewport, Metadata } from 'next';
import { getProfile } from '@/lib/auth';
import { getAllFavoritesUsingRecursion } from '@/lib/api_account';
import type { MovieItem, SeriesItem } from '@/lib/api.types';

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

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
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
      <body className={`${inter.className} min-h-screen text-foreground bg-background antialiased`}>
        <Providers>
          <Header user={user} profile={profile} favMovies={favMovies} favSeries={favSeries} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
