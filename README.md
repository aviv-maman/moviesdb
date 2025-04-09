MoviesDB is a Next.js app to explore movies and series, and get recommendations based on your interests.
![](https://raw.githubusercontent.com/aviv-maman/moviesdb/master/public/preview.jpeg)

## Features

- **Discover New Content:** Discover new movies by browsing through the top rated, most popular, and upcoming movies.
- **Get Recommendations:** Get recommendations based on your favorite list, or any media.
- **Watch Trailers:** Watch trailers of movies and series.
- **Add to Favorite List:** Add movies to your favorites list and keep track of what you want to watch next.

## Built with

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [HeroUI](https://heroui.org)
- [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com)

## Usage

1. Clone the repository

```
git clone https://github.com/aviv-maman/moviesdb
```

2. Rename the `.env.example` file to `.env.local` and fill in the required environment variables according to the next steps.
3. Sign Up on [Supabase](https://supabase.com) and create a new project to get your Supabase URL and Supabase anon key from your Supabase dashboard and add them to `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Sign Up on [TMDB](https://www.themoviedb.org) to get your TMDB API key and TMDB access auth token and add them to `TMDB_API_KEY` and `TMDB_ACCESS_AUTH_TOKEN`

5. Install dependencies

```
npm install
```

6. Run the development server

```
npm run dev
```
