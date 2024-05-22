'use client';
import { signUp } from '@/lib/auth';
import ButtonCustom from '@/components/ButtonCustom';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';
import { useFormState } from 'react-dom';

type FormState = {
  message?: string;
};

export default function Register() {
  const themeClasses = 'dark:bg-emerald-700 dark:text-white dark:border-green-300 bg-emerald-400 text-gray-600 border-green-600';
  const inputClasses =
    'text-sm block w-full px-4 py-2 mt-2 text-green-500 dark:text-green-300 placeholder-green-500 dark:placeholder-green-300 bg-gray-100 border border-gray-300 dark:border-zinc-500 rounded-lg dark:bg-zinc-700 focus:border-lime-400 dark:focus:border-lime-400 focus:ring-lime-400 focus:outline-none focus:ring focus:ring-opacity-40';

  const onFormSubmission = async (prevState: FormState, formData: FormData) => {
    toast.promise(signUp(formData), {
      loading: 'Loading...',
      success: (data) => {
        return `Check email to continue sign in process`;
      },
      error: 'User authentication failed',
    });
    return { ...prevState };
  };
  const initialState: FormState = { message: '' };
  const [formState, formAction] = useFormState(onFormSubmission, initialState);

  return (
    <main className='animate-in flex justify-center min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)]'>
      <Toaster richColors />
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
            <p className='mt-3 text-gray-500 dark:text-gray-300'>Sign up to enjoy all the features</p>
          </div>

          <div className='mt-8'>
            <form action={formAction} className='mt-8'>
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
                </div>
                <input type='password' name='password' id='password' placeholder='Enter your password' className={inputClasses} required />
              </div>

              <div className='mt-6 flex justify-center'>
                <ButtonCustom type='submit' label='Sign Up' radius='none' className={`${themeClasses} rounded border`} />
              </div>
            </form>

            <p className='mt-6 text-sm text-center text-gray-400'>
              Already have an account?{' '}
              <Link href='/login' className='text-blue-500 focus:outline-none focus:underline hover:underline'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
