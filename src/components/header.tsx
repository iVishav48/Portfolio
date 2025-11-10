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
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <nav className="container mx-auto grid grid-cols-3 items-center px-6 py-4">
        {/* Left: Signature name */}
        <div className="flex items-center">
          <a
            href="#home"
            className="select-none text-xl italic font-semibold tracking-wide text-foreground/90 hover:text-primary transition-colors"
            style={{ fontFamily: "cursive" }}
          >
            Vishavjit Singh
          </a>
        </div>

        {/* Center: Nav links */}
        <div className="flex items-center justify-center">
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
                  className="group relative text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 group-hover:w-full" />
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: Resume + Theme toggle */}
        <div className="ml-auto flex items-center justify-end gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-border/50 px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 md:inline-flex"
          >
            Resume
          </a>
          {mounted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-border/50 p-2 transition-all hover:border-primary/50 hover:bg-primary/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </motion.button>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
