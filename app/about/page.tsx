'use client';

import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from '@nextui-org/react';

export default function AboutPage() {
  return (
    <main className='flex min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)]'>
      <div className='my-5 flex h-fit flex-col rounded-md text-center'>
        <p className='py-3 text-center text-3xl font-semibold lg:text-4xl'>About</p>
        <div className='flex flex-col gap-5'>
          <Card className='mx-5 max-w-[400px]'>
            <CardHeader className='justify-between'>
              <div className='flex gap-5'>
                <Avatar
                  isBordered
                  radius='full'
                  size='md'
                  src='https://media.licdn.com/dms/image/D4D35AQFmIdGOJtiFzg/profile-framedphoto-shrink_800_800/0/1676740112520?e=1716894000&v=beta&t=v1fm6WVtHM5psO_UBYcbybf5f3S_9NCrOcrriy40_tE'
                />
                <div className='flex flex-col items-start justify-center gap-1'>
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
              <p>
                Full-Stack developer and UI enthusiast. I enjoy working with React and Next.js. Feel Free to contact me.
              </p>
            </CardBody>
          </Card>

          <Card className='mx-5 mb-5 max-w-[400px]'>
            <CardHeader className='flex gap-3'>
              <Image alt='MoviesDB Logo' height={40} radius='sm' src='./logo.jpg' width={40} />
              <div className='flex flex-col'>
                <p className='text-md text-start'>MoviesDB</p>
                <Link
                  isExternal
                  showAnchorIcon
                  href='https://moviesdb-indol.vercel.app'
                  className='text-small text-default-500'>
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
              <Link isExternal showAnchorIcon href='https://github.com/aviv-maman/moviesdb' isBlock>
                View source code on GitHub
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
