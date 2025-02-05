import { NextResponse } from 'next/server';
import type { TmdbProfile } from '@/lib/api.types';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  const accountOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_ACCESS_AUTH_TOKEN ? `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` : '',
    },
    cache: 'no-store',
  };
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data: supabaseProfile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user.id as string)
      .single();
    if (error) {
      console.log('Supabase handleLinkAccount', error);
      throw new Error(error.message);
    }
    const res = await fetch(
      `https://api.themoviedb.org/3/account?api_key=${process.env.TMDB_API_KEY}&session_id=${supabaseProfile?.tmdb_session_id}`,
      accountOptions,
    );
    const data: TmdbProfile = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in handleLinkAccount');
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
    throw error;
  }
}
