import Branding from '@/components/branding';
import ContentBlock from '@/components/content-block';
import PetDetails from '@/components/pet-details';
import PetList from '@/components/pet-list';
import SearchForm from '@/components/search-form';
import Stats from '@/components/stats';

export default function Dashboard() {
  return (
    <main>
      <div className="flex justify-between items-center py-8 text-black/70">
        <Branding />

        <Stats />
      </div>
      <div className="grid grid-cols-3 grid-rows-[45px_1fr] gap-4 h-[600px]">
        <div className="row-span-1 row-start-1 col-span-1 col-start-1">
          <SearchForm />
        </div>
        <div className='row-start-2 row-span-full col-span-1 col-start-1'>
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>
        <div className='col-span-full col-start-2 row-start-1 row-span-full'>
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
