import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-gray-700 text-white flex flex-col justify-center items-center">
            <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">My Stats</h2>

        {/* Grid responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

          {/* Wakatime Stats */}
          {/* <div className="flex justify-center">
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
          </div> */}

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
          <div className="flex justify-center place-items-center">
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
      <div className="h-svh w-full p-5 text-center">
        <h2 className="text-3xl font-bold mb-4">My Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-2xl">5+ Years</p>
            <p>Industry Experience</p>
          </div>
          <div>
            <p className="text-2xl">20+ Projects</p>
            <p>Completed</p>
          </div>
          <div>
            <p className="text-2xl">15+ Clients</p>
            <p>Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
