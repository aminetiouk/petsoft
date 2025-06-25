import React from 'react';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

type TPetFormBtnProps = {
  actionType: 'add' | 'edit';
}

export default function PetFormBtn({actionType}: TPetFormBtnProps) {
 const {pending} =  useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {actionType === 'add' ? 'Add New Pet' : 'Edit Pet'}
    </Button>
  );
}
