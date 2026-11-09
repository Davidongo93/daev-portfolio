//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Old or guessed URLs that Google has seen: send them to the live page.
  async redirects() {
    return [
      {
        source: '/blog/Breve%20historia%20del%20programador',
        destination: '/blog/breve-historia-del-programador',
        permanent: true,
      },
      { source: '/work', destination: '/trabajo', permanent: true },
      { source: '/en/trabajo', destination: '/en/work', permanent: true },
      { source: '/en/blog', destination: '/blog', permanent: true },
    ];
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Allow Google-hosted profile photos (lh#.googleusercontent.com)
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      // Facebook profile thumbnails (if used)
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      // GitHub avatars
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
