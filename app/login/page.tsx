import React from 'react';
import Image, { type StaticImageData } from 'next/image';
// next auth
import { auth, signIn } from '@/server/auth';

import LoginForm from '@/components/function/LoginForm';
import { Card } from '@/components/ui/card';
import { loginSchema } from '@/app/login/loginSchema';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  return session?.user ? redirect('/app') : (
    <>
      <section className="h-full w-full ">
        <div className="flex h-full items-center justify-center p-5">
          <Card className="p-10 w-[40rem]">
            <LoginForm />
          </Card>
        </div>
      </section>
    </>
  );
}
