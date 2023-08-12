import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { getEnvSafely } from "env/config";
import { NextAuthOptions } from "next-auth";

export const authOptions : NextAuthOptions = {
  secret: getEnvSafely('NEXTAUTH_SECRET'),
  adapter: undefined,
  providers: [
    GitHubProvider({
      clientId: getEnvSafely('GITHUB_CLIENT_ID'),
      clientSecret: getEnvSafely('GITHUB_CLIENT_SECRET'),
    }),
    FacebookProvider({
        clientId: getEnvSafely('FACEBOOK_CLIENT_ID'),
        clientSecret: ('FACEBOOK_CLIENT_SECRET')
    }),
    GoogleProvider({
        clientId: getEnvSafely('GOOGLE_CLIENT_ID'),
        clientSecret: getEnvSafely('GOOGLE_CLIENT_SECRET')
    })
  ],
  pages: {
    signIn: ''
  },
  callbacks: {
    async session({ session, token, user }) {
        if (session?.user) {
            session.user.id = user.id;
            session.user.avatar = user.avatar;
            session.user.first_name = user.first_name;
            session.user.last_name = user.last_name;
            session.user.email = user.email;
            session.user.store_id = user.store_id;
            session.user.phone = user.phone;
            session.user.birthday = user.birthday;
        }
        return session
    }
  },
};

export default authOptions;