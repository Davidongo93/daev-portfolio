import { Link } from 'react-scroll';
import Image from 'next/image';
import CodeExample from '../CodeExample/CodeExample';
import IconBar from '../IconBar/IconBar';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="text-white  relative h-full w-full">
      <div className="h-full w-auto flex flex-col-reverse justify-center md:flex-row-reverse items-center bg-black opacity-90">
        {/* Fotografía sin fondo */}
        <div
          className= 'h-full w-full md:w-1/2 flex justify-center md:justify-center my-8 sm:my-10 p-4'
        >
          <div className="shadow rounded-sm brightness-110 contrast-150 saturate-0 hover:saturate-100 mr-5 relative w-1/3">
            <Image
              src={'/DaveDad.png'}
              layout="responsive"
              width={100}
              height={100}
              className="object-cover"
              alt="Dave"
            />
            <IconBar/>
          </div>
        </div>

        {/* Descripción */}
        <div className="ml-5 w-1/3">
         <CodeExample/>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
