'use client';

import { TPets } from '@/lib/types';
import { createContext, useState } from 'react';

type PetContextProviderProps = {
  data: TPets[];
  children: React.ReactNode;
};
type TPetContext = {
  pets: TPets[];
  setPets: (pets: TPets[]) => void;
  selectedPetId: string | null;
  selectedPet: TPets | undefined;
  handleChangeSelectedPetId: (id: string) => void;
  numberOfPets: number;
};

export const petContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children
}: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find(pet => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  return (
    <petContext.Provider
      value={{
        pets,
        setPets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        numberOfPets
      }}
    >
      {children}
    </petContext.Provider>
  );
}
