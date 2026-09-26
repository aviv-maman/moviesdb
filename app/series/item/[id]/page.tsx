import { notFound } from "next/navigation";
import MediaDetails from "@/components/MediaDetails";
import { getSeriesById } from "@/lib/api_series";

export default async function SeriesPage({ params }: PageProps<"/series/item/[id]">) {
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();
  const { series, error } = await getSeriesById({
    series_id: id,
    append_to_response: "credits,external_ids,videos,recommendations",
  });
  if (error) throw error;
  if (!series?.id) notFound();
  const firstYear = series.first_air_date?.slice(0, 4) || "";
  const lastYear = series.last_air_date?.slice(0, 4);
  const year =
    firstYear && series.status === "Returning Series"
      ? `${firstYear} – present`
      : firstYear && lastYear && firstYear !== lastYear
        ? `${firstYear} – ${lastYear}`
        : firstYear;
  const duration = [
    series.number_of_seasons
      ? series.number_of_seasons + (series.number_of_seasons === 1 ? " season" : " seasons")
      : "",
    series.number_of_episodes
      ? series.number_of_episodes + (series.number_of_episodes === 1 ? " episode" : " episodes")
      : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return <MediaDetails mediaType="tv" item={series} title={series.name} year={year} duration={duration} />;
}
