import CodeButton from '../CodeButton/CodeButton';

const ExperienceSection: React.FC = () => {
  return (
    <section
      className="text-white bg-black opacity-95 flex flex-col justify-between"
      style={{ minHeight: 'calc(100vh - 4rem)' }} // Ajusta la altura restando h-16 del header
    >
      <div className="w-screen flex flex-col md:flex-row items-center justify-between mt-8 p-4 max-w-screen-lg mx-auto h-full gap-6">
        {/* Título y descripción */}
        <div className="w-full md:w-1/2 text-left mb-8 md:mb-0">
          <h2 className="text-5xl font-bold mb-6 text-blue-400">Experience</h2>

          <p className="text-lg text-gray-300 mb-8">
            I am a highly motivated and detail-oriented developer who thrives in both independent and collaborative settings. My problem-solving skills, combined with a passion for clean and scalable code, enable me to deliver solutions efficiently. I prioritize communication and clarity in every project, ensuring that goals are met with precision.
          </p>

          <CodeButton textButton="Contact Me!" />
        </div>

        {/* Tabla de experiencia */}
        <div className="w-full md:w-1/2 text-left">
          <table className="w-full text-left text-gray-300 mb-6">
            <thead className="border-b-2 border-gray-700">
              <tr>
                <th className="pb-2">Company</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Responsibilities</th>
                <th className="pb-2">Period</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">AppTender</td>
                <td className="py-2">Junior Backend Developer</td>
                <td className="py-2">Developed backend APIs, collaborated with frontend teams, optimized database queries.</td>
                <td className="py-2">2021-2022</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Invicto</td>
                <td className="py-2">Backend Developer (Freelance)</td>
                <td className="py-2">Designed RESTful services, handled server-side logic, integrated third-party APIs.</td>
                <td className="py-2">2022-2023</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Rescatista</td>
                <td className="py-2">Frontend Engineer (Freelance)</td>
                <td className="py-2">Implemented responsive UIs, worked on performance optimizations, contributed to design discussions.</td>
                <td className="py-2">2023-Present</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Logos */}
      <div className="relative left-0 w-full backdrop-blur-lg bg-black bg-opacity-50 py-4 flex justify-center space-x-6 items-center">
        <img
          src="/icons/appTender.svg"
          alt="AppTender"
          className="h-12 w-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
        />
        <img
          src="/icons/invicto.png"
          alt="Invicto"
          className="h-12 w-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
        />
        <img
          src="/icons/rescatista.png"
          alt="Rescatista"
          className="h-12 w-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
