'use client';

import { addPet, deletePet, editPet } from '@/actions/actions';
import { createContext, useOptimistic, useState } from 'react';
import { toast } from 'sonner';
import { Pet } from '../../generated/prisma';
import { TPetEssentials } from '@/lib/types';

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};
type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet['id'] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: Pet['id']) => void;
  handleCheckoutPet: (id: Pet['id']) => Promise<void>;
  handleAddNewPet: (newPet: TPetEssentials) => Promise<void>;
  handleEditPet: (
    petId: Pet['id'],
    newPetData: TPetEssentials
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
            if (pet.id === payload.petId) {
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

  const handleAddNewPet = async (newPet: TPetEssentials) => {
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
    petId: Pet['id'],
    newPetData: TPetEssentials
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

  const handleCheckoutPet = async (petId: Pet['id']) => {
    setOptimisticPets({ action: 'delete', payload: petId });
    const error = await deletePet(petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: Pet['id']) => {
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
