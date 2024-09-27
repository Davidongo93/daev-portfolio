'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AboutSection from '../AboutSection/AboutSection';
import ExperienceSection from '../ExperienceSection/ExperienceSection';
import StatsSection from '../StatsSection/StatsSection';
import FeaturedProjects from '../FeaturedProjects.tsx/FeaturedProjects';

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false, // Opción para desactivar flechas
    pauseOnHover: false,
    fade: true, // Activar el efecto fade
    cssEase: 'linear',
    adaptiveHeight:true 
    };

  return (
    <section id="carousel" className=" top-32">
      <Slider {...settings} className="">
        <div>
          <AboutSection />
        </div>
        {/* <div>
          <ExperienceSection />
        </div>
        <div>
          <StatsSection />
        </div>
        <div>
          <FeaturedProjects />
        </div> */}
      </Slider>
    </section>
  );
};

export default Carousel;
