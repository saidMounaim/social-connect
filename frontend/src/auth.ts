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
    session: async ({ session, token }: any) => {
      session.user.id = token.sub;
      session.user.access_token = token.access_token;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        token.access_token = user.access_token;
      }
      if (trigger === "update") {
        token.name = session.name;
        token.image = session.image;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
