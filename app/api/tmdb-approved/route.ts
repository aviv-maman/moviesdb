import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';
import type { CreateTmdbSessionIdResponse } from '@/lib/api.types';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const sessionOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
  };
  try {
    const tmdb_request_token =
      cookies().get('tmdb_request_token')?.value || requestUrl.searchParams.get('request_token');
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?request_token=${tmdb_request_token}`,
      sessionOptions
    );
    if (res.ok) {
      const sessionData: CreateTmdbSessionIdResponse = await res.json();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('profiles')
        .update({
          tmdb_session_id: sessionData.session_id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id as string);
      if (error) {
        console.log('Supabase handleLinkAccount', error);
        throw new Error(error.message);
      }
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
