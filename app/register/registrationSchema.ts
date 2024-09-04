import { z } from 'zod';
export const registrationSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8, {
    message: 'Password must be at least 8 characters',
  }), // TODO: make sure password meets requirements
  firstName: z.string().trim().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().trim().min(1, {
    message: 'Last name is required',
  }),
});
export type RegistrationSchemaType = z.infer<typeof registrationSchema>;