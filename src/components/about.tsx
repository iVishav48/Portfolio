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
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Passionate about creating innovative solutions and bringing ideas to life
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Professional Journey</h3>
            <p className="text-foreground/80 leading-relaxed">
              I am a passionate developer with a keen mineset towards learning modern web technologies.
              My journey in tech has been driven by curiosity and a desire to build
              meaningful digital experiences that make a difference.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              With time, patience, and consistent practice, I developed strong expertise in transforming raw data into meaningful insights. I focus on building reliable, data-driven solutions through clean analysis, efficient modeling, and continuous learning to stay aligned with modern data science practices.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              When I am not coding, you will find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I also enjoy improving myself in any way possible and enjoying my hobbies.
            </p>

            <motion.a
              href="/updated resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-6 py-3 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/50"
            >
              <Download className="h-5 w-5" />
              Resume
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary/80 to-primary/60 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">What I Bring</h3>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10"
                >
                  <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-primary to-primary/80 p-3">
                    <highlight.icon className="h-6 w-6 text-primary-foreground" />
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
