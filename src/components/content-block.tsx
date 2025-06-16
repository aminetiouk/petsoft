import { cn } from "@/lib/utils";

type TContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className
}: TContentBlockProps) {
  return (
    <div className={cn("bg-[#f8f9fa] shadow-sm rounded-md overflow-hidden w-full h-full", className)}>
      {children}
    </div>
  );
}
