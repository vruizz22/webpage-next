'use client';
import { useSearchParams } from 'next/navigation';
import { signIn } from '@/auth';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        action={async () => {
          'use server';
          await signIn('email', { email });
        }}
      >
        <button type="submit">Reenviar email de verificación</button>
      </form>
    </div>
  );
};

export default VerifyEmailPage;
