import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Neon's HTTP driver: one round-trip per query, ideal for serverless (Vercel)
// where we don't keep long-lived TCP connections. No transactions, which is
// fine for our comment/reaction queries.
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
