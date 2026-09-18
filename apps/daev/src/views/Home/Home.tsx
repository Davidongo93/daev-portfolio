'use client';
import HeroSection from '../../components/HeroSection/HeroSection';
import ClientStrip from '../../components/ClientStrip/ClientStrip';
import CaseStudies from '../../components/CaseStudies/CaseStudies';
import ServicesSection from '../../components/ServicesSection/ServicesSection';
import ProcessSection from '../../components/ProcessSection/ProcessSection';
import BlogSection, { type HomePost } from '../../components/BlogSection/BlogSection';
import LabProjects from '../../components/LabProjects/LabProjects';
import AboutSection from '../../components/AboutSection/AboutSection';
import FaqSection from '../../components/FaqSection/FaqSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import Footer from '../../components/Footer/Footer';
import Reveal from '../../components/Reveal/Reveal';

/**
 * The home sells outcomes, so the running work comes first: hero → who I built
 * it for → the cases themselves. Services, process and the blog follow, and the
 * lab and the personal bio sit at the bottom where they belong.
 */
const Home: React.FC<{ posts?: HomePost[] }> = ({ posts = [] }) => {
  return (
    <div className="wrapper">
      <HeroSection />
      <ClientStrip />
      <Reveal>
        <CaseStudies />
      </Reveal>
      <Reveal>
        <ServicesSection />
      </Reveal>
      <Reveal>
        <ProcessSection />
      </Reveal>
      <Reveal>
        <BlogSection posts={posts} />
      </Reveal>
      <Reveal>
        <LabProjects />
      </Reveal>
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
      <Footer />
    </div>
  );
};

export default Home;
