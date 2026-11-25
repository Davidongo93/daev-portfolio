'use client';
import HeroSection from '../../components/HeroSection/HeroSection';
import ClientStrip from '../../components/ClientStrip/ClientStrip';
import WorkGrid from '../../components/WorkGrid/WorkGrid';
import ServicesSection from '../../components/ServicesSection/ServicesSection';
import TrajectorySection from '../../components/TrajectorySection/TrajectorySection';
import AboutSection from '../../components/AboutSection/AboutSection';
import BlogSection, { type HomePost } from '../../components/BlogSection/BlogSection';
import FaqSection from '../../components/FaqSection/FaqSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import Footer from '../../components/Footer/Footer';
import Reveal from '../../components/Reveal/Reveal';

/**
 * The home has to sell a project and convince a recruiter, in that order:
 * hero → who I built for → the work (a carousel into /trabajo) → services →
 * the career behind it → who I am → the blog → FAQ → contact.
 */
const Home: React.FC<{ posts?: HomePost[] }> = ({ posts = [] }) => {
  return (
    <div className="wrapper">
      <HeroSection />
      <ClientStrip />
      {/* The grid reveals card by card on its own. */}
      <WorkGrid />
      <Reveal>
        <ServicesSection />
      </Reveal>
      <Reveal>
        <TrajectorySection />
      </Reveal>
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <BlogSection posts={posts} />
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
