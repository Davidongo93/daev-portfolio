import Image from 'next/image';
import IconBar from '../IconBar/IconBar';
import HireMeButton from '../HireMeButton/HireMeButton';
const code = `(() => "fullStackDeveloper")();`;

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="text-white bg-black opacity-95">
      <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-center p-4 md:p-8">
        
        {/* Fotografía sin fondo + IconBar + HireMeButton */}
        <div className="w-full h-full md:w-1/2 flex flex-col items-center justify-center mb-8 p-4">
          <div className="relative w-2/3 sm:w-1/2 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow rounded-sm brightness-110 contrast-150 saturate-0 hover:saturate-100">
            <Image
              src={'/daveDad.png'}
              layout="responsive"
              width={100}
              height={100}
              className="object-cover"
              alt="Dave"
            />
          </div>

          {/* Centramos IconBar*/}
          <div className="flex flex-col items-center justify-center mt-4 space-y-4">
            <IconBar />
          </div>
        </div>

        {/* hire me */}
        <div className='p-16 '>
        <div className="w-fit md:w-1/2 flex justify-center md:justify-center mb-4">
        <h3>David Orlando Miranda <code><strong>{code}</strong></code></h3>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-center mb-4">
            <HireMeButton />
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
