import React from 'react';
import { Button } from './ui/button';

type TPetFormBtnProps = {
  actionType: 'add' | 'edit';
}

export default function PetFormBtn({actionType}: TPetFormBtnProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === 'add' ? 'Add New Pet' : 'Edit Pet'}
    </Button>
  );
}
