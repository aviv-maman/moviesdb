import { Suspense, type ReactNode } from 'react';
import '../styles/globals.css';
import Header from '@/components/Header';
import { createClient } from '@/utils/supabase/server';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import type { Viewport, Metadata } from 'next';
import { getProfile } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Rotten Popcorn',
  description: "Search for movies and TV shows to watch, and keep track of what you've watched.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();

  const user = (await supabase.auth.getSession())?.data?.session?.user;

  // const { profile, error: profileError } = await getProfile();

  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={`${inter.className} h-full min-h-screen text-foreground bg-background antialiased animate-in`}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <Header user={user} />
          </Suspense>
          <main className='pb-6 sm:px-6 lg:px-8'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
