import { auth, signOut } from '@/server/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Dashboard() {
  const session = await auth();

  return !session?.user ? (
    <>Hello</>
  ) : (
    <>
      <section className=" h-full flex justify-center ">
        <div className="container py-20 mx-auto">
          <p className="text-2xl md:text-3xl tracking-tight font-bold">
            Welcome, {session.user.name}
          </p>
          <p className="md:text-sm text-xs">
            You currently have 12 tasks, 3 quizzes upcoming{' '}
          </p>
          
        </div>
      </section>
    </>
  );
}
