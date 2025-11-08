import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import CursorFollower from "@/components/cursor-follower";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CursorFollower />
      <Header />
      <Hero />
      <About />
    </main>
  );
}
