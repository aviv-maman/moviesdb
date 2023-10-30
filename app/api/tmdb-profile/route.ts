import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';
import type { TmdbProfile } from '@/lib/api.types';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const accountOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
  };
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: supabaseProfile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id as string)
      .single();
    if (error) {
      console.log('Supabase handleLinkAccount', error);
      throw new Error(error.message);
    }
    const res = await fetch(
      `https://api.themoviedb.org/3/account?api_key=${process.env.TMDB_API_KEY}&session_id=${supabaseProfile?.tmdb_session_id}`,
      accountOptions
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
