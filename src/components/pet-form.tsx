'use client';

import { usePetContext } from '@/lib/hooks';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import PetFormBtn from './pet-form-btn';
import { useForm } from 'react-hook-form';

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

export default function PetForm({
  actionType,
  onFormSubmission
}: TPetFormProps) {
  const { handleAddNewPet, handleEditPet, selectedPet } = usePetContext();
  const {
    register,
    formState: { errors }
  } = useForm<TPetForm>();
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
        onFormSubmission();
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name', {
            required: 'Name is required'
          })} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register('ownerName')} />
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
