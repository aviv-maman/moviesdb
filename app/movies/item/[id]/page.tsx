'use server';

interface MoviePageProps {
  params: { id: string };
}

const MoviePage: React.FC<MoviePageProps> = async ({ params }) => {
  const id = params?.id;

  return (
    <main className='animate-in w-full block min-[960px]:flex m-auto justify-center min-h-fit'>
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>{id}</h1>
      </div>
    </main>
  );
};

export default MoviePage;
