import { cn } from './utils';

export function Input({ className, ...props }: any) {
  return (
    <input
      className={cn(
        'w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-blue-600',
        className
      )}
      {...props}
    />
  );
}
