import AutForm from '@/components/aut-form'
import H1 from '@/components/h1'
import Link from 'next/link'

export default function Login() {
  return (
    <main className='space-y-2'>
      <H1 className='mb-4'>Log In</H1>

      <AutForm />

      <p>
        No account yet?{" "}
        <Link href='/signup' className='mt-6 text-sm text-zinc-500'>
        Sign up
        </Link>
      </p>
    </main>
  )
}
