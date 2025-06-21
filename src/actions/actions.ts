"use server"

import prisma from "@/lib/prisma"
import { TPets } from "@/lib/types";

export async function addPet(pet: Omit<TPets, 'id'> ) {
  await prisma.pet.create({
    data: pet,
  });
}