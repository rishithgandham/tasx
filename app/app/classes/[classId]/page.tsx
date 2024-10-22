import { getClass } from '@/actions/classes';
import { getTasks } from '@/actions/tasks';
import { AddClassDialog } from '@/components/function/AddClassDialog';
import { AddTaskDialog } from '@/components/function/AddTaskDialog';
import ClassTable from '@/components/function/ClassTable';
import { ClassTitle } from '@/components/function/ClassTitle';
import EditClassDialog from '@/components/function/EditClassDialog';
import { Badge } from '@/components/ui/badge';

import { ClassType } from '@/schema/classSchemas';
import React from 'react';

export default async function ClassId({
  params,
}: {
  params: {
    classId: string;
  };
}) {
  const { data, error } = await getClass(params.classId);


  const tasks = await getTasks(params.classId); // temporary solution -> move tasks fetching to client component ClassTable
  console.log(tasks) 
  return (error || tasks.error) ? ( // shoudnt be !data, refactor to !error
    <>
      <p className="mt-96 text-center">{`${error ? error : tasks.error}`}</p>
    </>
  ) : (
    <>
      <section className=" h-full w-full  justify-center ">
        <div className="container py-24 flex flex-col mx-auto">
          <ClassTitle c={data} />
          <hr className="border-border my-5" />
          <p className="text-2xl font-bold my-5 text-center">Your Tasks</p>
          <ClassTable c={data} tasks={tasks?.data} />
          <hr className="border-border my-5" />
        </div>
      </section>
    </>
  );
}
