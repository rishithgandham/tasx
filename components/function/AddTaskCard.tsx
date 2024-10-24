'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { PlusCircle } from 'lucide-react';
import { AddTaskDialog } from './AddTaskDialog';
import { ClassType } from '@/schema/classSchemas';

export default function AddTaskCard({ c }: { c: ClassType }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Card className='md:col-span-1 col-span-2'>
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="flex flex-col justify-center  p-5 hover:cursor-pointer hover:bg-muted items-center h-full"
        >
          <PlusCircle size={24} />
          <p className="text-sm mt-2">Add Task</p>
        </div>
      </Card>

      <AddTaskDialog c={c} open={open} setOpen={setOpen} />
    </>
  );
}
