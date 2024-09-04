'use client';
import React, { useRef } from 'react';

// ui components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';

// use form / form state
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaType } from '../../app/login/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';

// server actions
import {
  logInWithGithub,
  logInWithGoogle,
  signInWithCredentials,
} from '@/actions/auth';

const initialState = {
  message: '',
};

export default function LoginForm({}: {}) {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [state, formAction] = useFormState(signInWithCredentials, initialState);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <div className="col-span-1">
        <div className="mb-5">
          <p className="text-3xl font-bold tracking-tight">Sign in</p>
          <p className="mt-2 text-sm font-semibold">
            Dont have an account?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-800">
              Sign up
            </a>
          </p>
        </div>

        {/* sign in with google/github buttons */}
        <div className="flex gap-5">
          <form className="w-full" action={logInWithGoogle}>
            <Button className="w-full" type="submit">
              <FaGoogle />
            </Button>
          </form>
          {/* sign in with github button */}
          <form className="w-full" action={logInWithGithub}>
            <Button className="w-full" type="submit">
              <FaGithub />
            </Button>
          </form>
        </div>

        <div className="divide-x-2 my-5" />

        {/* registration form - credentials provider */}
        <Form {...form}>
          <form action={formAction} ref={formRef} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="rishith.gandham@gmail.com"
                      />
                    </FormControl>
                    <FormDescription className="flex  gap-2">
                      Your email <FormMessage />
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="......" />
                    </FormControl>
                    <FormDescription className="flex  gap-2">
                      Password <FormMessage />
                    </FormDescription>
                  </FormItem>
                );
              }}
            />

            <Button
              onClick={form.handleSubmit(() => formRef.current?.submit())}
              variant={'default'}
              className="w-full mt-3"
            >
              Register
            </Button>
            <p className={'text-sm font-medium '}>{state.message}</p>
          </form>
        </Form>
      </div>
    </>
  );
}
