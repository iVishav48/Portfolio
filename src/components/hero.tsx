"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Vishavjit Singh
            </span>
          </motion.h1>

          <motion.p
            className="mb-4 text-xl text-foreground/80 md:text-2xl lg:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tech Enthusiast | Developer | Innovator
          </motion.p>

          <motion.p
            className="mb-12 text-base text-foreground/60 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Building the future, one line of code at a time
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => scrollToSection("#projects")}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <button
              onClick={() => scrollToSection("#contact")}
              className="rounded-full border-2 border-blue-500/50 px-8 py-4 font-semibold text-foreground transition-all hover:scale-105 hover:border-blue-500 hover:bg-blue-500/10"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 p-3 transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 p-3 transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:contact@vishavjit.com"
              className="rounded-full border border-white/10 p-3 transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <button
            onClick={() => scrollToSection("#about")}
            className="rounded-full border border-white/10 p-2 transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
