import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section >
            <div id="hero" className= ' flex w-full h-32 absolute inset-0'>
            <Image
  src="/bwCity.jpg"
  fill={true}
  style={{ objectFit: 'cover' }}
  alt="City"
  className='animated-background'
/>
      </div>
    </section>
  );
};

export default HeroSection;
