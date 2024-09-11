import NextAuth, { CredentialsSignin, User } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firestoreAdmin, serviceAccount } from './firebase';
import { cert } from 'firebase-admin/app';

import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  adapter: FirestoreAdapter({
    credential: cert(serviceAccount),
  }),
  session: {
    strategy: 'jwt',
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
});

const credProvider = Credentials({
  name: 'Credentials',
  credentials: {
    username: { label: 'EmaiDl', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials): Promise<User | null> {
    // find user in firestore
    const query = await firestoreAdmin
      .collection('users')
      .where('email', '==', credentials.username)
      .get();
    const user = query.docs[0];

    // if user exists and has a password (not google or github)
    if (!user.exists || !user.data().password)
      throw new CredentialsSignin(
        'Invalid password or this account does not have a password: login with google or github'
      );

    const compare = await bcrypt.compare(
      credentials.password as string,
      user.data().password
    );
    if (!compare) throw new CredentialsSignin('password invalid');
    return {
      id: user.id,
      email: user.data().email,
      image: user.data().image,
      name: user.data().name,
    } as User;

    // if user not found return Credentials Error
    // compare password with hashed password
  },
});
