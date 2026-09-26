"use client";

import { Tabs } from "@heroui/react";
import type { GetMovieResponse } from "@/lib/api.types";
import DetailRail from "./DetailRail";
import PosterImage from "./PosterImage";

export default function CarouselCredits({ data }: { data: GetMovieResponse["credits"] }) {
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
      <Tabs defaultSelectedKey={groups[0].people.length ? "cast" : "crew"} className="min-w-0 w-full">
        <div className="mb-5 border-b pb-4 pr-24">
          <Tabs.List aria-label="Credits" className="flex w-fit gap-1 bg-transparent p-0">
            {groups.map((group) => (
              <Tabs.Tab
                key={group.id}
                id={group.id}
                className="w-auto min-w-0 rounded-lg px-4 py-2 text-sm font-medium text-muted data-[selected=true]:bg-foreground data-[selected=true]:text-background">
                {group.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </div>
        {groups.map((group) => (
          <Tabs.Panel key={group.id} id={group.id} className="min-w-0 px-0 pt-0">
            {group.people.length ? (
              <DetailRail label={group.label.toLowerCase()} inlineControls>
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
              </DetailRail>
            ) : (
              <p className="flex min-h-64 items-center justify-center rounded-xl border text-sm text-muted">
                No {group.label.toLowerCase()} information available.
              </p>
            )}
          </Tabs.Panel>
        ))}
      </Tabs>
    </section>
  );
}
