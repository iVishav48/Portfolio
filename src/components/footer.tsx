"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vishavjit-singh-s0724/",
    icon: Linkedin,
    glow: "rgba(59,130,246,0.35)",
  },
  {
    name: "GitHub",
    url: "https://github.com/iVishav48",
    icon: Github,
    glow: "rgba(148,163,184,0.35)",
  },
  {
    name: "Email",
    url: "mailto:vishav4848@gmail.com",
    icon: Mail,
    glow: "rgba(239,68,68,0.35)",
  },
  {
    name: "Twitter",
    url: "https://x.com/Vishavjit_48",
    icon: Twitter,
    glow: "rgba(14,165,233,0.35)",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/vishav_48/",
    icon: Instagram,
    glow: "rgba(236,72,153,0.35)",
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/80 backdrop-blur-sm">
      {/* Premium gradient divider */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* Orb removed per request */}

      <div className="container mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-2.5 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-medium text-foreground/70">Available for projects</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Vishavjit Singh</h3>
            <p className="text-sm text-foreground/70">Building delightful, performant experiences on the web.</p>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:ml-auto"
          >
            <h4 className="mb-2 text-xs font-semibold tracking-wide text-foreground/80">Connect</h4>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.05, delay: 0.01 + index * 0.04, type: "spring", stiffness: 600, damping: 20 }}
                    whileHover={{ scale: 1.1, y: -2, boxShadow: `0 0 20px ${social.glow}` }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur-sm transition-all duration-100 hover:border-primary/50 hover:bg-primary/10"
                    aria-label={social.name}
                  >
                    <Icon size={16} className="text-foreground/70 transition-colors group-hover:text-foreground" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/50 bg-background/95 px-2 py-0.5 text-[10px] font-medium opacity-0 transition-opacity duration-100 group-hover:opacity-100 pointer-events-none">
                      {social.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-4 md:flex-row">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] text-foreground/60"
          >
            © 2025 Vishavjit Singh •  All rights reserved
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-0 text-[11px] text-foreground/60"
          >
            <span className="rounded-full border border-border bg-card/50 px-2 py-0.5">Open to work</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
