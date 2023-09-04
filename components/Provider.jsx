"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Provider = ({ children, session }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider session={session}>{children}</SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Provider;
