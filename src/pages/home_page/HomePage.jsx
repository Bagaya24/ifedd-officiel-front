import HeroSection from "./section/HeroSection";
import AboutSection from "./section/AboutSection";
import AxeIntervationSection from "./section/AxeIntervationSection";
import ArticlesSection from "./section/ArticlesSection";
import PartenaireSection from "./section/PartenaireSection";
import RapportsSection from "./section/RapportsSection";
import NavBar from "../../components/NavBar";
import MFooter from "../../components/MFooter";
import SEO from "../../hooks/usePageSEO";

export default function HomePage() {

  return (
    <>
    <SEO 
        title="IFEDD"
        description="Initiative des Femmes Entrepreneuses pour le Developpement Durable"
        ogImage="https://ifedd-rdc.org/Logo.png"
        canonicalUrl={window.location.href}
      />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <AxeIntervationSection />
      <ArticlesSection />
      <RapportsSection />
      <PartenaireSection />
      <MFooter />
    </>
  );
  );
}
