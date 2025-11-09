"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md"
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div></div>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="group relative text-sm font-medium text-foreground transition-colors hover:text-blue-500"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full" />
                </button>
              </motion.li>
            ))}
          </ul>

          {mounted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-white/10 p-2 transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-500" />
              )}
            </motion.button>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
