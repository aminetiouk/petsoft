import Logo from './logo';
import Link from 'next/link';

const routes = [
  {
    label: 'Dashboard',
    path: '/account'
  },
  {
    label: 'Account',
    path: '/dashboard'
  }
];

export default function AppHeader() {
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
                className="block bg-brown/90 py-2 px-4 rounded-full text-peach tracking-wider hover:text-white focus:text-white transition hover:bg-falu-red"
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
