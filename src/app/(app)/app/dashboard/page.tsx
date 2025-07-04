import Branding from '@/components/branding';
import ContentBlock from '@/components/content-block';
import PetDetails from '@/components/pet-details';
import PetList from '@/components/pet-list';
import PetButton from '@/components/pet-button';
import SearchForm from '@/components/search-form';
import Stats from '@/components/stats';

export default function Page() {
  return (
    <main className="py-8">
      <div className="flex justify-between items-center pb-8  text-black/70">
        <Branding />

        <Stats />
      </div>
      <div className="grid md:grid-cols-3 grid-rows-[45px_300px_400px] md:grid-rows-[45px_1fr] gap-4 md:h-[600px]">
        <div className="md:row-span-1 md:row-start-1 md:col-span-1 md:col-start-1">
          <SearchForm />
        </div>
        <div className="relative md:row-start-2 md:row-span-full md:col-span-1 md:col-start-1">
          <ContentBlock>
            <PetList />
            <div className="absolute right-5 bottom-5">
              <PetButton actionType="add" />
            </div>
          </ContentBlock>
        </div>
        <div className="md:col-span-full md:col-start-2 md:row-start-1 md:row-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
