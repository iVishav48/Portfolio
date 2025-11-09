import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import ClickSpark from "@/components/click-spark";

export default function Home() {
  return (
    <ClickSpark
      sparkColor="#3b82f6"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <main className="relative min-h-screen">
        <Header />
        <Hero />
        <About />
      </main>
    </ClickSpark>
  );
}
