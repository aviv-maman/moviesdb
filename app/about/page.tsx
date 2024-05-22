'use client';

import { Card, CardHeader, CardBody, CardFooter, Avatar, Image, Divider, Link } from '@nextui-org/react';

interface pageProps {}

export default function AboutPage(props: pageProps) {
  return (
    <main className='flex justify-center min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)] w-full'>
      <div className='flex flex-col text-center rounded-md h-fit my-5'>
        <p className='text-3xl lg:text-4xl text-center font-semibold py-3'>About</p>
        <div className='flex flex-col gap-5'>
          <Card className='max-w-[400px] mx-5'>
            <CardHeader className='justify-between'>
              <div className='flex gap-5'>
                <Avatar
                  isBordered
                  radius='full'
                  size='md'
                  src='https://media.licdn.com/dms/image/D4D35AQFmIdGOJtiFzg/profile-framedphoto-shrink_800_800/0/1676740112520?e=1716894000&v=beta&t=v1fm6WVtHM5psO_UBYcbybf5f3S_9NCrOcrriy40_tE'
                />
                <div className='flex flex-col gap-1 items-start justify-center'>
                  <h4 className='text-small font-semibold leading-none text-default-600'>Aviv Maman</h4>
                  <Link
                    isExternal
                    showAnchorIcon
                    href='https://www.linkedin.com/in/aviv-maman-914a95223'
                    className='text-small tracking-tight text-default-400'>
                    @aviv-maman-914a95223
                  </Link>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className='p-3 text-small text-default-400'>
              <p>Full-Stack developer and UI enthusiast. I enjoy working with React and Next.js. Feel Free to contact me.</p>
            </CardBody>
          </Card>

          <Card className='max-w-[400px] mx-5 mb-5'>
            <CardHeader className='flex gap-3'>
              <Image alt='MoviesDB Logo' height={40} radius='sm' src='./logo.jpg' width={40} />
              <div className='flex flex-col'>
                <p className='text-md text-start'>MoviesDB</p>
                <Link isExternal showAnchorIcon href='https://moviesdb-indol.vercel.app' className='text-small text-default-500'>
                  https://moviesdb-indol.vercel.app
                </Link>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>An app to explore movies and series.</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link isExternal showAnchorIcon href='https://github.com/aviv-maman/moviesdb'>
                View source code on GitHub
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
