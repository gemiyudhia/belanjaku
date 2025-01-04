import { login, loginWithGoogle } from "@/lib/firebase/service";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export interface ExtendedUser extends User {
  role: string;
}

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const response = await login({ email, password });

        if (!response.status || !response.user) {
          throw new Error(response.message || "Login failed");
        }

        return {
          email: response.user.email,
          role: response.user.role,
        } as ExtendedUser;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        if ("role" in user) {
          token.role = (user as ExtendedUser).role;
        }
      }

      if (account?.provider === "google" && user?.email) {
        const data = {
          email: user.email,
          type: "google",
        };

        await loginWithGoogle(data, (result) => {
          if (result.status) {
            token.email = result.data.email;
            token.role = result.data.role;
          }
        });
      }

      return token;
    },

    async session({ session, token }) {
      if (token.email) {
        session.user = {
          ...session.user,
          email: token.email,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
