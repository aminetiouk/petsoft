import { Button } from './ui/button';
import Image from 'next/image';

type TPetButton = {
  actionType: 'icon' | 'edit' | 'checkout';
  children?: React.ReactNode;
};

export default function PetButton({ actionType, children }: TPetButton) {
  if (actionType === 'icon') {
    return (
      <Button size="icon">
        <Image src="/plus.svg" width={15} height={15} alt="plus icon" className='w-6 h-6' />
      </Button>
    );
  }
  if (actionType === 'edit') {
    return <Button variant="secondary">{children}</Button>;
  }
  if (actionType === 'checkout') {
    return <Button variant="secondary">{children}</Button>;
  }
}
