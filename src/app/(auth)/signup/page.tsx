import AutForm from '@/components/aut-form';
import H1 from '@/components/h1';
import Link from 'next/link';

export default function Login() {
  return (
    <main className="space-y-2">
      <H1 className="mb-4">Sign up</H1>

      <AutForm auth='Sign up' />

      <p>
        Already have an account?{' '}
        <Link href="/login" className="mt-6 text-sm text-zinc-500">
          Log in
        </Link>
      </p>
    </main>
  );
}
