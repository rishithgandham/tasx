import { getClass } from '@/actions/classes';
import { getTasks } from '@/actions/tasks';
import { AddClassDialog } from '@/components/function/AddClassDialog';
import AddTaskCard from '@/components/function/AddTaskCard';
import { AddTaskDialog } from '@/components/function/AddTaskDialog';
import ClassTable from '@/components/function/ClassTable';
import { ClassTitle } from '@/components/function/ClassTitle';
import EditClassDialog from '@/components/function/EditClassDialog';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { ClassType } from '@/schema/classSchemas';
import React from 'react';

export default async function ClassId({
  params,
  searchParams,
}: {
  params: {
    classId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  const { data, error } = await getClass(params.classId);

  const { data: tasks, error: taskError } = await getTasks(params.classId); // temporary solution -> move tasks fetching to client component ClassTable
  const countCompleted = tasks.filter(t => t.completed).length;
  const progress = (countCompleted / tasks.length) * 100;

  return error || taskError ? ( // shoudnt be !data, refactor to !error
    <>
      <p className="mt-96 text-center">{`${error ? error : taskError}`}</p>
    </>
  ) : (
    <>
      <section className=" h-full w-full  justify-center ">
        <div className="container py-24 flex flex-col mx-auto">
          <ClassTitle c={data} />
          <hr className="border-border my-5" />
          <Cards
            c={data}
            progress={progress}
            length={tasks.length}
            countCompleted={countCompleted}
          />
          <ClassTable searchId={searchParams.id as string} c={data} tasks={tasks} />
          <hr className="border-border my-5" />
        </div>
      </section>
    </>
  );
}

function Cards({
  progress,
  length,
  countCompleted,
  c,
}: {
  progress: number;
  length: number;
  countCompleted: number;
  c: ClassType;
}) {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-5">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Completed Tasks</CardDescription>
          <CardTitle className="text-3xl">
            {countCompleted}/{length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            You have completed {countCompleted} tasks. You have{' '}
            {length - countCompleted} tasks remaining
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={Math.round(progress)} aria-label="75% completed" />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Overall Progress</CardDescription>
          <CardTitle className="text-4xl">{Math.round(progress)}%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground"></div>
        </CardContent>
        <CardFooter>
          <Progress value={progress} aria-label="68% overall progress" />
        </CardFooter>
      </Card>
      <AddTaskCard c={c} />
    </div>
  );
}
