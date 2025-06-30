'use client';

import { addPet, deletePet, editPet } from '@/actions/actions';
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
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddNewPet: (newPet: Omit<TPets, 'id'>) => Promise<void>;
  handleEditPet: (
    petId: string,
    newPetData: Omit<TPets, 'id'>
  ) => Promise<void>;
};

export const petContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case 'add':
          return [...state, { ...payload, id: Math.random().toString() }];
        case 'edit':
          return state.map(pet => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            }
            return pet;
          });
        case 'delete':
          return state.filter(pet => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find(pet => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleAddNewPet = async (newPet: Omit<TPets, 'id'>) => {
    setOptimisticPets({ action: 'add', payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
    // setPets(prev => [
    //   ...prev,
    //   {
    //     id: Date.now().toString(),
    //     ...newPet
    //   }
    // ]);

    // await addPet(newPet);
  };

  const handleEditPet = async (
    petId: string,
    newPetData: Omit<TPets, 'id'>
  ) => {
    setOptimisticPets({ action: 'edit', payload: { petId, newPetData } });
    const error = await editPet(petId, newPetData);
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

  const handleCheckoutPet = async (petId: string) => {
    await deletePet({ action: 'delete', payload: petId });
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  return (
    <petContext.Provider
      value={{
        pets: optimisticPets,
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
