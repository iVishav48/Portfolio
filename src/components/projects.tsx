"use client";

import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Zap, Download } from "lucide-react";

const projects = [
  {
    title: "Seeq",
    description: "A real-time video analytics platform leveraging computer vision and deep learning to extract actionable insights from live video streams. Implements state-of-the-art object detection and tracking algorithms with optimized inference pipelines.",
    technologies: ["Python", "OpenCV", "TensorFlow", "Docker", "WebRTC"],
    githubUrl: "https://github.com/iVishav48/Seeq"
  },
  {
    title: "PWapp",
    description: "A progressive web application implementing advanced client-side encryption for secure password management. Features zero-knowledge architecture, biometric authentication, and cross-device synchronization with end-to-end encryption.",
    technologies: ["TypeScript", "React", "Web Crypto API", "IndexedDB", "PWA"],
    githubUrl: "https://github.com/iVishav48/PWapp"
  },
  {
    title: "InSight",
    description: "An intelligent data visualization dashboard that transforms complex datasets into interactive, real-time visual analytics. Implements custom D3.js visualizations with WebSocket support for live data streaming and analysis.",
    technologies: ["D3.js", "Node.js", "WebSockets", "MongoDB", "Express"],
    githubUrl: "https://github.com/iVishav48/InSight"
  },
  {
    title: "LLM-Document-Parser",
    description: "A document processing pipeline utilizing large language models for intelligent information extraction and semantic analysis. Implements custom fine-tuning of transformer models for domain-specific document understanding tasks.",
    technologies: ["Python", "PyTorch", "HuggingFace", "spaCy", "FastAPI"],
    githubUrl: "https://github.com/iVishav48/LLM-Document-parser"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="projects"
      className="py-24 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
          </motion.div>
        </div>
        <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          <span
            className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
            Featured
          </span>
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-500 transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="h-6 w-6" />
                </a>
              </div>

              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400"
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
