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

interface Task {
  name: string;
  description: string;
  due: Date;
  completed: boolean;
  type: 'homework' | 'classwork' | 'quiz' | 'project';
}
interface Class {
  name: string;
  description: string;
  tasks: Task[];
}

const classes: Class[] = [
  {
    name: 'Math',
    description: 'Math Class',
    tasks: [
      {
        name: 'Algebra 2 Homework',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow's date
        completed: true,
        type: 'homework',
      },
      {
        name: 'Algebra 2 Quiz',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow's date
        completed: false,
        type: 'quiz',
      },
      {
        name: 'Algebra 2 Project',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // Three days from now
        completed: true,
        type: 'project',
      },
    ],
  },
  {
    name: 'Science',
    description: 'Science Class',
    tasks: [
      {
        name: 'Biology Homework',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // Four days from now
        completed: false,
        type: 'homework',
      },
      {
        name: 'Biology Quiz',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // Five days from now
        completed: true,
        type: 'quiz',
      },
      {
        name: 'Biology Project',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000), // Six days from now
        completed: false,
        type: 'project',
      },
    ],
  },
  {
    name: 'English',
    description: 'English Class',
    tasks: [
      {
        name: 'English Homework',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Seven days from now
        completed: true,
        type: 'homework',
      },
      {
        name: 'English Quiz',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 8 * 24 * 60 * 60 * 1000), // Eight days from now
        completed: false,
        type: 'quiz',
      },
      {
        name: 'English Project',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000), // Nine days from now
        completed: true,
        type: 'project',
      },
    ],
  },
  {
    name: 'History',
    description: 'History Class',
    tasks: [
      {
        name: 'History Homework',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // Ten days from now
        completed: false,
        type: 'homework',
      },
      {
        name: 'History Quiz',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 11 * 24 * 60 * 60 * 1000), // Eleven days from now
        completed: true,
        type: 'quiz',
      },
      {
        name: 'History Project',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000), // Twelve days from now
        completed: false,
        type: 'project',
      },
    ],
  },
  {
    name: 'Spanish',
    description: 'Spanish Class',
    tasks: [
      {
        name: 'Spanish Homework',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 13 * 24 * 60 * 60 * 1000), // Thirteen days from now
        completed: false,
        type: 'homework',
      },
      {
        name: 'Spanish Quiz',
        description: 'Complete the odd problems',
        due: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // Fourteen days from now
        completed: true,
        type: 'quiz',
      },
    ],
  },
];

export default async function Dashboard() {
  const session = await auth();
  return !session?.user ? (
    redirect('/login')
  ) : (
    <>
      <section className=" h-full w-full  justify-center ">
        <div className="container py-20 flex flex-col mx-auto">
          <p className="text-3xl md:text-3xl tracking-tighter font-bold">
            Dashboard 🖥️ ...
          </p>
          <p className="text-muted-foreground text-xs">
            You currently have 12 tasks, 3 quizzes upcoming{' '}
          </p>

          <div className="mt-10">
            <Tabs defaultValue={classes[0].name} className="w-full">
              <TabsList>
                {classes.map(c => (
                  <TabsTrigger key={c.name} value={c.name}>
                    {c.name}
                  </TabsTrigger>
                ))}
                <TabsTrigger value="All">All</TabsTrigger>
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className="hover:bg-background"
                >
                  +
                </Button>
              </TabsList>
              {classes.map(c => (
                <TabsContent key={c.name} value={c.name}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{c.name}</CardTitle>
                      <CardDescription>{c.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Type
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Due Date
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {c.tasks.map(t => (
                            <TableRow key={t.name}>
                              <TableCell>
                                <div className="font-medium">{t.name}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {t.type}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge
                                  className="text-xs"
                                  variant={
                                    t.completed ? 'default' : 'destructive'
                                  }
                                >
                                  {t.completed ? 'done' : 'not done'}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {t.due.toDateString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <Button>Add New Task</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
              <TabsContent value="All">
                <Card>
                  <CardHeader>
                    <CardTitle>All Tasks</CardTitle>
                    <CardDescription>
                      All tasks from all classes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Due Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classes
                          .flatMap(c => c.tasks)
                          .map(t => (
                            <TableRow key={t.name}>
                              <TableCell>
                                <div className="font-medium">{t.name}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {t.type}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge
                                  className="text-xs"
                                  variant={
                                    t.completed ? 'default' : 'destructive'
                                  }
                                >
                                  {t.completed ? 'done' : 'not done'}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {t.due.toDateString()}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button>Add New Task</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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
                  {
                    classes.flatMap(c => c.tasks).filter(t => t.completed)
                      .length
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  3 more than last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={75} aria-label="75% completed" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Overall Progress</CardDescription>
                <CardTitle className="text-4xl">68%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +5% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={68} aria-label="68% overall progress" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
