"use server"

import prisma from "@/lib/prisma"
import { TPets } from "@/lib/types";

export async function addPet(formData) {
  await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      age: parseInt(formData.get("age")),
      imageUrl: formData.get("imageUrl") || '/placeholder.svg',
      notes: formData.get("notes"),
    },
  });
}