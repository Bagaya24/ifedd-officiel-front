import HeroSection from './section/HeroSection'
import AboutSection from './section/AboutSection'
import AxeIntervationSection from './section/AxeIntervationSection'
import ArticlesSection from './section/ArticlesSection'
import PartenaireSection from './section/PartenaireSection'
import RapportsSection from './section/RapportsSection'
import Footer from '../../components/Footer'
import NavBar from "../../components/NavBar"
import usePageSEO from '../../hooks/usePageSEO'

export default function HomePage() {
  usePageSEO({
    title: "IFEDD",
    description: "Initiative des Femmes Entrepreneuses pour le Developpement Durable",
    ogImage: "https://ifedd-rdc.org/Logo.png",
    ogDescription: "Initiative des Femmes Entrepreneuses pour le Developpement Durable",
    ogTitle: "IFEDD",
    canonicalUrl: window.location.href
  });
  return (
    <>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <AxeIntervationSection />
      <ArticlesSection />
      <RapportsSection />
      <PartenaireSection />
      <Footer />
    </>
  )
}
