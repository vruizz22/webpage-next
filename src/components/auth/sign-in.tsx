import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button type="submit">Signin with GitHub</button>

      <button
        type="submit"
        onClick={async () => {
          'use server';
          await signIn('google');
        }}
      >
        {' '}
        Signin with Google
      </button>
    </form>
  );
}
