import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="text-white bg-black flex flex-col items-center justify-center h-auto py-12">
      <h2 className="text-4xl font-bold mb-6 text-center">My Stats</h2>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        
        {/* Wakatime Stats */}
        <div className="flex justify-center">
          <picture>
            <img
              src="https://github-readme-stats.vercel.app/api/wakatime?username=davidongo93"
              alt="Wakatime Stats"
              className="w-full max-w-sm"
            />
          </picture>
        </div>

        {/* Top Languages */}
        <div className="flex justify-center">
          <picture>
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=Davidongo93&langs_count=8"
              alt="Top Languages"
              className="w-full max-w-sm"
            />
          </picture>
        </div>

        {/* GitHub Stats */}
        <div className="flex justify-center">
          <picture>
            <img
              src="https://github-readme-stats.vercel.app/api?username=Davidongo93&show_icons=true"
              alt="GitHub Stats"
              className="w-full max-w-sm"
            />
          </picture>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-12 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center px-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-3xl font-bold">15+ Years</p>
          <p>Industry Experience</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-3xl font-bold">6+ Projects</p>
          <p>Completed</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-3xl font-bold">5+ Clients</p>
          <p>Worldwide</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
