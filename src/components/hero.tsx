"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

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

      <div className="container mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:pl-16">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left lg:pl-8"
          >
            <motion.h1
              className="mb-8 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Vishavjit Singh
              </span>
            </motion.h1>

            <motion.p
              className="mb-6 text-2xl text-foreground/80 md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Tech Enthusiast | Developer | Innovator
            </motion.p>

            <motion.p
              className="mb-12 text-lg text-foreground/60 md:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Building the future, one line of code at a time
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
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
          </motion.div>

          {/* Right side - Profile picture */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              {/* Gradient ring effect */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-2xl" />
              
              {/* Profile picture container */}
              <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-2xl md:h-96 md:w-96">
                <Image
                  src="/professional_pic.png"
                  alt="Vishavjit Singh"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 top-10 rounded-2xl border border-white/10 bg-background/80 p-4 backdrop-blur-sm shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

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
