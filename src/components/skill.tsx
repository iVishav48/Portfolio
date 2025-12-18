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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.92
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3
      }
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 15,
        duration: 0.2
      }
    }
  };

  return (
    <section 
      id="skills"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
        >
          <motion.h2 
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
              My
            </span>{" "}
            <span className="text-foreground">Skills</span>
          </motion.h2>
          <motion.p 
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.02 }}
            className="mx-auto max-w-2xl text-lg text-foreground/70"
          >
            A comprehensive toolkit for building modern, scalable applications
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 md:grid-cols-2 lg:gap-16"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={categoryVariants}
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
              className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 transition-colors duration-200 hover:border-border hover:bg-card/90 shadow-lg"
            >
              
              <div className="relative z-10">
                <motion.h3 
                  variants={skillVariants}
                  className="text-2xl font-semibold text-foreground mb-6"
                >
                  {category.title}
                </motion.h3>
                <motion.div 
                  variants={containerVariants}
                  className="flex flex-wrap gap-2.5"
                >
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      variants={skillVariants}
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
                      className="group/skill relative rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-colors duration-200 hover:border-primary/50 hover:bg-primary/10 cursor-pointer"
                    >
                      
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
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
