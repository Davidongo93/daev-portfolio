// components/SkillsSection/SkillsSection.tsx
const SkillsSection: React.FC = () => {
    return (
      <section id="skills" className=" z-10 flex bg-gray-800">
        <div className="mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <ul className="list-disc list-inside">
                <li>React</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Backend</h3>
              <ul className="list-disc list-inside">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Tools</h3>
              <ul className="list-disc list-inside">
                <li>Git</li>
                <li>Docker</li>
                <li>Webpack</li>
                <li>REST APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default SkillsSection;
  