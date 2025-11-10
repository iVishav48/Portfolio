import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import SiteParticles from "@/components/SiteParticles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vishavjit Singh | Portfolio",
  description: "Tech Enthusiast | Developer | Innovator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {/* Site-wide background particles */}
            <div className="pointer-events-none fixed inset-0 -z-10">
              <SiteParticles />
            </div>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
