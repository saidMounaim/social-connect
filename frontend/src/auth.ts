import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET as string,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      type: "credentials",
      async authorize(credentials) {
        if (credentials == null) return null;

        const { email, password } = credentials;

        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/JSON" },
        });

        const user = await res.json();
        if (user.error && user.error !== "") {
          throw new Error();
        }

        if (res.ok && user) {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
} satisfies NextAuthConfig;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
