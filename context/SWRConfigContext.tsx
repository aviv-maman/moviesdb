'use client';

import { Toaster } from 'sonner';
import { SWRConfig } from 'swr';

interface SWRConfigContextProps {
  children: React.ReactNode;
}

export const SWRConfigProvider: React.FC<SWRConfigContextProps> = ({ children }) => {
  const globalFetcher = async ({ url, options }: { url: string; options?: RequestInit }) => {
    const res = await fetch(url, options);
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.', { cause: res });
      // Attach extra info to the error object.
      // error.info = await res.json();

      const errorWithInfo = { ...error, statusCode: res.status, statusText: res.statusText };
      throw errorWithInfo;
    }

    return await res.json();
  };

  const genericFetcher = ({ url, options }: { url: string; options?: RequestInit }) =>
    fetch(url, options).then((res) => res.json());

  return (
    <SWRConfig
      value={{
        fetcher: globalFetcher,
        onError: (error, key) => {
          console.error('SWR onError:', error);
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,
            // or show a notification UI.
            // console.error(error);
          }
        },
      }}>
      <Toaster richColors />
      {children}
    </SWRConfig>
  );
};
