"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Mail, Home } from "lucide-react";

const socialLinks = [
  {
    name: "Home",
    href: "#home",
    icon: Home,
    color: "hover:text-blue-500",
    isScroll: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vishavjit-singh-s0724/",
    icon: Linkedin,
    color: "hover:text-blue-500",
    isScroll: false,
  },
  {
    name: "GitHub",
    href: "https://github.com/iVishav48",
    icon: Github,
    color: "hover:text-gray-400",
    isScroll: false,
  },
  {
    name: "Email",
    href: "mailto:vishav4848@gmail.com",
    icon: Mail,
    color: "hover:text-red-500",
    isScroll: false,
  },
  {
    name: "Twitter",
    href: "https://x.com/Vishavjit_48",
    icon: Twitter,
    color: "hover:text-sky-500",
    isScroll: false,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vishav_48/",
    icon: Instagram,
    color: "hover:text-pink-500",
    isScroll: false,
  },
];

export default function SocialSidebar() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (link: typeof socialLinks[0], e: React.MouseEvent) => {
    if (link.isScroll) {
      e.preventDefault();
      scrollToSection(link.href);
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed left-6 top-1/3 z-40 hidden lg:block"
    >
      <div className="flex flex-col gap-2 rounded-full border border-border/50 bg-background/80 px-2 py-3 backdrop-blur-md shadow-xl">
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
          >
            {link.isScroll ? (
              <motion.button
                onClick={(e) => handleClick(link, e)}
                className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-primary/10"
                aria-label={link.name}
                whileHover={{ scale: 1.15, x: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <link.icon className={`h-5 w-5 text-foreground/60 transition-colors group-hover:text-foreground ${link.color}`} />
                
                {/* Tooltip */}
                <span className="absolute left-full ml-3 whitespace-nowrap rounded-lg border border-border/50 bg-background/95 px-3 py-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none backdrop-blur-sm">
                  {link.name}
                </span>
              </motion.button>
            ) : (
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-primary/10"
                aria-label={link.name}
                whileHover={{ scale: 1.15, x: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <link.icon className={`h-5 w-5 text-foreground/60 transition-colors group-hover:text-foreground ${link.color}`} />
                
                {/* Tooltip */}
                <span className="absolute left-full ml-3 whitespace-nowrap rounded-lg border border-border/50 bg-background/95 px-3 py-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none backdrop-blur-sm">
                  {link.name}
                </span>
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
