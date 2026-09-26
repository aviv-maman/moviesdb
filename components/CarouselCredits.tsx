"use client";

import type { FC } from "react";
import type { GetMovieResponse } from "@/lib/api.types";
import CarouselRail from "./CarouselRail";
import CarouselTabs from "./CarouselTabs";
import PosterImage from "./PosterImage";

interface CarouselCreditsProps {
  data: GetMovieResponse["credits"];
}

const CarouselCredits: FC<CarouselCreditsProps> = ({ data }) => {
  const groups = [
    { id: "cast", label: "Cast", people: data?.cast?.map((person) => ({ ...person, role: person.character })) ?? [] },
    { id: "crew", label: "Crew", people: data?.crew?.map((person) => ({ ...person, role: person.job })) ?? [] },
  ];
  if (groups.every((group) => !group.people.length)) return null;

  return (
    <section aria-labelledby="detail-credits-heading">
      <h2 id="detail-credits-heading" className="mb-5 text-xl font-semibold tracking-tight sm:text-2xl">
        Cast & crew
      </h2>
      <CarouselTabs
        label="Credits"
        defaultSelectedKey={groups[0].people.length ? "cast" : "crew"}
        inlineControls
        items={groups.map((group) => ({
          id: group.id,
          label: group.label,
          content: group.people.length ? (
            <CarouselRail label={group.label.toLowerCase()} inlineControls>
              {group.people.map((person) => (
                <article
                  key={person.credit_id}
                  className="min-w-0 snap-start overflow-hidden rounded-xl border bg-surface">
                  <div className="aspect-[4/5] overflow-hidden bg-default">
                    {person.profile_path ? (
                      <PosterImage
                        src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
                        alt={person.name}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-full items-center justify-center bg-gradient-to-br from-default to-surface text-4xl font-light text-muted">
                        {person.name
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div className="min-h-28 p-3">
                    <h3 className="line-clamp-2 text-sm font-semibold">{person.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{person.role}</p>
                  </div>
                </article>
              ))}
            </CarouselRail>
          ) : (
            <p className="flex min-h-64 items-center justify-center rounded-xl border text-sm text-muted">
              No {group.label.toLowerCase()} information available.
            </p>
          ),
        }))}
      />
    </section>
  );
};

export default CarouselCredits;
