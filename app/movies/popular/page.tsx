import PageResultsMovies from "@/components/PageResultsMovies";
import SidebarMenu from "@/components/SidebarMenu";

export default async function PopularMoviesPage({ searchParams }: PageProps<"/movies/popular">) {
  return (
    <main className="catalog-layout animate-in m-auto block min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)] min-[960px]:flex">
      <SidebarMenu />
      <div className="mx-auto min-h-0 max-w-7xl justify-center p-4 min-[960px]:flex-1 min-[960px]:overflow-y-auto">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Movies</h1>
        <PageResultsMovies searchParams={searchParams} />
      </div>
    </main>
  );
}
