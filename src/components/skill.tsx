"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import Lenis from "lenis";
import Image from "next/image";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "Python", subtitle: "Flask, Pandas" },
      { name: "JavaScript", subtitle: "React.js, Next.js, Express" },
      { name: "HTML/CSS", subtitle: "Advanced" },
      { name: "SQL", subtitle: "Advanced" }
    ]
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Git" },
      { name: "Node.js" },
      { name: "Cloudinary" }
    ]
  },
  {
    title: "Data & Analytics",
    skills: [
      { name: "Tableau" },
      { name: "Power BI" },
      { name: "Python", subtitle: "NumPy, Scikit-learn" },
      { name: "ML Basics" }
    ]
  },
  {
    title: "Other",
    skills: [
      { name: "REST APIs" },
      { name: "Vercel/Render", subtitle: "Deployment" },
      { name: "Figma", subtitle: "UI/UX" },
      { name: "GitHub" },
      { name: "Video Editing" }
    ]
  }
];

export default function Skills() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const revealRef = useRef(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background/50 backdrop-blur-sm"
    >
      {/* Ambient Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Interactive Reveal Effect */}
      <div
        ref={revealRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          mixBlendMode: 'lighten',
          opacity: 0.15,
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.6) 0%, transparent 50%)',
          ['--mx' as string]: '-9999px',
          ['--my' as string]: '-9999px',
          WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 100px, rgba(255,255,255,0.6) 200px, rgba(255,255,255,0.25) 300px, rgba(255,255,255,0) 400px)',
          maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 100px, rgba(255,255,255,0.6) 200px, rgba(255,255,255,0.25) 300px, rgba(255,255,255,0) 400px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        } as React.CSSProperties}
      />

      {/* Content */}
      <div ref={sectionRef} className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-20"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-center">
              <span className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
                My
              </span>{" "}
              <span className="foreground">Skills</span>
            </h2>
            <motion.div 
              className="w-32 h-1.5 mx-auto rounded-full mb-6"
              
              initial={{ width: 0 }}
              animate={isInView ? { width: 128 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
          >
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative"
              >
                {/* Card Glow Effect */}
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-gray-100 to-gray-900 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                />
                
                {/* Card Content */}
                <div 
                  className="relative bg-card/80 dark:bg-card/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gray-500 hover:border-gray-900 dark:border-gray-500 dark:hover:border-gray-400 transition-all duration-500 h-full flex flex-col"
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Category Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground">
                      {category.title}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3" />
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skillIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: idx * 0.1 + skillIdx * 0.05,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="relative group/skill"
                      >
                        <div className="relative px-4 py-2.5 bg-card/80 dark:bg-card/90 backdrop-blur-sm rounded-lg border border-gray-400 hover:border-gray-700 dark:border-gray-500 dark:hover:border-gray-400 transition-all duration-300 text-sm">
                          <div className="flex flex-col">
                            <span className="text-foreground font-semibold text-base whitespace-nowrap">
                              {skill.name}
                            </span>
                            {skill.subtitle && (
                              <span className="text-muted-foreground text-xs mt-0.5">
                                {skill.subtitle}
                              </span>
                            )}
                          </div>
                          
                          {/* Hover Gradient Border */}
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover/skill:opacity-20 transition-opacity duration-300 -z-10" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-card/80 dark:bg-card/60 backdrop-blur-sm px-8 py-4 rounded-full border border-border/50">
              <motion.span 
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <span className="text-foreground/90 font-medium">
                Constantly evolving and learning new technologies
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}