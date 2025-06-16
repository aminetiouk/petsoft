import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundHeader from '@/components/background-header';
import PetContextProvider from '@/components/contexts/pet-context-provider';
import SearchContextProvider from '@/components/contexts/search-context-provider';
import { TPets } from '@/lib/types';

export default async function Layout({ children }: { children: string }) {
  const response = await fetch(
    'https://bytegrad.com/course-assets/projects/petsoft/api/pets'
  );
  if (!response.ok) {
    throw new Error('Could not fetch pets');
  }
  const data: TPets[] = await response.json();
  return (
    <main>
      <BackgroundHeader />

      <div className="flex flex-col min-h-screen max-w-[1050px] mx-auto px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </main>
  );
}
