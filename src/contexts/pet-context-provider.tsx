'use client';

import { addPet } from '@/actions/actions';
import { TPets } from '@/lib/types';
import { createContext, useState } from 'react';

type PetContextProviderProps = {
  data: TPets[];
  children: React.ReactNode;
};
type TPetContext = {
  pets: TPets[];
  selectedPetId: string | null;
  selectedPet: TPets | undefined;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  numberOfPets: number;
  handleAddNewPet: (newPet: Omit<TPets, 'id'>) => void;
  handleEditPet: (petId: string, newPetData: Omit<TPets, 'id'>) => void;
};

export const petContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find(pet => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  const handleCheckoutPet = (id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  const handleAddNewPet = async (newPet: Omit<TPets, 'id'>) => {
    // setPets(prev => [
    //   ...prev,
    //   {
    //     id: Date.now().toString(),
    //     ...newPet
    //   }
    // ]);

    await addPet(newPet);
  };

  const handleEditPet = (petId: string, newPetData: Omit<TPets, 'id'>) => {
    setPets(prev =>
      prev.map(pet => {
        if (pet.id === petId) {
          return {
            id: petId,
            ...newPetData
          };
        }
        return pet;
      })
    );
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  return (
    <petContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        numberOfPets,
        handleCheckoutPet,
        handleAddNewPet,
        handleEditPet,
      }}
    >
      {children}
    </petContext.Provider>
  );
}
