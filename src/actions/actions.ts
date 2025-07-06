'use server';

import prisma from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { PetEssentials } from '@/lib/types';
import { Pet } from '../../generated/prisma';
import { petFormSchema } from '@/lib/validations';

export async function addPet(pet: PetEssentials) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: 'Invalid Pet data'
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data
    });
  } catch {
    return {
      message: 'could not add pet'
    };
  }
  revalidatePath('app', 'layout');
}

export async function editPet(petId: Pet['id'], newPetData: PetEssentials) {
  await sleep(1000);
  try {
    await prisma.pet.update({
      where: {
        id: petId
      },
      data: newPetData
    });
  } catch {
    return {
      message: 'Could not edit pet'
    };
  }

  revalidatePath('app', 'layout');
}

export async function deletePet(petId: Pet['id']) {
  await sleep(2000);
  try {
    await prisma.pet.delete({
      where: {
        id: petId
      }
    });
  } catch {
    return {
      message: 'Could not delete Pet'
    };
  }

  revalidatePath('app', 'layout');
}
