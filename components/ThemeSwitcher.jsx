"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import { BiSun } from "react-icons/bi";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <FiMoon fontSize={25} /> : <BiSun fontSize={25} />}
      </button>
      {/* <button onClick={() => setTheme("light")}></button>
      <button onClick={() => setTheme("dark")}></button> */}
    </div>
  );
}
