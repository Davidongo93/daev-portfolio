import { Link } from 'react-scroll';

const ExperienceSection: React.FC = () => {
  return (
    <section className="bg-gray-800 text-white flex flex-col justify-center items-center">
      <div className=" w-auto  flex flex-col-reverse justify-center md:flex-row-reverse md:mt-12 items-center bg-black">
        <h2 className="text-3xl font-bold mb-4">Experience</h2>
        <ul className="list-disc mb-4 text-left">
          <li>Company A - Senior Developer</li>
          <li>Company B - Full Stack Developer</li>
          <li>Company C - Frontend Engineer</li>
        </ul>
        <div className="flex space-x-4">
          <img src="/logoA.png" alt="Logo A" className="h-8 w-auto" />
          <img src="/logoB.png" alt="Logo B" className="h-8 w-auto" />
          <img src="/logoC.png" alt="Logo C" className="h-8 w-auto" />
        </div>
        <Link to="contact" smooth={true} duration={500} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">
          Contact Me
        </Link>
      </div>
    </section>
  );
};

export default ExperienceSection;
