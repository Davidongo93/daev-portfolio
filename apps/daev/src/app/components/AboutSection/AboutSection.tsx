import Image from 'next/image';
import CodeExample from '../CodeExample/CodeExample';
import IconBar from '../IconBar/IconBar';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="text-white bg-black opacity-95">
      <div className="min-h-screen flex flex-col-reverse md:flex-row-reverse items-center justify-between p-4 md:p-8">
        
        {/* Fotografía sin fondo */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <div className="relative w-2/3 sm:w-1/2 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow rounded-sm brightness-110 contrast-150 saturate-0 hover:saturate-100">
            <Image
              src={'/daveDad.png'}
              layout="responsive"
              width={100}
              height={100}
              className="object-cover"
              alt="Dave"
            />
            <IconBar />
          </div>
        </div>

        {/* Descripción */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="w-5/6 sm:w-4/5 md:w-full lg:w-4/5 xl:w-3/4">
            <CodeExample />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
