
import Image from 'next/image';
import IconBar from '../IconBar/IconBar';
import CodeButton from '../CodeButton/CodeButton';
const code = `(() => "fullStackDeveloper")();`;

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="text-white bg-black opacity-95"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="w-screen flex flex-col md:flex-row-reverse items-center justify-between p-4 max-w-screen-lg mx-auto h-full">
        {/* Fotografía sin fondo + IconBar */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center mx-8">
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

          <div className="flex flex-col items-center justify-center mt-4 space-y-4">
            <IconBar />
          </div>
        </div>

        {/* hire me */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <h4 className="text-2xl text-center mb-4">David Orlando Miranda <code><strong>{code}</strong></code></h4>
          <CodeButton textButton="Hire Me!" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
