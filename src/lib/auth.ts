import NextAuth from 'next-auth';
import NextAuthConfig from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma';
import bcrypt from 'bcryptjs';

const config: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });
        if (!user) {
          console.log('No user found');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if(!passwordsMatch) {
          console.log("invalid credentials");
          return null;
        }

        return user;
      },
    }) 
  ],
  callbacks: {
    authorized: ({ request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');

      if (isTryingToAccessApp) {
        return false;
      } else {
        return true;
      }
    }
  }
} satisfies typeof NextAuthConfig;

export const { auth } = NextAuth(config);
