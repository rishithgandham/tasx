'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PlusIcon, RotateCw } from 'lucide-react';
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
import { addClass } from '@/actions/classes';
import { useToast } from '../hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

export function AddClassDialog({ children }: { children: React.ReactNode }) {
  const form = useForm<FormClass>({
    resolver: formClassResolver,
    defaultValues: {
      name: '',
      description: '',
      teacher: '',
    },
  });

  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Class</DialogTitle>
            <DialogDescription>
              Enter the following information to add a class.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async data => {
                const { error, message } = await addClass(data as FormClass);
                if (error) {
                  toast({
                    title: 'Error adding class',
                    description: error,
                    variant: 'destructive',
                  });
                } // TODO: toast error
                else {
                  toast({
                    title: 'Class Added',
                    description: message,
                    variant: 'default',
                  });
                  form.reset();
                } // TODO: toast success
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
                Add Class
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
