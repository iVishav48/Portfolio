"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Particles from "@/components/Particles";

export default function SiteParticles() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const colors = resolvedTheme === "light" ? ["#000000", "#000000"] : ["#ffffff", "#ffffff"];

  if (!mounted) {
    // Avoid hydration mismatch
    return null;
  }

  return (
    <Particles
      particleColors={colors}
      particleCount={200}
      particleSpread={10}
      speed={0.1}
      particleBaseSize={100}
      moveParticlesOnHover={true}
      alphaParticles={false}
      disableRotation={false}
      className="h-full w-full"
    />
  );
}
