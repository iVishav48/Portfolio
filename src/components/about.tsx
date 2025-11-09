"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Zap, Download } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building scalable web applications with modern technologies",
  },
  {
    icon: Rocket,
    title: "Innovation Driven",
    description: "Constantly exploring new tech and pushing boundaries",
  },
  {
    icon: Zap,
    title: "Performance Focused",
    description: "Optimizing for speed, efficiency, and user experience",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Passionate about creating innovative solutions and bringing ideas to life
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Professional Journey</h3>
            <p className="text-foreground/80 leading-relaxed">
              I'm a passionate developer with a strong foundation in modern web technologies.
              My journey in tech has been driven by curiosity and a desire to build
              meaningful digital experiences that make a difference.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              With expertise spanning front-end and back-end development, I specialize in
              creating responsive, performant, and user-centric applications. I believe in
              writing clean, maintainable code and staying updated with the latest industry
              trends.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing
              to open-source projects, or sharing knowledge with the developer community.
            </p>

            <motion.a
              href="/vishavit singh.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/50"
            >
              <Download className="h-5 w-5" />
              Resume
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">What I Bring</h3>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-3">
                    <highlight.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold">{highlight.title}</h4>
                  <p className="text-foreground/70">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
