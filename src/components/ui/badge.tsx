import { cn } from './utils';

export function Badge({ className, children }: any) {
  return (
    <span
      className={cn(
        'px-2 py-1 text-xs rounded bg-gray-200 text-gray-700',
        className
      )}
    >
      {children}
    </span>
  );
}
