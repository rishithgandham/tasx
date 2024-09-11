import { ClassType } from '@/schema/classSchemas';
import React from 'react';
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
import { useForm } from 'react-hook-form';
import { FormClass, formClassResolver } from '@/schema/classSchemas';
import { useState } from 'react';
import { editClass } from '@/actions/classes';
import { ToastAction } from '../ui/toast';
import { useToast } from '../hooks/use-toast';
import { RotateCw } from 'lucide-react';
export default function EditClassDialog({
  c,
  open,
  setOpen,
}: {
  c: ClassType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<FormClass>({
    resolver: formClassResolver,
    defaultValues: {
      name: c.name,
      description: c.description,
      teacher: c.teacher,
    },
  });
  const { toast } = useToast();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {c.name}</DialogTitle>
            <DialogDescription>
              Enter the following information to edit{' '}
              <span className="text-primary font-bold">{c.name}</span>
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async data => {
                const { error, message } = await editClass(
                  data as FormClass,
                  c.id
                );
                if (error) {
                  toast({
                    title: 'Error editing class',
                    description: error,
                    variant: 'destructive',
                  });
                } 
                if (message) {
                  toast({
                    title: 'Class Edited',
                    description: message,
                    variant: 'default',
                  });
                } 
                setOpen(false);
              })}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Honors 9 English 📚" />
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
                      <Input
                        {...field}
                        placeholder="English 9 Honors at 9:00 AM in room 216"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Mr. Smith" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-5">
                Edit Class
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
