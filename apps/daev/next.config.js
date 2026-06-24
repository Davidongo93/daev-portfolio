//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
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
    ],
  },
  experimental: {
    // The blog OG image route is a dynamic route handler, so Next does not
    // auto-bundle the markdown it reads at runtime (unlike the prerendered post
    // page). Without these files in the serverless bundle the read fails on
    // Vercel and the OG card falls back to the plain branded variant. Include
    // the posts so the photo + title card renders in production.
    outputFileTracingIncludes: {
      '/blog/[slug]/opengraph-image': ['./posts/**/*.md'],
    },
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
