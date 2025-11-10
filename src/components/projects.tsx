"use client";

import { Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Seeq",
    description: "A real-time video analytics platform leveraging computer vision and deep learning to extract actionable insights from live video streams. Implements state-of-the-art object detection and tracking algorithms with optimized inference pipelines.",
    technologies: ["Next.js", "TRCP", "Inngest","NeonDB", "GoogleAuth"],
    githubUrl: "https://github.com/iVishav48/Seeq"
  },
  {
    title: "PWapp",
    description: "A progressive web application implementing advanced client-side encryption for secure password management. Features zero-knowledge architecture, biometric authentication, and cross-device synchronization with end-to-end encryption.",
    technologies: ["Javascript", "React", "MongoDB", "IndexedDB", "JWT"],
    githubUrl: "https://github.com/iVishav48/PWapp"
  },
  {
    title: "InSight",
    description: "An intelligent data visualization dashboard that transforms complex datasets into interactive, real-time visual analytics. Implements custom D3.js visualizations with WebSocket support for live data streaming and analysis.",
    technologies: ["Javascript", "Next.js", "Node.js", "Express"],
    githubUrl: "https://github.com/iVishav48/InSight"
  },
  {
    title: "LLM-Document-Parser",
    description: "A document processing pipeline utilizing large language models for intelligent information extraction and semantic analysis. Implements custom fine-tuning of transformer models for domain-specific document understanding tasks.",
    technologies: ["Python","Javascript", "FastAPI" , "LangChain", "OpenAI", "Pinecone"],
    githubUrl: "https://github.com/iVishav48/LLM-Document-parser"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="projects"
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
            <span className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
              Featured
            </span>{" "}
            <span className="text-foreground">Projects</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Showcasing innovative solutions and cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
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
              className="h-full bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-colors duration-200 shadow-lg hover:shadow-2xl hover:bg-card/90 overflow-hidden cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="h-6 w-6" />
                </a>
              </div>

              <p className="text-foreground/90 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-foreground/80 border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}  