import * as React from "react";
import { cn } from "../../utils/scaffold-eth/common";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", ...props }, ref) => {
  let base =
    "btn px-6 py-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  let style = "";
  if (variant === "primary") {
    style =
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700 active:scale-95";
  } else if (variant === "secondary") {
    style =
      "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow hover:from-cyan-600 hover:to-blue-600 active:scale-95";
  } else if (variant === "outline") {
    style =
      "border border-blue-400 text-blue-700 bg-white/80 hover:bg-blue-50 active:scale-95 dark:bg-transparent dark:text-blue-200 dark:border-blue-500 dark:hover:bg-blue-900/20";
  }
  return (
    <button ref={ref} className={cn(base, style, className)} {...props} />
  );
});
Button.displayName = "Button";

export { Button };
