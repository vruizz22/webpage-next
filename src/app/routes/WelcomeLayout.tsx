//import { Head } from '@inertiajs/react';
import { User } from '@/types';
import Header from '@/components/Header';

interface Auth {
  user: User;
}

export default function WelcomeLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: Auth;
}) {
  return (
    <>
      {/*<Head title="Welcome" />*/}
      <div className="background">
        <div className="relative flex min-h-screen flex-col items-center justify-center">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <Header auth={auth} />
            <main className="mt-6">{children}</main>
            <footer className="py-16 text-center text-sm text-custom-light-beige">
              © 2024 CPU. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
