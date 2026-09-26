import { discoverSeries } from "@/lib/api_series_lists";
import CatalogResults from "./CatalogResults";

interface PageResultsSeriesProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PageResultsSeries: React.FC<PageResultsSeriesProps> = async ({ searchParams }) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { results, page, total_pages } = (await discoverSeries({ ...(await searchParams), page: currentPage })) || {};

  return <CatalogResults results={results} page={page} total={total_pages || 1} />;
};

export default PageResultsSeries;
