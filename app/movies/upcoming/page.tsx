import PageResultsMoviesByType from "@/components/PageResultsMoviesByType";
import SidebarMenu from "@/components/SidebarMenu";

export default async function UpcomingMoviesPage({ searchParams }: PageProps<"/movies/upcoming">) {
  return (
    <main className="catalog-layout animate-in m-auto block min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)] min-[960px]:flex">
      <SidebarMenu />
      <div className="mx-auto min-h-0 max-w-7xl justify-center p-4 min-[960px]:flex-1 min-[960px]:overflow-y-auto">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Series</h1>
        <PageResultsMoviesByType searchParams={searchParams} type="upcoming" />
      </div>
    </main>
  );
}
