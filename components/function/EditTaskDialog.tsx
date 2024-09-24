import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import {
  TaskForm,
  taskFormResolver,
  taskTypeResolver,
  type TaskType,
} from '@/schema/taskSchemas';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { editTask } from '@/actions/tasks';
import { useToast } from '../hooks/use-toast';

export default function EditTaskDialog({
  t,
  classId,
  taskId,
  open,
  setOpen,
}: {
  t: TaskType;
  classId: string;
  taskId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<TaskForm>({
    resolver: taskFormResolver,
    defaultValues: {
      name: t.name,
      description: t.description,
      dueDate: t.dueDate,
    },
  });
  const { toast } = useToast();
  return (
    <>
      <Dialog open={open} onOpenChange={() => {
        setOpen(false);
        form.reset(); 
      }}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Edit Task: {t.name}</DialogTitle>
            <DialogDescription>
              Enter the following information to edit this task.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async data => {
                
                const { message, error } = await editTask(
                  data,
                  classId,
                  taskId
                );

                if (error) {
                  toast({
                    title: 'Error',
                    description: message,
                    variant: 'destructive'
                  });
                } else {
                  toast({
                    title: 'Task Edited',
                    description: message,
                    variant: 'default',
                  });
                  setOpen(false);
                }
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
                Edit Task
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
