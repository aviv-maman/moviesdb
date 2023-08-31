import FeatureCard from '@/components/FeatureCard';
import SidebarMenu from '@/components/SidebarMenu';
import { features } from '@/lib/features-data';
import { type FC } from 'react';

interface PopularMoviesProps {}

const PopularMovies: FC<PopularMoviesProps> = ({}) => {
  return (
    <div className='animate-in w-full sm:block md:flex'>
      <SidebarMenu />
      <div className='p-4'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Movies</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {features.map(({ title, subtitle, icon, isLinkingRequired }) => (
            <FeatureCard key={title} title={title} subtitle={subtitle} icon={icon} isLinkingRequired={isLinkingRequired} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
