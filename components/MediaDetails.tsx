import Link from "next/link";
import type { GetMovieResponse, GetSeriesResponse } from "@/lib/api.types";
import ButtonHeart from "./ButtonHeart";
import CardGeneric from "./CardGeneric";
import CarouselCredits from "./CarouselCredits";
import CarouselRail from "./CarouselRail";
import PosterImage from "./PosterImage";

type MediaDetailsProps = {
  mediaType: "movie" | "tv";
  item: GetMovieResponse | GetSeriesResponse;
  title: string;
  year: string;
  duration: string;
};

export default function MediaDetails({ mediaType, item, title, year, duration }: MediaDetailsProps) {
  const videos =
    item.videos?.results
      ?.filter((video) => ["YouTube", "Vimeo"].includes(video.site))
      .toSorted((a, b) => Number(b.type === "Trailer") - Number(a.type === "Trailer"))
      .slice(0, 8) ?? [];
  const recommendations = item.recommendations?.results ?? [];
  const mediaPath = mediaType === "movie" ? "movies" : "series";
  const rating = item.vote_average > 0 ? item.vote_average.toFixed(1) : null;
  return (
    <main className="min-w-0">
      <section
        aria-label={`${title} overview`}
        className="relative isolate overflow-hidden bg-zinc-950 pb-20 text-white sm:pb-28">
        {item.backdrop_path && (
          <div
            aria-hidden="true"
            data-detail-backdrop
            className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path})`,
            }}
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950/95 via-zinc-950/85 to-zinc-950/55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-background/60 to-background sm:h-40"
        />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <Link
            href={`/${mediaPath}/popular`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <span aria-hidden="true">←</span> Explore {mediaPath}
          </Link>
          <div className="grid grid-cols-[112px_minmax(0,1fr)] items-start gap-x-5 gap-y-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-x-8 md:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-10">
            <PosterImage
              src={item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : undefined}
              alt={`${title} poster`}
              width={342}
              height={513}
              className="aspect-[2/3] h-auto w-full rounded-xl border border-white/15 object-cover shadow-xl md:row-span-2"
            />
            <div className="min-w-0 md:pt-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                {mediaType === "movie" ? "Movie" : "TV series"}
              </p>
              <h1 className="break-words text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/70">
                {year && <span>{year}</span>}
                {duration && <span>{duration}</span>}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs text-white/85">
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {rating && (
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                    <span aria-hidden="true" className="text-amber-400">
                      ★
                    </span>
                    <span className="font-semibold">
                      {rating}
                      <span className="text-xs font-normal text-white/55"> / 10</span>
                    </span>
                  </div>
                )}
                <ButtonHeart mediaId={item.id} mediaType={mediaType} />
                {videos.length > 0 && (
                  <a
                    href="#detail-videos"
                    className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-white/85">
                    Trailers
                  </a>
                )}
              </div>
            </div>
            <div className="col-span-2 min-w-0 pb-3 md:col-span-1 md:col-start-2">
              {item.tagline && <p className="mb-4 text-sm italic text-white/60 sm:text-base">{item.tagline}</p>}
              <h2 className="mb-2 text-sm font-semibold">Overview</h2>
              <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">
                {item.overview || "An overview is not available yet."}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/60 sm:text-sm">
                {item.spoken_languages?.length > 0 && (
                  <span>{item.spoken_languages.map((language) => language.english_name).join(", ")}</span>
                )}
                {item.external_ids?.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${item.external_ids.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 underline-offset-4 hover:underline">
                    IMDb ↗
                  </a>
                )}
                {item.homepage && (
                  <a
                    href={item.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 underline-offset-4 hover:underline">
                    Official website ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative mx-auto -mt-5 max-w-7xl space-y-10 px-4 pb-8 sm:space-y-12 sm:px-6 sm:pb-10">
        <CarouselCredits data={item.credits} />
        {videos.length > 0 && (
          <section id="detail-videos" className="scroll-mt-24" aria-labelledby="detail-videos-heading">
            <h2 id="detail-videos-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
              Trailers & videos
            </h2>
            <CarouselRail label="videos" wide>
              {videos.map((video) => (
                <div key={video.id} className="min-w-0 snap-start">
                  <iframe
                    loading="lazy"
                    className="aspect-video w-full rounded-xl border bg-black"
                    src={
                      video.site === "YouTube"
                        ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.key)}`
                        : `https://player.vimeo.com/video/${encodeURIComponent(video.key)}`
                    }
                    title={video.name}
                    allow="encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                  <h3 className="mt-3 line-clamp-2 text-sm font-medium">{video.name}</h3>
                  <p className="mt-1 text-xs text-muted">{video.type}</p>
                </div>
              ))}
            </CarouselRail>
          </section>
        )}
        {recommendations.length > 0 && (
          <section aria-labelledby="detail-recommendations-heading">
            <h2 id="detail-recommendations-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
              More like this
            </h2>
            <CarouselRail label="recommendations">
              {recommendations.map((recommendation) => (
                <div key={recommendation.id} className="min-w-0 snap-start">
                  <CardGeneric data={recommendation} variant="catalog" />
                </div>
              ))}
            </CarouselRail>
          </section>
        )}
      </div>
    </main>
  );
}
