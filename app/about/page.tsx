"use client";

import { Avatar, Card, Link, Separator } from "@heroui/react";
import PosterImage from "@/components/PosterImage";

export default function AboutPage() {
  return (
    <main className="flex min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)]">
      <div className="my-5 flex h-fit flex-col rounded-md text-center">
        <p className="py-3 text-center text-3xl font-semibold lg:text-4xl">About</p>
        <div className="flex flex-col gap-5">
          <Card className="mx-5 max-w-[400px]">
            <Card.Header className="justify-between">
              <div className="flex gap-5">
                <Avatar size="md">
                  <Avatar.Image
                    src={
                      "https://media.licdn.com/dms/image/D4D35AQFmIdGOJtiFzg/profile-framedphoto-shrink_800_800/0/1676740112520?e=1716894000&v=beta&t=v1fm6WVtHM5psO_UBYcbybf5f3S_9NCrOcrriy40_tE"
                    }
                    alt="Avatar"
                  />
                  <Avatar.Fallback>U</Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4 className="text-sm font-semibold leading-none text-slate-600">Aviv Maman</h4>
                  <Link
                    href="https://www.linkedin.com/in/aviv-maman-914a95223"
                    className="text-sm tracking-tight text-slate-400"
                    target="_blank"
                    rel="noopener noreferrer">
                    @aviv-maman-914a95223
                    <Link.Icon />
                  </Link>
                </div>
              </div>
            </Card.Header>
            <Separator />
            <Card.Content className="p-3 text-sm text-slate-400">
              <p>
                Full-Stack developer and UI enthusiast. I enjoy working with React and Next.js. Feel Free to contact me.
              </p>
            </Card.Content>
          </Card>

          <Card className="mx-5 mb-5 max-w-[400px]">
            <Card.Header className="flex gap-3">
              <PosterImage alt="MoviesDB Logo" height={40} src="./logo.jpg" width={40} />
              <div className="flex flex-col">
                <p className="text-start text-base">MoviesDB</p>
                <Link
                  href="https://moviesdb-indol.vercel.app"
                  className="text-sm text-slate-500"
                  target="_blank"
                  rel="noopener noreferrer">
                  https://moviesdb-indol.vercel.app
                  <Link.Icon />
                </Link>
              </div>
            </Card.Header>
            <Separator />
            <Card.Content>
              <p>An app to explore movies and series.</p>
            </Card.Content>
            <Separator />
            <Card.Footer>
              <Link href="https://github.com/aviv-maman/moviesdb" target="_blank" rel="noopener noreferrer">
                View source code on GitHub
                <Link.Icon />
              </Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </main>
  );
}
