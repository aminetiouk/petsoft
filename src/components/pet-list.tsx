'use client';

import { usePetContext, useSearchContext } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const {searchQuery} = useSearchContext();
  const filteredPets = pets.filter(pet => pet.name.toLowerCase().includes(searchQuery));

  return (
    <ul className="bg-white">
      {filteredPets.map(pet => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              'flex items-center h-[70px] px-5 text-base w-full gap-3 border-b border-black[.08] hover:bg-amber-50 focus:bg-amber-50 transition',
              {
                'bg-amber-50': selectedPetId === pet.id
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              width={45}
              height={45}
              alt="pet placeholder"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
