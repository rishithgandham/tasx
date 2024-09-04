import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import { redirect } from 'next/navigation';

// next auth functions
import { auth, signIn } from '@/server/auth';
// components
import { RegisterForm } from '@/components/function/RegisterForm';
import { Card } from '@/components/ui/card';

// for credentials auth
import { firestoreAdmin } from '@/server/firebase';
import { hashPassword } from '@/server/bcrypt_config';

import {
  RegistrationSchemaType,
  registrationSchema,
} from '@/app/register/registrationSchema';

export default async function RegisterPage() {
  const session = await auth();

  async function signUpWithCredentials(formData: FormData) {
    'use server';

    // server side check data is valid
    const data = Object.fromEntries(formData);
    const parsed = registrationSchema.safeParse(data);

    if (!parsed.success) return console.log('invalid data');

    // see if user exist in firestore, if user exist return error
    const query = await firestoreAdmin
      .collection('users')
      .where('email', '==', data.email.toString())
      .get();
    if (query.size > 0) return console.log('user already exist: ', query);

    // hash password
    const hashed = await hashPassword(data.password.toString());

    // create user account in firestore.
    try {
      const userRef = await firestoreAdmin.collection('users').add({
        email: data.email.toString(),
        password: hashed,
        name: `${data.firstName.toString()} ${data.lastName.toString()}`,
        image: null,
        emailVerified: null,
        // add extra fields here
      });
    } catch (error) {
      console.log('error creating user: ', error);
    }

    // sign in user
    // signIn('credentials', new FormData(
    //   JSON.stringify({
    //     username: data.email,
    //     password: data.password,
    //   }),
    // ));
  }

  return session?.user ? (
    redirect('/app')
  ) : (
    <>
      <section className="h-full w-full bg-gradient-to-br bg-background">
        <div className="flex h-full items-center justify-center p-5">
          <Card className="p-10 w-[40rem]">
            <RegisterForm />
          </Card>
        </div>
      </section>
    </>
  );
}

function AuthInput({
  name,
  placeholder,
  password,
}: {
  name: string;
  placeholder?: string;
  password?: boolean;
}) {
  return <></>;
}
