import { Button } from './ui/button';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from './ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import PetForm from './petForm';

type TPetButton = {
  actionType: 'icon' | 'edit' | 'checkout';
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  onClick
}: TPetButton) {
  if (actionType === 'icon' || actionType === 'edit') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {actionType === 'icon' ? (
            <Button size="icon" className="cursor-pointer">
              <Image
                src="/plus.svg"
                width={15}
                height={15}
                alt="plus icon"
                className="w-6 h-6"
              />
            </Button>
          ) : (
            <Button variant="secondary">{children}</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'icon' ? 'Add new pet' : 'Edit the pet'}
            </DialogTitle>
          </DialogHeader>
          <PetForm />
        </DialogContent>
      </Dialog>
    );
  }

  if (actionType === 'checkout') {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }
}
