import NextAuth from 'next-auth';
import NextAuthConfig from 'next-auth';

export const { auth } = NextAuth(config);

const config = {
  pages: {
    signIn: '/login'
  },
  providers: [],
  callbacks: 
} satisfies NextAuthConfig;
