import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { CreateTmdbSessionIdResponse, TmdbProfile } from '@/lib/api.types';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createClient();
  const sessionOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.TMDB_ACCESS_AUTH_TOKEN ? `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` : '',
    },
  };
  const accountOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_ACCESS_AUTH_TOKEN ? `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` : '',
    },
  };
  try {
    const cookieStore = await cookies();
    const tmdb_request_token =
      cookieStore.get('tmdb_request_token')?.value || requestUrl.searchParams.get('request_token');
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?request_token=${tmdb_request_token}`,
      sessionOptions,
    );
    if (!res.ok) throw new Error(`Error creating TMDB session: ${res.statusText}`);
    const sessionData: CreateTmdbSessionIdResponse = await res.json();
    const res2 = await fetch(
      `https://api.themoviedb.org/3/account?api_key=${process.env.TMDB_API_KEY}&session_id=${sessionData?.session_id}`,
      accountOptions,
    );
    if (!res2.ok) throw new Error(`Error creating TMDB session: ${res2.statusText}`);
    const accountData: TmdbProfile = await res2.json();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('profiles')
      .update({
        tmdb_session_id: sessionData.session_id,
        tmdb_account_id: accountData.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user?.id as string);
    if (error) {
      console.log('Supabase handleLinkAccount', error);
      throw new Error(error.message);
    }
    return NextResponse.redirect(`${requestUrl.origin}/profile`);
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
