import { pets } from '@/lib/types';
import Image from 'next/image';

type PetListProps = {
  pets: pets[];
};

export default function PetList({ pets }: PetListProps) {
  return (
    <ul className="bg-white border-b border-black[.08]">
      {pets.map(pet => (
        <li key={pet.id}>
          <button className="flex items-center h-[70px] px-5 text-base w-full gap-3 hover:bg-amber-50 focus:bg-amber-50 transition">
            <Image
              src={pet.imageUrl}
              width={45}
              height={45}
              alt="pet placeholder"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
