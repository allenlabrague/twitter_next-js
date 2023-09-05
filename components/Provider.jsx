"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const Provider = ({ children, session }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
