'use server';

import prisma from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function addPet(pet) {
  await sleep(2000);
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return {
      message: 'could not add pet'
    };
  }
  revalidatePath('app', 'layout');
}

export async function editPet(petId, newPetData) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: petId
      },
      data: newPetData,
    });
  } catch (error) {
    return {
      message: 'Could not edit pet'
    };
  }

  revalidatePath('app', 'layout');
}

export async function deletePet(petId) {
  await sleep(2000);
  try {
    await prisma.pet.delete({
      where: {
        id: petId
      }
    });
  } catch (error) {
    return {
      message: 'Could not delete Pet'
    };
  }

  revalidatePath('app', 'layout');
}
