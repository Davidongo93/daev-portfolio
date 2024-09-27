'use client';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import Footer from '../../components/Footer/Footer';
import Carousel from '../../components/Carousel.tsx/Carousel';
interface ChildComponentProps {
  onStateChange: (newValue: boolean) => void;
}

const Home: React.FC<ChildComponentProps> = ({ onStateChange }) => {
  return (
    <div className='wrapper'>
      <Header onStateChange={onStateChange} />
      <HeroSection />
      <Carousel/>
      <SkillsSection />
      {/* <ProjectsSection />
      <ContactSection /> */}
      <Footer />
    </div>
  );
};

export default Home;
