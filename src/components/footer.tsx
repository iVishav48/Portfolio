"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vishavjit-singh-s0724/",
    icon: Linkedin,
    color: "hover:text-blue-500",
  },
  {
    name: "GitHub",
    url: "https://github.com/iVishav48",
    icon: Github,
    color: "hover:text-gray-400",
  },
  {
    name: "Email",
    url: "mailto:vishav4848@gmail.com",
    icon: Mail,
    color: "hover:text-red-500",
  },
  {
    name: "Twitter",
    url: "https://x.com/Vishavjit_48",
    icon: Twitter,
    color: "hover:text-sky-500",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/vishav_48/",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="text-sm text-foreground/70">
              © 2025 Vishavjit Singh | Built with{" "}
              <span className="text-red-500">❤️</span> using Next.js, Tailwind, Framer Motion & Lenis
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <span className="text-sm font-medium text-foreground/60">Quick links:</span>
            <div className="flex items-center gap-4">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10"
                  aria-label={social.name}
                >
                  <Icon
                    size={18}
                    className={`text-foreground/60 transition-colors group-hover:text-foreground ${social.color}`}
                  />
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border/50 bg-background/95 px-2 py-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none backdrop-blur-sm">
                    {social.name}
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

