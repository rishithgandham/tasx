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
