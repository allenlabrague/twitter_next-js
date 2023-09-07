"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import { BiSun } from "react-icons/bi";
import { Button } from "./ui/button";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      <Button
        className="w-full"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <FiMoon fontSize={25} /> : <BiSun fontSize={25} />}
      </Button>
    </div>
  );
}
