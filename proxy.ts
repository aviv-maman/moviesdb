import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";
import { getSupabaseConfig } from "@/utils/supabase/config";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  try {
    const { url, anonKey } = getSupabaseConfig();
    const supabase = createServerClient<Database>(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          // Preserve earlier cookie writes and cache headers if setAll runs again.
          const previousResponse = response;
          response = NextResponse.next({ request });
          for (const cookie of previousResponse.cookies.getAll()) {
            response.cookies.set(cookie);
          }
          for (const header of ["cache-control", "expires", "pragma"]) {
            const value = previousResponse.headers.get(header);
            if (value) response.headers.set(header, value);
          }

          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
          for (const [name, value] of Object.entries(headers)) {
            response.headers.set(name, value);
          }
        },
      },
    });

    // Validate the user and refresh the session before rendering.
    await supabase.auth.getUser();
  } catch {
    // Preserve the existing fallback when Supabase is unavailable or not configured.
  }

  return response;
}
