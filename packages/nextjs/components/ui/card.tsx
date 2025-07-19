import * as React from "react";
import { cn } from "../../utils/scaffold-eth/common";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "card bg-white border-2 border-blue-100 dark:bg-[#181926] dark:border-blue-900 p-8 rounded-2xl shadow-2xl transition-all",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
