import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db';
import { accounts, sessions, users, verificationTokens } from './db/schema';

// Auth.js v5 reads AUTH_SECRET, AUTH_GOOGLE_ID/SECRET and AUTH_FACEBOOK_ID/SECRET
// from the environment automatically. Sessions live in Neon via the Drizzle
// adapter, so each comment/reaction is tied to a real user row we can moderate.
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google, Facebook],
  session: { strategy: 'database' },
  trustHost: true,
  callbacks: {
    // Expose the internal user id on the session so the client knows which
    // comments/reactions belong to the logged-in user (own-delete, toggles).
    session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
});
