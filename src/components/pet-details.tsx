'use client';

import { usePetContext } from '@/lib/hooks';
import Image from 'next/image';
import PetButton from './pet-button';
import { Pet } from '../../generated/prisma';

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className="flex flex-col w-full h-full">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherDetails pet={selectedPet} />
          <PetNote pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type TProps = {
  pet: Pet;
};

const EmptyView = () => {
  return (
    <section className="flex items-center h-full justify-center">
      <p className="font-semibold text-3xl text-black/20">Not pet selected</p>
    </section>
  );
};

const TopBar = ({ pet }: TProps) => {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className="flex items-center px-8 py-5 bg-white border-b border-black/10 ">
      <Image
        src={pet.imageUrl}
        width={75}
        height={75}
        alt="pet image"
        className="rounded-full object-cover w-[75] h-[75]"
      />
      <h2 className="text-3xl font-semibold leading-5 ml-4">{pet.name}</h2>
      <div className="ml-auto space-x-4">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async () => await handleCheckoutPet(pet.id)}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
};

const OtherDetails = ({ pet }: TProps) => {
  return (
    <div className="flex justify-around py-10 px-5">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
      </div>
    </div>
  );
};

const PetNote = ({ pet }: TProps) => {
  return (
    <section className="flex-1 py-5 px-7 mb-8 mx-8 rounded-md bg-white border border-black/10">
      <p>{pet.notes}</p>
    </section>
  );
};
