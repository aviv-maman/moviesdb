'use server';

import { Suspense } from 'react';

interface SearchResultBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  color?: string;
  textSize?: 'text-xs' | 'text-sm' | 'text-md' | 'text-lg' | 'text-xl' | 'text-2xl';
}

const SearchResultBadge: React.FC<SearchResultBadgeProps> = async ({ label, color, textSize = 'text-xs', ...rest }) => {
  const className = `whitespace-nowrap rounded-full px-2.5 py-0.5 ${textSize} ${rest.className}`;

  const badgeColors: { [key: string]: string } = {
    blue: 'bg-blue-200 text-blue-600 dark:bg-blue-600 dark:text-blue-100',
    purple: 'bg-purple-200 text-purple-600 dark:bg-purple-600 dark:text-purple-100',
    red: 'bg-red-200 text-red-600 dark:bg-red-600 dark:text-red-100',
    green: 'bg-green-200 text-green-600 dark:bg-green-600 dark:text-green-100',
    yellow: 'bg-yellow-200 text-yellow-600 dark:bg-yellow-600 dark:text-yellow-100',
    indigo: 'bg-indigo-200 text-indigo-600 dark:bg-indigo-600 dark:text-indigo-100',
    pink: 'bg-pink-200 text-pink-600 dark:bg-pink-600 dark:text-pink-100',
    orange: 'bg-orange-200 text-orange-600 dark:bg-orange-600 dark:text-orange-100',
    lime: 'bg-lime-200 text-lime-600 dark:bg-lime-600 dark:text-lime-100',
    amber: 'bg-amber-200 text-amber-600 dark:bg-amber-600 dark:text-amber-100',
    fuchsia: 'bg-fuchsia-200 text-fuchsia-600 dark:bg-fuchsia-600 dark:text-fuchsia-100',
    cyan: 'bg-cyan-200 text-cyan-600 dark:bg-cyan-600 dark:text-cyan-100',
    sky: 'bg-sky-200 text-sky-600 dark:bg-sky-600 dark:text-sky-100',
    violet: 'bg-violet-200 text-violet-600 dark:bg-violet-600 dark:text-violet-100',
    emerald: 'bg-emerald-200 text-emerald-600 dark:bg-emerald-600 dark:text-emerald-100',
    teal: 'bg-teal-200 text-teal-600 dark:bg-teal-600 dark:text-teal-100',
    gray: 'bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300',
  };

  if (color) {
    return (
      <Suspense>
        <span {...rest} className={`${className} ${badgeColors[color]}`}>
          {label}
        </span>
      </Suspense>
    );
  }

  return (
    <Suspense>
      <span {...rest} className={`${className} ${badgeColors['gray']}`}>
        {label}
      </span>
    </Suspense>
  );
};

export default SearchResultBadge;
