'use client';
import Image from 'next/image';
import Link from 'next/link';

import NavItems from './NavItems';
import MobileNav from './MobileNav';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  async function logoutHandle() {
    await signOut({ redirect: true });
  }

  return (
    <>
      <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
          <Link href="/" className="w-36">
            <Image
              src="/assets/images/logo.svg"
              width={128}
              height={38}
              alt="Evently logo"
            />
          </Link>

          {session && (
            <nav className="md:flex-between hidden w-full max-w-xs">
              <NavItems />
            </nav>
          )}

          <div className="flex w-32 justify-end gap-3">
            {session && <button onClick={logoutHandle}>Logout</button>}
            {!session && (
              <button className="rounded-lg bg-blue-400 p-2">
                <Link href="/login">Login</Link>
              </button>
            )}
          </div>
        </div>
      </header>
      ;
    </>
  );
};

export default Header;
