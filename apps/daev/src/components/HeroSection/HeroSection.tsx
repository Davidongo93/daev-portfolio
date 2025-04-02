import React from 'react';
import Image from 'next/legacy/image';

const HeroSection: React.FC = () => {
  return (
    <section>
      <div className="fixed w-full -z-10 inset-0">
        <Image
          src="/bwCity.jpg"
          layout="fill"
          alt="City"
          className="animated-background"
        />
      </div>
    </section>
  );
};

export default HeroSection;
