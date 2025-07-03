'use client';

import { usePetContext } from '@/lib/hooks';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import PetFormBtn from './pet-form-btn';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';

type TPetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};

type TPetForm = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: string;
  notes: string;
};

const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 character' }),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: 'Owner name required' })
    .max(100),
  imageUrl: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Image url must be a valid url' })
  ]),
  age: z.coerce.number().int().positive().max(100),
  notes: z.union([z.literal(''), z.string().trim().max(1000)])
});

export default function PetForm({
  actionType,
  onFormSubmission
}: TPetFormProps) {
  const { handleAddNewPet, handleEditPet, selectedPet } = usePetContext();
  const {
    register,
    trigger,
    formState: { errors }
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
  });
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const pet = {
  //     name: formData.get('name') as string,
  //     ownerName: formData.get('ownerName') as string,
  //     imageUrl: (formData.get('imageUrl') as string) || '/placeholder.svg',
  //     age: Number(formData.get('age')),
  //     notes: formData.get('notes') as string
  //   };

  //   if (actionType === 'add') {
  //     handleAddNewPet(pet);
  //   } else if (actionType === 'edit') {
  //     handleEditPet(selectedPet!.id, pet);
  //   }

  //   onFormSubmission();
  // };

  return (
    <form
      action={async formData => {
        const result = await trigger();
        if (!result) return;

        onFormSubmission();

        const petData = {
          name: formData.get('name') as string,
          ownerName: formData.get('ownerName') as string,
          imageUrl: (formData.get('imageUrl') as string) || '/placeholder.svg',
          age: Number(formData.get('age')),
          notes: formData.get('notes') as string
        };
        if (actionType === 'add') {
          handleAddNewPet(petData);
        } else if (actionType === 'edit') {
          handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register('ownerName')}
          />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register('imageUrl')} />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register('age')} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register('notes')} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
