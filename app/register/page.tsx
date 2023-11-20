'use server';
import { signUp } from '@/lib/auth';
import ButtonCustom from '@/components/ButtonCustom';
import { Link } from '@nextui-org/react';
import { headers } from 'next/headers';

export default async function Register() {
  const headersInstance = headers();
  const protocol = headersInstance.get('x-forwarded-proto');
  const host = headersInstance.get('host');

  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <form action={signUp} className='flex-1 flex flex-col w-full justify-center gap-2 text-foreground'>
        <label className='text-md' htmlFor='email'>
          Email
        </label>
        <input className='rounded-md px-4 py-2 bg-inherit border mb-6' name='email' placeholder='you@example.com' />
        <label className='text-md' htmlFor='password'>
          Password
        </label>
        <input className='rounded-md px-4 py-2 bg-inherit border mb-6' type='password' name='password' placeholder='••••••' />
        <>
          <ButtonCustom type='submit' label='Sign Up' radius='none' className={`rounded border`} />
          <p className='text-sm text-center'>
            Already have an account?
            <ButtonCustom className='ml-1' as={Link} href={`${protocol}://${host}/login`} variant='faded' size='sm'>
              Login Now
            </ButtonCustom>
          </p>
        </>
      </form>
    </div>
  );
}
