import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiInstance } from "../../apiInstance";
import { API_URL } from "../../api-url";

// Utility functions for handling localStorage
const saveSessionToLocalStorage = (session: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("offline-session", JSON.stringify(session));
  }
};

const getSessionFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("offline-session");
    return session ? JSON.parse(session) : null;
  }
  return null;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          // Online authentication via Supabase API
          const body = {
            email: credentials?.email.trim(),
            password: credentials?.password.trim(),
          }
          const response = await apiInstance.post(API_URL.SIGN_IN, body)
          // const user = response?.data?.data
          const user = {
            email: response?.data?.user.email,
            image: "",
            name: `${response?.data.first_name} ${response?.data.last_name}`,
            id: response?.data?.id.toString(),
            role: 'client', // response?.data?.role_id,
            access_token: response?.data?.session?.access_token,
            refresh_token: response?.data?.session?.refresh_token,
          }

          // Save session locally for offline mode
          saveSessionToLocalStorage(user);

          return user; // Return user details for session creation
        } catch (error) {
          // Fallback to offline session if available
          const offlineSession = getSessionFromLocalStorage();
          if (offlineSession) {
            return offlineSession;
          }
          throw new Error("Unable to authenticate. Check your connection.");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user as any; // Thêm thông tin user vào token
        token.access_token = (user as any).access_token; // Lưu access_token vào token
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user = token.user; // Đính kèm user vào session
        session.access_token = token.access_token; // Đính kèm access_token vào session
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
