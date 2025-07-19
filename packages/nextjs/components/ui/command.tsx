"use client";

import * as React from "react";
import { cn } from "../../utils/scaffold-eth/common";
import { SearchIcon } from "lucide-react";

// Simple command input component
function CommandInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

// Simple command list component
function CommandList({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-list"
      className={cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Simple command empty component
function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-empty" className={cn("py-6 text-center text-sm", className)} {...props} />;
}

// Simple command group component
function CommandGroup({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-group"
      className={cn(
        "text-foreground overflow-hidden p-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Simple command separator component
function CommandSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

// Simple command item component
function CommandItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

// Simple command shortcut component
function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

export {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
