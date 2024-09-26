import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="py-20 bg-gray-800 text-white">
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
    </section>
  );
};

export default StatsSection;
