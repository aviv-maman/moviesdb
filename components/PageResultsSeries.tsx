import CardGeneric from "@/components/CardGeneric";
import { discoverSeries } from "@/lib/api_series_lists";
import PaginationCustom from "./PaginationCustom";

interface PageResultsSeriesProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PageResultsSeries: React.FC<PageResultsSeriesProps> = async ({ searchParams }) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { results, page, total_pages } = (await discoverSeries({ ...(await searchParams), page: currentPage })) || {};

  return (
    <>
      <div className="grid grid-cols-2 items-center justify-center justify-items-center gap-4 sm:grid-cols-4 min-[960px]:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {results?.map((data) => (
          <CardGeneric key={data.id} data={data} />
        ))}
      </div>
      <PaginationCustom page={page} total={total_pages || 1} className="mt-4 flex justify-center align-middle" />
    </>
  );
};

export default PageResultsSeries;
