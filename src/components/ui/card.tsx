import * as React from 'react';
import { cn } from './utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-lg border bg-white p-4 shadow-sm', className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-2', className)} {...props} />
);

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-lg font-semibold', className)} {...props} />
);

const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-gray-500', className)} {...props} />
);

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-2', className)} {...props} />
);

const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-4 flex justify-end gap-2', className)} {...props} />
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
