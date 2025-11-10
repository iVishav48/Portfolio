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

const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again later.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setStatus("idle");
      }, 4000);

    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Try again later.");
    }
  };

  return (
    <section id="contact" ref={ref} className="relative min-h-screen px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">Let&apos;s</span>{" "}
            <span className="text-foreground">Connect</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 sm:p-8">
              <h3 className="mb-2 text-2xl font-semibold text-foreground">Send me a message</h3>
              <p className="mb-6 text-sm text-foreground/70">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
                {status === "success" && (
                  <p className="text-sm text-green-500">Thanks for reaching out! I&apos;ll get back to you soon.</p>
                )}
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6"
            >
              <h3 className="mb-4 text-xl font-semibold text-foreground">Direct Contact</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Email</p>
                  <a
                    href="mailto:vishav4848@gmail.com"
                    className="text-primary hover:underline underline-offset-2 flex items-center gap-2 transition-colors duration-200"
                  >
                    vishav4848@gmail.com
                  </a>
                </div>
                <div className="h-px bg-border/50" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Response Time</p>
                  <p className="font-medium text-foreground">24-48 hours</p>
                </div>
                <div className="h-px bg-border/50" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <p className="font-medium text-foreground">Available for projects</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6"
            >
              <h3 className="mb-4 text-xl font-semibold text-foreground">Follow Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      whileHover={{
                        scale: 1.08,
                        y: -3,
                        boxShadow: `0 0 20px ${social.glow}`,
                        backgroundColor: social.background,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-2 p-3 rounded-lg border border-border/50 bg-card/50 transition-all duration-200 cursor-pointer"
                    >
                      <Icon size={20} className="text-foreground/70 transition-colors group-hover:text-foreground" />
                      <span className="text-sm font-medium text-foreground">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
