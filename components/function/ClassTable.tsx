'use client';

import { ClassType } from '@/schema/classSchemas';
import React, { useState } from 'react';
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
import { TaskType } from '@/schema/taskSchemas';
import { compareAsc, formatDistance } from 'date-fns';

export default function ClassTable({
  c,
  tasks,
}: {
  c: ClassType;
  tasks: TaskType[];
}) {
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);

  return (
    <>
      <Table>
        <TableCaption>A list of your tasxs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-left">Task Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date Due</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks
            .sort((t, b) => compareAsc(t.dueDate, b.dueDate))
            .map(t => (
              <TableRow key={t.id}>
                <TableCell>{t.name}</TableCell>
                <TableCell>
                  {t.description.slice(0, 35).concat('...')}
                </TableCell>
                <TableCell>
                  {formatDistance(t.dueDate, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  {t.completed ? 'completed' : 'incomplete'}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-sm">
              <button
                className="w-full"
                onClick={() => setAddTaskDialogOpen(true)}
              >
                + Add Task
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <AddTaskDialog
        classId={c.id}
        open={addTaskDialogOpen}
        setOpen={setAddTaskDialogOpen}
      />
    </>
  );
}
