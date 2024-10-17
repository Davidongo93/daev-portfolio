'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AboutSection from '../AboutSection/AboutSection';
import ExperienceSection from '../ExperienceSection/ExperienceSection';
import StatsSection from '../StatsSection/StatsSection';
import FeaturedProjects from '../FeaturedProjects.tsx/FeaturedProjects';

function SampleNextArrow(props: { className?: any; style?: any; onClick?: any; }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        paddingRight: 80, 
        zIndex: 2,
        opacity: 0.5, // Aumentar transparencia
        transition: 'opacity 0.3s ease', // Suave transición en hover
      }}
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
    />
  );
}

function SamplePrevArrow(props: { className?: any; style?: any; onClick?: any; }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        paddingLeft: 60, 
        zIndex: 2,
        opacity: 0.5, // Aumentar transparencia
        transition: 'opacity 0.3s ease', // Suave transición en hover
      }}
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
    />
  );
}

const Carousel: React.FC = () => {
  const settings = {
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    pauseOnHover: true,
    fade: true,
    cssEase: '',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Para pantallas móviles
        settings: {
          arrows: false, // Ocultar flechas en pantallas móviles
          dots: true,  // Mostrar puntos de navegación en lugar de flechas
        }
      }
    ]
  };

  return (
    <section id="carousel" className="pt-16 z-0">
      <Slider {...settings} className="w-screen h-screen">
        <div>
          <AboutSection />
        </div>
        <div>
          <ExperienceSection />
        </div>
        <div>
          <StatsSection />
        </div>
        <div>
          <FeaturedProjects />
        </div>
      </Slider>
    </section>
  );
};

export default Carousel;
