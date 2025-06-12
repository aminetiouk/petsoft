'use client';

import { usePathname } from 'next/navigation';
import Logo from './logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const routes = [
  {
    label: 'Dashboard',
    path: '/app/dashboard'
  },
  {
    label: 'Account',
    path: '/app/account'
  }
];

export default function AppHeader() {
  const activePathname = usePathname();
  console.log(activePathname);

  return (
    <header className="flex justify-between items-center py-4 border-b border-falu-red/20">
      <Link href="/">
        <Logo width={40} />
      </Link>
      <nav>
        <ul className="flex gap-x-4">
          {routes.map(route => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  'py-2 px-4 rounded-full text-black/70 tracking-wider hover:text-white hover:bg-brown focus:text-white transition',
                  {
                    'bg-brown/90 text-white': route.path === activePathname
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
