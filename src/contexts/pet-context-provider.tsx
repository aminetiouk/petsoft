'use client';

import { addPet, editPet } from '@/actions/actions';
import { TPets } from '@/lib/types';
import { createContext, useOptimistic, useState } from 'react';
import { toast } from 'sonner';

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
  data,
  children
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find(pet => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleAddNewPet = async (newPet: Omit<TPets, 'id'>) => {
    // setPets(prev => [
    //   ...prev,
    //   {
    //     id: Date.now().toString(),
    //     ...newPet
    //   }
    // ]);

    // await addPet(newPet);
    const error = await addPet(formData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (
    petId: string,
    newPetData: Omit<TPets, 'id'>
  ) => {
    const error = await editPet(selectedPet?.id, formData);
    if (error) {
      toast.warning(error.message);
      return;
    }
    // setPets(prev =>
    //   prev.map(pet => {
    //     if (pet.id === petId) {
    //       return {
    //         id: petId,
    //         ...newPetData
    //       };
    //     }
    //     return pet;
    //   })
    // );
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
        handleEditPet
      }}
    >
      {children}
    </petContext.Provider>
  );
}
