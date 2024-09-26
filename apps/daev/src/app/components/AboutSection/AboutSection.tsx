import { Link } from 'react-scroll';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className=" bg-gray-900 text-white">
      <div className="h-svh w-auto  p-2 m-2 flex flex-col-reverse justify-center md:flex-row-reverse md:mt-12 items-center bg-black">
        {/* Fotografía sin fondo */}
        <div
          className= 'relative w-full md:w-1/2 flex justify-center md:justify-center my-8 sm:my-10'
        >
          <div className="shadow rounded-sm brightness-110 contrast-150 saturate-0 hover:saturate-150 mr-5 relative w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80">
            <Image
              src={'/profileDave.png'}
              layout="responsive"
              width={100}
              height={100}
              className="object-cover"
              alt="Dave"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="ml-5 pt-4 w-full md:w-1/2 text-center md:text-left">
          <code className="text-3xl font-bold mb-4">David Orlando Miranda () ={'>'} {'{Full Stack developer}'}</code>
          <p className="text-lg leading-relaxed mb-8">
            I'm a Full Stack Developer with extensive experience in modern web technologies. I enjoy building dynamic and responsive applications that deliver an excellent user experience.
          </p>
          <Link
            to="stats"
            smooth={true}
            duration={500}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            View My Stats
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
