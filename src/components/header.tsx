"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y > 60);
      const goingDown = y > lastY.current;
      setIsHidden(goingDown && y > 140);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      setMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isHidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
        isScrolled ? "shadow-lg shadow-black/10" : "shadow-none"
      }`}
    >
      <motion.nav
        animate={{ height: isScrolled ? 56 : 72 }}
        transition={{ duration: 0.25 }}
        className="container mx-auto grid grid-cols-3 items-center px-4 sm:px-6"
        style={{ overflow: "hidden" }}
      >
        {/* Left: Signature name */}
        <motion.div
          animate={{ scale: isScrolled ? 0.92 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <a
            href="#home"
            className="select-none text-lg sm:text-xl italic font-semibold tracking-wide text-foreground/90 hover:text-primary transition-colors"
            style={{ fontFamily: "cursive" }}
          >
            Vishavjit Singh
          </a>
        </motion.div>

        {/* Center: Nav links (desktop) */}
        <div className="hidden items-center justify-center md:flex">
          <ul className="flex items-center gap-8">
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

        {/* Right: Resume + Theme toggle + Mobile menu */}
        <div className="ml-auto flex items-center justify-end gap-2 sm:gap-3">
          <a
            href="/Vishavjit Resume.pdf"
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
          <button
            className="rounded-full border border-border/50 p-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="container mx-auto px-4 pb-4"
            >
              <div className="rounded-2xl border border-border/50 bg-background/95 p-4 backdrop-blur-sm shadow-lg">
                <ul className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="w-full text-left text-base font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                  <li className="md:hidden">
                    <a
                      href="/Vishavjit Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-border/50 px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10"
                    >
                      Resume
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
