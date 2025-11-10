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
                      animate={isInView
                        ? { opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.15 + index * 0.08 } }
                        : { opacity: 0, y: 20 }
                      }
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
