import { Link } from "@heroui/react";
import ButtonHeart from "@/components/ButtonHeart";
import Carousel from "@/components/Carousel";
import CarouselCredits from "@/components/CarouselCredits";
import PosterImage from "@/components/PosterImage";
import RatingProgress from "@/components/RatingProgress";
import SearchResultBadge from "@/components/SearchResultBadge";
import { getMovieById } from "@/lib/api_movies";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}
const MoviePage: React.FC<MoviePageProps> = async ({ params }) => {
  const id = Number((await params).id);
  const { movie } = await getMovieById({
    movie_id: id,
    append_to_response: "credits,external_ids,videos,recommendations",
  });
  const ratingColors: {
    [key: number]: "danger" | "warning" | "success" | "default";
  } = {
    0: "danger",
    1: "warning",
    2: "success",
    3: "default",
  };
  const movieItem = {
    ...movie,
    backdrop_path: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`,
    poster_path:
      movie && "poster_path" in movie ? `https://image.tmdb.org/t/p/w342${movie?.poster_path}` : "./no-image.svg",
    genres: movie?.genres?.map((genre) => genre.name),
    spoken_languages: movie?.spoken_languages?.map((lang) => lang.english_name),
    runtime: `${Math.floor((movie?.runtime || 0) / 60)}h ${(movie?.runtime || 0) % 60}m`,
    ratingColor:
      ratingColors[
        movie && "vote_average" in movie
          ? Math.floor(movie?.vote_average) <= 4
            ? 0
            : Math.floor(movie?.vote_average) <= 7
              ? 1
              : 2
          : 3
      ],
    vote_average: movie && "vote_average" in movie ? movie?.vote_average * 10 : 0,
  };
  return (
    <main className="animate-in m-auto block min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)]">
      <div className="mx-auto justify-center">
        <div
          style={{
            backgroundImage: `url(${movieItem?.backdrop_path})`,
          }}
          className="relative size-full bg-cover bg-no-repeat">
          <div className="overflow-hidden bg-white/20 bg-fixed dark:bg-black/50">
            <div className="block p-8 md:flex">
              <PosterImage
                src={movieItem?.poster_path}
                alt={movieItem?.title || "Poster"}
                width={342}
                height={513}
                style={{
                  minWidth: 342,
                  height: 513,
                }}
                wrapperClassName="w-full flex"
                className={`${movieItem?.poster_path === "./no-image.svg" && "p-4"} rounded-md`}
              />
              <div className="flex flex-col gap-y-2 pt-2 sm:mx-3 sm:pt-0">
                <h1 className="text-4xl font-bold text-black dark:text-white sm:text-6xl">{movieItem?.title}</h1>
                <div className="flex items-center gap-x-1">
                  <SearchResultBadge
                    label={`${movieItem?.release_date?.slice(0, 4)} • ${movieItem?.runtime}`}
                    className="h-fit rounded-md font-sans font-semibold"
                    color="cyan"
                    textSize="text-md"
                  />
                  <div className="flex flex-wrap gap-1">
                    {movieItem?.genres?.map((genre) => (
                      <SearchResultBadge
                        key={genre}
                        label={genre}
                        className="rounded-md"
                        color="indigo"
                        textSize="text-sm"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-x-1">
                  <RatingProgress
                    aria-label="Vote average"
                    size="md"
                    value={movieItem?.vote_average}
                    color={movieItem?.ratingColor}
                    valueLabel={Math.ceil(movieItem?.vote_average)}
                  />
                  <ButtonHeart mediaId={id} />
                  {movieItem?.external_ids?.imdb_id && (
                    <Link
                      href={`https://www.imdb.com/title/${movieItem?.external_ids?.imdb_id}`}
                      className="rounded-md border-1 border-gray-700 bg-yellow-400 px-2 py-1 text-gray-900 hover:bg-yellow-400"
                      target="_blank"
                      rel="noopener noreferrer">
                      IMDB
                    </Link>
                  )}
                  {movieItem?.homepage && (
                    <Link
                      href={movieItem?.homepage}
                      className="rounded-md border-1 border-gray-700 bg-yellow-400 px-2 py-1 text-gray-900 hover:bg-yellow-400"
                      target="_blank"
                      rel="noopener noreferrer">
                      Home
                    </Link>
                  )}
                </div>
                <div className="flex gap-x-1">
                  {movieItem?.spoken_languages?.map((lang) => (
                    <SearchResultBadge
                      key={lang}
                      label={lang}
                      className="size-fit rounded-md border border-neutral-400 bg-neutral-200 text-black dark:bg-neutral-700"
                      textSize="text-sm"
                    />
                  ))}
                </div>
                <p className="flex max-w-5xl text-wrap rounded-sm p-1 pl-2 text-base leading-snug text-black backdrop-blur-3xl dark:text-white">
                  {movieItem?.overview}
                </p>
              </div>
            </div>

            <div className="flex w-full justify-center">
              <div className="mb-8 flex max-w-[192px] flex-col items-center justify-center gap-7 text-xs min-[389px]:max-w-[368px] sm:max-w-[564px] md:max-w-[596px] min-[825px]:max-w-[786px] lg:max-w-[968px] xl:max-w-[1178px]">
                <div className="relative flex w-full gap-4 overflow-x-auto py-6">
                  {movieItem?.videos?.results?.slice(0, 8).map((video) => (
                    <iframe
                      id={video.id}
                      key={video.id}
                      className="sm:h-[320px] sm:min-w-[540px]"
                      src={`https://www.${video.site}.com/embed/${video.key}?autoplay=1&origin=https://moviesdb-indol.vercel.app`}
                      title={video.name}
                      height={320}
                      width={640}
                      itemType="text/html"
                    />
                  ))}
                </div>
                <h1 className="px-6 text-2xl font-bold backdrop-blur-md sm:px-0">Credits</h1>
                <CarouselCredits data={movieItem?.credits} />
                <h1 className="px-6 text-2xl font-bold backdrop-blur-md sm:px-0">Recommendations</h1>
                <Carousel data={[movieItem?.recommendations]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default MoviePage;
