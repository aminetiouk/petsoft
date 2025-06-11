import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
        <Image src="/logo.svg" width={50} height={50} alt="PetSoft logo" />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $199.
        </p>
        <div>
          <Button variant="outline">Button</Button>
          <Button variant="outline">Button</Button>
        </div>
      </div>
    </main>
  );
}
