"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Briefcase } from "lucide-react";

const experiences = [
  {
    title: "ML Intern",
    company: "Prodigy Infotech",
    location: "Remote",
    period: "Dec 2025 - Present",
    description: "Worked on multiple end-to-end machine learning projects involving regression, clustering, and classification using real-world datasets. Built and evaluated a linear regression model for house price prediction, implemented K-means clustering for customer segmentation, and developed an SVM-based image classifier for cats vs dogs. Also worked on computer vision projects, including hand gesture recognition and food image classification with calorie estimation, applying data preprocessing, feature engineering, model training, and performance evaluation using Python and popular ML libraries.",
    technologies: ["Python", "Tensorflow", "Sklearn", "Pytorch", "CNNs", "OpenCV"]
  },
  {
    title: "Data Science Intern",
    company: "CodeAlpha",
    location: "Remote",
    period: "Jan 2026 - present",
    description: "Worked on real-world data analytics projects involving e-commerce sales analysis, social media campaign performance tracking, and survey-based feedback analysis. Built interactive dashboards, performed data cleaning and trend analysis, applied marketing analytics and NLP-based sentiment analysis, and delivered actionable insights to support data-driven decision-making.",
    technologies: ["Power BI", "Python", "Seaborn", "Pandas", "NLP"]
  },
  {
    title: "Tech Head",
    company: "Datagenics Student Society (DGSS)",
    location: "Guru Nanak Dev University, Amritsar",
    period: "2024 - 2025",
    description: "Led the technical team for society hackathons and workshops; mentored juniors on web and ML stacks. Coordinated project roadmaps, code reviews and deployment pipelines for student projects.",
    technologies: ["Leadership", "Teamship", "JavaScript", "Python", "SQL"]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 0.3
      }
    }
  };

  return (
    <section 
      id="experience"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
              My
            </span>{" "}
            <span className="text-foreground">Experience</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            A journey through professional growth and technical expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  duration: 0
                }
              }}
              className="group relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-0 hover:border-primary/50 hover:bg-card/90 shadow-lg"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-500/20 via-gray-500/30 to-slate-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-50 -z-10" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <div className="rounded-full bg-gradient-to-r from-primary to-primary/80 p-2">
                      <Briefcase className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {experience.title}
                      </h3>
                      <p className="text-primary font-medium">{experience.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-full border border-border/50 bg-primary/10 px-3 py-1 text-sm font-medium text-primary/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
