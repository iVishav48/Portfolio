"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Github, Twitter, Instagram, Send } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vishavjit-singh-s0724/",
    icon: Linkedin,
    glow: "rgba(59, 130, 246, 0.45)",
    background: "rgba(59, 130, 246, 0.12)",
  },
  {
    name: "GitHub",
    url: "https://github.com/iVishav48",
    icon: Github,
    glow: "rgba(148, 163, 184, 0.45)",
    background: "rgba(148, 163, 184, 0.12)",
  },
  {
    name: "Twitter",
    url: "https://x.com/Vishavjit_48",
    icon: Twitter,
    glow: "rgba(14, 165, 233, 0.45)",
    background: "rgba(14, 165, 233, 0.12)",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/vishav_48/",
    icon: Instagram,
    glow: "rgba(236, 72, 153, 0.45)",
    background: "rgba(236, 72, 153, 0.12)",
  },
];

const rawFormEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
function getFormspreeFormId(input?: string | null): string | null {
  if (!input) return null;
  const v = input.trim().replace(/"/g, "");
  if (!v) return null;
  // If it's already just the id
  const idMatchBare = v.match(/^[a-z0-9]{6,12}$/i);
  if (idMatchBare) return idMatchBare[0];
  // If it contains /f/<id>
  const idMatchPath = v.match(/\/f\/([a-z0-9]{6,12})/i);
  if (idMatchPath) return idMatchPath[1];
  // If it's the whole url without protocol
  const idMatchNoProto = v.match(/formspree\.io\/f\/([a-z0-9]{6,12})/i);
  if (idMatchNoProto) return idMatchNoProto[1];
  return null;
}
const formId = getFormspreeFormId(rawFormEndpoint) || "mzzypqob"; // fallback to provided id to ensure working
const formEndpoint = `https://formspree.io/f/${formId}`;
// Dev-only visibility to confirm env is wired. This is stripped/minified in production builds.
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line no-console
  console.debug("Formspree form ID:", formId);
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const leftPanelVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 25,
        duration: 1
      }
    }
  };

  const rightPanelVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      rotateY: 15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 25,
        duration: 1,
        delay: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        duration: 0.7
      }
    }
  };

  const socialVariants = {
    hidden: { 
      opacity: 0, 
      y: 25,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        duration: 0.5
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    if (!formEndpoint) {
      setStatus("error");
      setErrorMessage("Contact form is not configured. Please set NEXT_PUBLIC_FORMSPREE_ENDPOINT.");
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("message", formData.message);

      const response = await fetch(formEndpoint, {
        method: "POST",
        // Do NOT set Content-Type when sending FormData; the browser sets the boundary automatically
        headers: {
          Accept: "application/json",
        },
        body: formPayload,
      });

      if (!response.ok) {
        let detail = "";
        try {
          const data = await response.json();
          if (data?.errors?.length) {
            detail = data.errors.map((e: any) => e.message).join("; ");
          } else if (data?.error) {
            detail = data.error;
          }
        } catch (_) {
          try {
            const txt = await response.text();
            detail = txt?.slice(0, 200);
          } catch (_) {}
        }
        throw new Error(detail || `Form submission failed (HTTP ${response.status})`);
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Try again later.");
    }
  };

  return (
    <section id="contact" ref={ref} className="relative min-h-screen px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">Let&apos;s</span>{" "}
            <span className="text-foreground">Connect</span>
          </h2>
          <motion.p 
            variants={headingVariants}
            transition={{ delay: 0.05 }}
            className="mx-auto max-w-2xl text-lg text-foreground/70"
          >
            Have a project in mind or just want to chat? Feel free to reach out!
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 md:grid-cols-2 lg:gap-16"
        >
          <motion.div
            variants={leftPanelVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
          >
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 sm:p-8">
              <motion.h3 
                variants={cardVariants}
                className="mb-2 text-2xl font-semibold text-foreground"
              >
                Send me a message
              </motion.h3>
              <motion.p 
                variants={cardVariants}
                transition={{ delay: 0.02 }}
                className="mb-6 text-sm text-foreground/70"
              >
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </motion.p>

              <motion.form 
                variants={containerVariants}
                onSubmit={handleSubmit} 
                className="space-y-5"
              >
                <motion.div variants={cardVariants} transition={{ delay: 0.01 }}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </motion.div>

                <motion.div variants={cardVariants} transition={{ delay: 0.02 }}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </motion.div>

                <motion.div variants={cardVariants} transition={{ delay: 0.03 }}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={6}
                    required
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                  />
                </motion.div>

                <motion.button
                  variants={cardVariants}
                  transition={{ delay: 0.04, type: "spring", stiffness: 400, damping: 25 }}
                  type="submit"
                  whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 px-6 py-3 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/50 disabled:cursor-not-allowed disabled:opacity-75"
                >
                  <span className="flex items-center justify-center gap-2">
                    {status === "loading" ? (
                      <span>Sending...</span>
                    ) : status === "success" ? (
                      <>
                        <span>Message Sent!</span>
                        <span>✓</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </motion.button>

                {status === "error" && errorMessage && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errorMessage}
                  </motion.p>
                )}
                {status === "success" && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-500"
                  >
                    Thanks for reaching out! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </motion.form>
            </div>
          </motion.div>

          <motion.div
            variants={rightPanelVariants}
            className="space-y-6"
            whileHover={{ 
              scale: 1.01,
              y: -3,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
          >
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }
              }}
              className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6"
            >
              <motion.h3 
                variants={socialVariants}
                className="mb-4 text-xl font-semibold text-foreground"
              >
                Direct Contact
              </motion.h3>
              <motion.div 
                variants={containerVariants}
                className="space-y-4"
              >
                <motion.div variants={socialVariants} transition={{ delay: 0.01 }}>
                  <p className="text-sm text-muted-foreground mb-2">Email</p>
                  <a
                    href="mailto:vishav4848@gmail.com"
                    className="text-primary hover:underline underline-offset-2 flex items-center gap-2 transition-colors duration-200"
                  >
                    vishav4848@gmail.com
                  </a>
                </motion.div>
                <motion.div variants={socialVariants} transition={{ delay: 0.02 }}>
                  <div className="h-px bg-border/50" />
                </motion.div>
                <motion.div variants={socialVariants} transition={{ delay: 0.03 }}>
                  <p className="text-sm text-muted-foreground mb-2">Response Time</p>
                  <p className="font-medium text-foreground">24-48 hours</p>
                </motion.div>
                <motion.div variants={socialVariants} transition={{ delay: 0.04 }}>
                  <div className="h-px bg-border/50" />
                </motion.div>
                <motion.div variants={socialVariants} transition={{ delay: 0.05 }}>
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <p className="font-medium text-foreground">Available for projects</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.05 }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }
              }}
              className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6"
            >
              <motion.h3 
                variants={socialVariants}
                className="mb-4 text-xl font-semibold text-foreground"
              >
                Follow Me
              </motion.h3>
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-2 gap-3"
              >
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={socialVariants}
                      whileHover={{
                        scale: 1.08,
                        y: -3,
                        boxShadow: `0 0 20px ${social.glow}`,
                        backgroundColor: social.background,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-2 p-3 rounded-lg border border-border/50 bg-card/50 transition-all duration-100 cursor-pointer"
                    >
                      <Icon size={20} className="text-foreground/70 transition-colors group-hover:text-foreground" />
                      <span className="text-sm font-medium text-foreground">{social.name}</span>
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
