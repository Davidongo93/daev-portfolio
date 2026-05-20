'use client';
import HeroSection from '../../components/HeroSection/HeroSection';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import Footer from '../../components/Footer/Footer';
import Carousel from '../../components/Carousel.tsx/Carousel';

const Home: React.FC = () => {
  return (
    <div className="wrapper animate-fade-in">
      <HeroSection />
      <Carousel />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
