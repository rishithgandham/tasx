'use client';

import { ClassType } from '@/schema/classSchemas';
import React, { useState, ReactNode, ReactElement } from 'react';
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/ui/table';
import { AddTaskDialog } from './AddTaskDialog';
import { TaskForm, TaskType } from '@/schema/taskSchemas';
import { compareAsc, formatDistance, set } from 'date-fns';
import { Button } from '../ui/button';
import { Delete, Edit, Ellipsis, EllipsisVertical, Trash } from 'lucide-react';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { editTask, setTaskComplete } from '@/actions/tasks';
import { useToast } from '../hooks/use-toast';
import EditTaskDialog from './EditTaskDialog';
import { DeleteClassDialog } from './DeleteClassDialog';
import DeleteTaskDialog from './DeleteTaskDialog';
import { HoverCard, HoverCardContent } from '../ui/hover-card';
import { HoverCardTrigger } from '@radix-ui/react-hover-card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function DashboardTasksTable({ tasks }: { tasks: TaskType[] }) {
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false);
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);

  const { toast } = useToast();

  async function setComplete(t: TaskType) {
    const { message, error } = await setTaskComplete(t.class_id, t.id, true);
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Task Updated',
        description: message,
        variant: 'default',
      });
    }
  }

  async function setIncomplete(t: TaskType) {
    const { message, error } = await setTaskComplete(t.class_id, t.id, false);

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Task Updated',
        description: message,
        variant: 'default',
      });
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-left">Task Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date Due</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Class</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks
            // .sort((t, b) => compareAsc(t.dueDate, b.dueDate))
            .map(t => (
              <>
                <TableRow key={t.dueDate.toDateString()}>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger className={'hover:cursor-pointer'}>
                        {t.description.slice(0, 35).concat('...')}
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <span className="font-bold">Description:</span>
                        {t.description}
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger
                        className={cn(
                          new Date() > t.dueDate && !t.completed
                            ? 'text-destructive'
                            : '',
                          'hover:cursor-pointer'
                        )}
                      >
                        {formatDistance(t.dueDate, new Date(), {
                          addSuffix: true,
                        })}
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <span className="font-bold">Due Date: </span>
                        {t.dueDate.toDateString()}
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Badge
                          variant={t.completed ? 'default' : 'destructive'}
                        >
                          {t.completed ? 'complete' : 'incomplete'}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setComplete(t)}
                          className=" hover:cursor-pointer text-muted-foreground hover:text-primary"
                        >
                          <Badge variant={'default'}>complete</Badge>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setIncomplete(t)}
                          className="flex items-center justify-between hover:cursor-pointer text-muted-foreground hover:text-primary"
                        >
                          <Badge variant={'destructive'}>incomplete</Badge>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} size={'sm'}>
                          <Ellipsis />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setOpenEditTaskDialog(true)}
                          className="hover:cursor-pointer flex justify-between  text-muted-foreground hover:text-primary"
                        >
                          <Edit size={16} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setOpenDeleteTaskDialog(true)}
                          className="hover:cursor-pointer flex gap-4 justify-between text-destructive/90 hover:text-destructive"
                        >
                          <Trash size={16} />
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <Link className='hover:underline' href={`/app/classes/${t.class_id}`}>{t.class_name}</Link>
                  </TableCell>
                  <EditTaskDialog
                    t={t}
                    classId={t.class_id}
                    taskId={t.id}
                    open={openEditTaskDialog}
                    setOpen={setOpenEditTaskDialog}
                  />
                  <DeleteTaskDialog
                    classId={t.class_id}
                    t={t}
                    open={openDeleteTaskDialog}
                    setOpen={setOpenDeleteTaskDialog}
                  />
                </TableRow>
              </>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
