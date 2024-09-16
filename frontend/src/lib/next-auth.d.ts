import "next-auth";

declare module "next-auth" {
  interface User {
    isAdmin: boolean;
    access_token: string;
  }
  interface Session {
    user?: {
      id: number;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}
