'use server';
import { signIn } from '@/lib/auth';
import ButtonCustom from '@/components/ButtonCustom';
import { Link } from '@nextui-org/react';
import { headers } from 'next/headers';

export default async function Login() {
  const headersInstance = headers();
  const protocol = headersInstance.get('x-forwarded-proto');
  const host = headersInstance.get('host');
  const themeClasses = 'dark:bg-emerald-700 dark:text-white dark:border-green-300 bg-emerald-400 text-gray-600 border-green-600';

  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <form action={signIn} className='flex-1 flex flex-col w-full justify-center gap-2 text-foreground'>
        <label className='text-md' htmlFor='email'>
          Email
        </label>
        <input className='rounded-md px-4 py-2 bg-inherit border mb-6' name='email' placeholder='you@example.com' />
        <label className='text-md' htmlFor='password'>
          Password
        </label>
        <input className='rounded-md px-4 py-2 bg-inherit border mb-6' type='password' name='password' placeholder='••••••' />
        <>
          <ButtonCustom type='submit' label='Sign In' radius='none' className={`${themeClasses} rounded border`} />
          <p className='text-sm text-center'>
            Don&apos;t have an account?
            <ButtonCustom
              className={`ml-1 border bg-teal-300 dark:bg-teal-600`}
              as={Link}
              href={`${protocol}://${host}/register`}
              variant='shadow'
              size='sm'
            >
              Sign Up Now
            </ButtonCustom>
          </p>
        </>
      </form>
    </div>
  );
}
