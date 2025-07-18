"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, enableSystem = true }: { children: ReactNode; enableSystem?: boolean }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={enableSystem}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
