import { Pet } from '../../generated/prisma';

export type TPetEssentials = Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>;
