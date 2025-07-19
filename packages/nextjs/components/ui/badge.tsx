import * as React from "react";
import { cn } from "../../utils/scaffold-eth/common";

// BadgeProps extends HTMLDivElement attributes
const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs shadow bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200 dark:from-blue-900 dark:to-purple-900 dark:text-blue-100 dark:border-blue-700 mr-2 mb-2",
      className,
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };
