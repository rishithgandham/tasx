'use client';

// create registration schema
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegistrationSchemaType,
  registrationSchema,
} from '@/app/register/registrationSchema';

// form icons/ui
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// server actions
import {
  logInWithGithub,
  logInWithGoogle,
  signUpWithCredentials,
} from '@/actions/auth';
import { useRef } from 'react';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
};

export function RegisterForm({}: {}) {
  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const [state, formAction] = useFormState(signUpWithCredentials, initialState);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <div className="col-span-1">
        <div className="mb-5">
          <p className="text-3xl font-bold tracking-tight">Register</p>
          <p className="mt-2 text-sm font-semibold">
            Have an account already?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800">
              Log In
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

        {/* <p className="my-7 text-center text-sm"> Or register with email and password</p>
         */}
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
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Rishith" />
                      </FormControl>
                      <FormDescription className="flex  gap-2">
                        Your first name <FormMessage />
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Gandham" />
                      </FormControl>
                      <FormDescription className="flex  gap-2">
                        Your last name <FormMessage />
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button
              onClick={form.handleSubmit(() => formRef?.current?.submit())}
              variant={'default'}
              className="w-full mt-3"
            >
              Register
            </Button>
            <p className="text-sm font-bold">{state.message}</p>
          </form>
        </Form>
      </div>
    </>
  );
}
