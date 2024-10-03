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
      style={{ ...style, paddingRight:80, zIndex:2 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: { className?: any; style?: any; onClick?: any; }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, paddingLeft:60, zIndex:2 }}
      onClick={onClick}
    />
  );
}

const Carousel: React.FC = () => {
  const settings = {
    dots:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, 
    pauseOnHover:true,
    fade: true,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    

  };

  return (
    <section id="carousel" className="pt-16 z-0">
      <Slider {...settings} className="w-full h-full">
        <div>
          <AboutSection />
        </div>
         {/* <div>
          <ExperienceSection />
        </div> */}
        <div>
          <StatsSection />
        </div>
        {/* <div>
          <FeaturedProjects />
        </div> */}
      </Slider>
    </section>
  );
};

export default Carousel;
