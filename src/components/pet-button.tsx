'use client'

import { Button } from './ui/button';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from './ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import PetForm from './pet-form';
import { useState } from 'react';

type TPetButton = {
  actionType: 'add' | 'edit' | 'checkout';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  disabled,
  onClick
}: TPetButton) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (actionType === 'checkout') {
    return (
      <Button variant="secondary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size="icon" className="cursor-pointer">
            <Image
              src="/plus.svg"
              width={15}
              height={15}
              alt="plus icon"
              className="w-5 h-5"
            />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add new pet' : 'Edit the pet'}
          </DialogTitle>
        </DialogHeader>
        <PetForm actionType={actionType} onFormSubmission={() => setIsFormOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
