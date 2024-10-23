import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth, signOut } from '@/server/auth';
import { Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { redirect } from 'next/navigation';
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { getTasks, getTasksFlat } from '@/actions/tasks';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { formatDistance } from 'date-fns';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import DashboardTaskTable from '@/components/function/DashboardTaskTable';
import { LayoutDashboard } from 'lucide-react';

export default async function Dashboard() {
  // const session = await auth();

  const { data: tasksFlat, error } = await getTasksFlat();
  console.log(tasksFlat);

  const countCompleted = tasksFlat.filter(t => t.completed).length;
  const progress = (countCompleted / tasksFlat.length) * 100;

  const hash = new Map<string, number>();
  tasksFlat.forEach(t => {
    if (!t.completed) {
      hash.set(t.class_name, (hash.get(t.class_name) || 0) + 1);
    }
  });
  const entries = Array.from(hash.entries());
  const most = entries.sort((a, b) => b[1] - a[1])[0];
  console.log(hash);

  return (
    <>
      <section className=" h-full w-full  justify-center ">
        <div className="container py-20 flex flex-col mx-auto">
          <p className="text-2xl md:text-4xl tracking-tighter font-bold">
            Dashboard ⚒️...
          </p>
          <p className="text-muted-foreground text-xs">
            You currently have 12 tasks, 3 quizzes upcoming{' '}
          </p>
          {/* statistics in blocks */}
          <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="">
              <CardHeader className="">
                <CardTitle>tasx</CardTitle>
                <CardDescription className="max-w-lg text-balance ">
                  Manage your tasks and assignments for each of your classes.
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button>read more</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Completed tasks</CardDescription>
                <CardTitle className="text-3xl">
                  {countCompleted}/{tasksFlat.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  You have completed {countCompleted} tasks. You have{' '}
                  {tasksFlat.length - countCompleted} tasks remaining
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={Math.round(progress)}
                  aria-label="75% completed"
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Overall Progress</CardDescription>
                <CardTitle className="text-4xl">
                  {Math.round(progress)}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground"></div>
              </CardContent>
              <CardFooter>
                <Progress value={progress} aria-label="68% overall progress" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Most Incomplete Class</CardDescription>
                <CardTitle className="text-3xl text-destructive font-bold">
                  {entries.length > 0 ? most[0] : 'N/A'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {entries.length > 0 ? most[1] : 0} tasks incomplete
                </div>
              </CardContent>
            </Card>
          </div>

          {/* dashboard classes table */}
          <div className="mt-10">
            {/* <p className="text-3xl font-bold my-5 ">Your Tasks</p> */}
            <DashboardTaskTable tasks={tasksFlat} />
          </div>
        </div>
      </section>
    </>
  );
}
