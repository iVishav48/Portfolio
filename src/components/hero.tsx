"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { CometCard } from "@/components/ui/comet-card";
import ShinyText from "@/components/ui/shiny-text";

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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 via-gray-800/30 to-slate-900/30 opacity-50 blur-3xl" />
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
              className="mb-8 pb-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-snug sm:whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ShinyText 
                text="Vishavjit Singh" 
                disabled={false} 
                speed={4}
                className="bg-gradient-to-r from-slate-300 via-gray-600 to-slate-600"
              />
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
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-4 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/80 to-primary/60 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <button
                onClick={() => scrollToSection("#contact")}
                className="rounded-full border-2 border-primary/50 px-8 py-4 font-semibold text-foreground transition-all hover:scale-105 hover:border-primary hover:bg-primary/10"
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
            <div className="relative">
              {/* Gradient ring effect */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 opacity-75 blur-2xl" />
              
              {/* Profile picture with CometCard */}
              <CometCard className="relative rounded-2xl bg-gradient-to-br from-card to-card/80 p-4 shadow-2xl border border-border/50">
                <div className="relative h-72 w-72 overflow-hidden rounded-xl bg-gradient-to-br from-background/20 to-background/10 md:h-96 md:w-96">
                  <Image
                    src="/professional_pic.png"
                    alt="Vishavjit Singh"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CometCard>

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
                className="absolute -right-4 top-10 rounded-2xl border border-border/50 bg-background/80 p-4 backdrop-blur-sm shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
              </motion.div>
            </div>
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
            className="rounded-full border border-border/50 p-2 transition-all hover:border-primary/50 hover:bg-primary/10"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
