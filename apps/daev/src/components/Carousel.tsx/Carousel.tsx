'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import AboutSection from '../AboutSection/AboutSection';
import ExperienceSection from '../ExperienceSection/ExperienceSection';
import StatsSection from '../StatsSection/StatsSection';
import FeaturedProjects from '../FeaturedProjects.tsx/FeaturedProjects';

const Carousel: React.FC = () => {
  return (
    <section id="about-carousel" className="pt-16 z-0 relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        loop
        a11y={{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
        className="w-full"
      >
        <SwiperSlide>
          <AboutSection />
        </SwiperSlide>
        <SwiperSlide>
          <ExperienceSection />
        </SwiperSlide>
        <SwiperSlide>
          <StatsSection />
        </SwiperSlide>
        <SwiperSlide>
          <FeaturedProjects />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Carousel;
