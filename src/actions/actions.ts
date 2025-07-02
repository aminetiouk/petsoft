'use server';

import prisma from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { TPetEssentials } from '@/lib/types';
import { Pet } from '../../generated/prisma';

export async function addPet(pet: TPetEssentials) {
  await sleep(2000);
  try {
    await prisma.pet.create({
      data: pet
    });
  } catch {
    return {
      message: 'could not add pet'
    };
  }
  revalidatePath('app', 'layout');
}

export async function editPet(petId: Pet['id'], newPetData: TPetEssentials) {
  await sleep(2000);
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
