'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CalendarIcon, PlusIcon, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { FormClass, formClassResolver } from '@/schema/classSchemas';
import { useState } from 'react';
import { addClass } from '@/actions/classes';
import { useToast } from '../hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import {
  TaskForm,
  taskFormResolver,
  taskFormSchema,
} from '@/schema/taskSchemas';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { addTask } from '@/actions/tasks';

export function AddTaskDialog({
  classId,
  open,
  setOpen,
}: {
  classId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<TaskForm>({
    resolver: taskFormResolver,
  });

  const { toast } = useToast();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Task</DialogTitle>
            <DialogDescription>
              Enter the following information to add a task.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async data => {
                toast({
                  title: 'Task added: heres what we got',
                  description: JSON.stringify(data, null, 2),
                });
                const { message, error } = await addTask(data, classId);
              })}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Practice FRQ 3 📃 " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Found in AP Classroom" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => <DatePicker field={field} />}
              />
              <Button type="submit" className="mt-5">
                Add Class
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DatePicker({
  field,
}: {
  field: ControllerRenderProps<
    {
      name: string;
      description: string;
      dueDate: Date;
    },
    'dueDate'
  >;
}) {
  return (
    <FormItem className="">
      <FormLabel>Date Due</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value ? (
                format(field.value, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormDescription></FormDescription>
      <FormMessage />
    </FormItem>
  );
}
