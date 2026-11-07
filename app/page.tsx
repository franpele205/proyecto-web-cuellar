import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RoadLayers from "@/components/RoadLayers";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Services />
        <RoadLayers />
        <Projects />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
