'use client';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import AboutSection from '../../components/AboutSection/AboutSection';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import Footer from '../../components/Footer/Footer';
interface ChildComponentProps {
  onStateChange: (newValue: boolean) => void;
}

const Home: React.FC<ChildComponentProps> = ({ onStateChange }) => {
  return (
    <div className='wrapper'>
      <Header onStateChange={onStateChange} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
