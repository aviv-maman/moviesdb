'use server';
import { signIn } from '@/lib/auth';
import ButtonCustom from '@/components/ButtonCustom';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default async function Login() {
  const themeClasses = 'dark:bg-emerald-700 dark:text-white dark:border-green-300 bg-emerald-400 text-gray-600 border-green-600';
  const inputClasses =
    'text-sm block w-full px-4 py-2 mt-2 text-green-500 dark:text-green-300 placeholder-green-500 dark:placeholder-green-300 bg-gray-100 border border-gray-300 dark:border-zinc-500 rounded-lg dark:bg-zinc-700 focus:border-lime-400 dark:focus:border-lime-400 focus:ring-lime-400 focus:outline-none focus:ring focus:ring-opacity-40';

  return (
    <main className='animate-in flex justify-center min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)]'>
      <div
        className='hidden bg-cover lg:block lg:w-2/3'
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
        }}>
        <div className='flex items-center h-full px-20 bg-gray-900 bg-opacity-40'>
          <div>
            <h2 className='text-2xl font-bold text-white sm:text-3xl'>Start exploring thousands of movies and series</h2>
            <p className='max-w-xl mt-3 text-gray-300'>Create an account and get access to all features, free of charge.</p>
          </div>
        </div>
      </div>

      <div className='flex pt-16 w-full px-2 lg:w-2/6 m-4'>
        <div className='flex-1'>
          <div className='text-center'>
            <div className='flex justify-center mx-auto'>
              <Logo className='h-20' />
            </div>
            <p className='mt-3 text-gray-500 dark:text-gray-300'>Sign in to access your account</p>
          </div>

          <div className='mt-8'>
            <form action={signIn} className='mt-8'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                  Email Address
                </label>
                <input type='email' name='email' id='email' placeholder='Enter your email' className={inputClasses} required />
              </div>

              <div className='mt-6'>
                <div className='flex justify-between mb-2'>
                  <label htmlFor='password' className='text-sm text-gray-600 dark:text-gray-200'>
                    Password
                  </label>
                  {/* <Link
                    href='/forgot-password'
                    className='text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline'
                  >
                    Forgot password?
                  </Link> */}
                </div>
                <input type='password' name='password' id='password' placeholder='Enter your password' className={inputClasses} required />
              </div>

              <div className='mt-6 flex justify-center'>
                <ButtonCustom type='submit' label='Sign In' radius='none' className={`${themeClasses} rounded border`} />
              </div>
            </form>

            <p className='mt-6 text-sm text-center text-gray-400'>
              Don&#x27;t have an account yet?{' '}
              <Link href='/register' className='text-blue-500 focus:outline-none focus:underline hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
