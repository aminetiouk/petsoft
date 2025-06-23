import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundHeader from '@/components/background-header';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import prisma from '@/lib/prisma';

export default async function Layout({ children }: { children: string }) {
  
  const pets = await prisma.pet.findMany();
  console.log('rendering...')
  return (
    <main>
      <BackgroundHeader />

      <div className="flex flex-col min-h-screen max-w-[1050px] mx-auto px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </main>
  );
}
