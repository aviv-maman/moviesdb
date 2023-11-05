import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const client = createClient(req);

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await client.supabase.auth.getSession();

  return res;
}
