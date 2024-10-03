import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="text-white bg-black opacity-90 flex flex-col items-center justify-center pt-4 h-full">
      <h2 className="text-3xl font-bold mb-4 text-center">My Stats</h2>

      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8 w-full">
        
        {/* Grid responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full gap-4">

          {/* Wakatime Stats */}
          <div className="flex justify-center">
            <picture>
              <source
                srcSet="https://github-readme-stats.vercel.app/api/wakatime?username=davidongo93&show_icons=true&theme=algolia&bg_color=00000000"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="https://github-readme-stats.vercel.app/api/wakatime?username=davidongo93"
                alt="Wakatime Stats"
                className="w-full max-w-md"
              />
            </picture>
          </div>

          {/* Top Languages */}
          <div className="flex justify-center">
            <picture>
              <source
                srcSet="https://github-readme-stats.vercel.app/api/top-langs/?username=Davidongo93&langs_count=8&theme=algolia&bg_color=00000000"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=Davidongo93&langs_count=8"
                alt="Top Languages"
                className="w-full max-w-md"
              />
            </picture>
          </div>

          {/* GitHub Stats */}
          <div className="flex justify-center">
            <picture>
              <source
                srcSet="https://github-readme-stats.vercel.app/api?username=Davidongo93&show_icons=true&theme=shadow_blue&locale=es&include_all_commits=true"
                media="(prefers-color-scheme: dark)"
              />
              <img
                src="https://github-readme-stats.vercel.app/api?username=Davidongo93&show_icons=true"
                alt="GitHub Stats"
                className="w-full max-w-md"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Estadísticas Adicionales */}
      <div className="flex flex-col items-center text-center w-full p-5">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 w-full">
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg">
            <p className="text-2xl">15+ Years</p>
            <p>Industry Experience</p>
          </div>
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg">
            <p className="text-2xl">6+ Projects</p>
            <p>Completed</p>
          </div>
          <div className="bg-gray-600 p-4 rounded-lg shadow-lg">
            <p className="text-2xl">5+ Clients</p>
            <p>Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
