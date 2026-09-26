import { notFound } from "next/navigation";
import MediaDetails from "@/components/MediaDetails";
import { getMovieById } from "@/lib/api_movies";

export default async function MoviePage({ params }: PageProps<"/movies/item/[id]">) {
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();
  const { movie, error } = await getMovieById({
    movie_id: id,
    append_to_response: "credits,external_ids,videos,recommendations",
  });
  if (error) throw error;
  if (!movie?.id) notFound();
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const duration = movie.runtime
    ? [hours ? `${hours}h` : "", minutes ? `${minutes}m` : ""].filter(Boolean).join(" ")
    : "";

  return (
    <MediaDetails
      mediaType="movie"
      item={movie}
      title={movie.title}
      year={movie.release_date?.slice(0, 4) || ""}
      duration={duration}
    />
  );
}
