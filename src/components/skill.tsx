"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      id="skills"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={mounted && isInView ? { opacity: 1, y: 0 } : mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
              My
            </span>{" "}
            <span className="text-foreground">Skills</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={mounted && isInView ? { opacity: 1, y: 0 } : mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.5
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: {
                  type: "spring",
                  stiffness: 600,
                  damping: 30
                }
              }}
              className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 transition-colors duration-200 hover:border-border hover:bg-card/90 shadow-lg"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-500/20 via-gray-500/30 to-slate-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-foreground mb-6">{category.title}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={mounted && isInView ? { opacity: 1, y: 0 } : mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 + skillIdx * 0.05 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          mass: 0.5
                        }
                      }}
                      whileTap={{ 
                        scale: 0.95,
                        transition: {
                          type: "spring",
                          stiffness: 600,
                          damping: 30
                        }
                      }}
                      className="group/skill relative rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-colors duration-200 hover:border-primary/50 hover:bg-primary/10 cursor-pointer"
                    >
                      {/* Skill Glow Effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-400/10 via-gray-400/20 to-slate-400/10 rounded-2xl opacity-0 group-hover/skill:opacity-100 blur-lg transition-opacity duration-300 -z-10" />
                      
                      <div className="relative z-10 flex flex-col">
                        <span className="text-foreground font-semibold text-base whitespace-nowrap">
                          {skill.name}
                        </span>
                        {skill.subtitle && (
                          <span className="text-muted-foreground text-xs mt-0.5">
                            {skill.subtitle}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
