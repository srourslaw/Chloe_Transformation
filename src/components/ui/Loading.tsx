import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  centered?: boolean;
  className?: string;
}

export default function Loading({
  size = 'md',
  text,
  centered = false,
  className
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const content = (
    <div className={clsx('flex items-center gap-2', className)}>
      <Loader2 className={clsx('animate-spin', sizeClasses[size])} />
      {text && <span className="text-sm text-secondary-600">{text}</span>}
    </div>
  );

  if (centered) {
    return (
      <div className="flex items-center justify-center p-8">
        {content}
      </div>
    );
  }

  return content;
}