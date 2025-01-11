import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token?: string;
    user: {
      id: string;
      role: "doctor" | "nurse" | "client" | "admin";
      access_token?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access_token?: string;
    user: {
      role: "doctor" | "nurse" | "client" | "admin";
      access_token?: string;
    } & DefaultSession["jwt"];
  }
}
