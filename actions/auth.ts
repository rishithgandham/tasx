'use server';
import { redirect } from 'next/navigation';

// schemas
import { loginSchema } from '@/app/login/loginSchema';
import { registrationSchema } from '@/app/register/registrationSchema';

// auth
import { signOut, signIn } from '@/server/auth';
import { hashPassword } from '@/server/bcrypt_config';

// firebase
import { firestoreAdmin } from '@/server/firebase';

export async function logOut() {
  await signOut({ redirectTo: '/' });
}

// logins
export async function logInWithGoogle() {
  await signIn('google', { redirectTo: '/app' });
}

export async function logInWithGithub() {
  await signIn('github', { redirectTo: '/app' });
}


// TODO delete when ready
export async function signUpWithCredentials(state: any, formData: FormData) {
  // server side check data is valid
  const data = Object.fromEntries(formData);
  console.log(data)
  const parsed = registrationSchema.safeParse(data);

  if (!parsed.success)
    return {
      message: 'Invalid form data',
    };

  return { message: 'Success' };
}

// TODO: change to signUpWithCredentials when ready
export async function signUpWithCredentialsReal(
  state: any,
  formData: FormData
) {
  // server side check data is valid
  const data = Object.fromEntries(formData);
  const parsed = registrationSchema.safeParse(data);

  if (!parsed.success) return console.log('invalid data');

  // see if user exist in firestore, if user exist return error
  const query = await firestoreAdmin
    .collection('users')
    .where('email', '==', data.email.toString())
    .get();
  if (query.size > 0) return console.log('user already exist: ', query);

  // hash password
  const hashed = await hashPassword(data.password.toString());

  // create user account in firestore.
  try {
    await firestoreAdmin.collection('users').add({
      email: data.email.toString(),
      password: hashed,
      name: `${data.firstName.toString()} ${data.lastName.toString()}`,
      image: null,
      emailVerified: null,
      // add extra fields here
    });
  } catch (error) {
    console.log(error);
    return {
      message: 'Error creating user',
    };
  }

  // TODO: sign in user
}

export async function signInWithCredentials(state: any, formData: FormData) {
  'use server';
  // validate form data
  const data = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }

  signIn('credentials', {
    username: data.email,
    password: data.password,
    redirectTo: '/app',
  });

  return {
    message: 'Success',
  };

  // validate form data
}
