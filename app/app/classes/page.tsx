import { getClasses } from '@/actions/classes';
import { AddClassDialog } from '@/components/function/AddClassDialog';
import ClassButton from '@/components/function/ClassButton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { auth } from '@/server/auth';
import { EllipsisVertical, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const session = await auth();
  let { data, error } = await getClasses();
  return session?.user ? (
    <>
      <section className=" h-full w-full  justify-center ">
        <div className="container py-24 flex flex-col mx-auto">
          <p className="text-2xl  md:text-4xl tracking-tighter font-bold">
            Your classes...
          </p>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-10">
            {data?.map(c => (
              <ClassButton key={c.id} c={c} />
            ))}
            {data?.length === 0 && (
              <Card className="p-5  h-full">
                <CardContent className="p-0 flex-col flex justify-center items-center h-full">
                  <CardTitle className="text-muted-foreground text-md">
                    No classes found
                  </CardTitle>
                  <p className="text-muted-foreground text-sm text-center">
                    You have not added any classes yet. Click Add Class to get started
                  </p>
                </CardContent>
              </Card>
            )}

            <AddClassDialog>
              <Card className="p-5 hover:bg-muted h-full">
                <CardContent className="p-0 flex-col flex justify-center items-center h-full">
                  <PlusIcon size={24} className="text-muted-foreground" />
                  <p className="text-muted-foreground">Add Class</p>
                </CardContent>
              </Card>
            </AddClassDialog>
          </div>
        </div>
      </section>
    </>
  ) : (
    redirect('/login')
  );
}
