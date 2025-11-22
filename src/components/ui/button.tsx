import { cn } from './utils';

export function Button({ className, ...props }: any) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md border bg-blue-600 text-white hover:bg-blue-700 transition',
        className
      )}
      {...props}
    />
  );
}
