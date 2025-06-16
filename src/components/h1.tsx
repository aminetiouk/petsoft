import { cn } from '@/lib/utils';

type TH1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: TH1Props) {
  return (
    <h1 className={cn('font-medium text-2xl leading-6', className)}>
      {children}
    </h1>
  );
}
