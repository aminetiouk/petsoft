import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/logo';

export default function Home() {
  return (
    <main className="bg-almond min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        height={519}
        width={472}
        alt="screenshot of the software"
      />
      <div>
        <Logo width={35} />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $199.
        </p>
        <div className="mt-10 space-x-4">
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
