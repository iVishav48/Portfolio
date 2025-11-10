import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import { ClickSparkProvider } from "@/components/providers/click-spark-provider";
import SocialSidebar from "@/components/ui/social-sidebar";
import Projects from "@/components/projects";
import Skills from "@/components/skill";
import Contact from "@/components/contact";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <ClickSparkProvider
      sparkColor="#3b82f6"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <main className="relative min-h-screen">
        <Header />
        <SocialSidebar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </ClickSparkProvider>
  );
}
