import NextAuth from 'next-auth';
import NextAuthConfig from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma';
import bcrypt from 'bcrypt';

const config = {
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = prisma.user.findUnique({
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
      }
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
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
