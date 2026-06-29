import type { Config } from 'drizzle-kit';

// Run with the DB url injected, e.g.:
//   DATABASE_URL=... npx drizzle-kit push --config=drizzle.config.ts
export default {
  schema: './apps/daev/src/db/schema.ts',
  out: './apps/daev/drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
  verbose: true,
  strict: true,
} satisfies Config;
