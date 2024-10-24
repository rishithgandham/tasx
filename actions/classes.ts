'use server';
import { formClassSchema, type FormClass } from '@/schema/classSchemas';
import { auth } from '@/server/auth';
import { firestoreAdmin } from '@/server/firebase';
import { ClassType } from '@/schema/classSchemas';
import { revalidatePath } from 'next/cache';
// ACTIONS NEED AUTH CHECK

// async function checkAuth() {
//   return (await auth())?.user ? true : false;
// }

export async function getTaskCount(classId: string): Promise<{
  error?: string;
  data: number;
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated', data: 0 };

  try {
    const ref = await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(classId)
      .collection('tasks')
      .count()
      .get();

    return { data: ref.data().count };
  } catch (e) {
    return { error: 'Error getting task count', data: 0 };
  }
}

export async function addClass(c: FormClass): Promise<{
  error?: string;
  message?: string;
}> {
  const parsed = await formClassSchema.safeParse(c);
  const session = await auth();
  if (!parsed.success) return { message: 'Invalid form data' };
  if (!session?.user) return { error: 'User not authenticated' };

  // add class to firestore
  try {
    const ref = await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes');

    await ref.add({
      ...parsed.data,
      user_id: session.user.id,
    });
  } catch (e) {
    return { error: 'Error adding class' };
  }
  revalidatePath('/app/classes');
  return { message: `Class: ${c.name} added!` };
}

export async function getClasses(): Promise<{
  error?: string;
  data: ClassType[];
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated', data: [] };

  try {
    const ref = await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .get();
    const classesData = ref.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      } as ClassType;
    });
    return { data: classesData };
  } catch (e) {
    return { error: 'Error getting classes', data: [] };
  }
}

export async function getClass(classId: string): Promise<{
  error?: string;
  data: ClassType;
}> {
  const session = await auth();
  if (!session?.user)
    return {
      error: 'User not authenticated to view this class.',
      data: {} as ClassType,
    };

  try {
    const ref = await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(classId);

    const doc = await ref.get();
    if (!doc.data()) {
      return {
        error: `Class with ID ${classId} does not exist`,
        data: {} as ClassType,
      };
    }

    const data = {
      id: doc.id,
      ...doc.data(),
    };

    return {
      data: data as ClassType,
    };
  } catch (e) {
    return {
      error: `Error getting class with ID ${classId}`,
      data: {} as ClassType,
    };
  }
}

export async function deleteClass(
  classId: string,
  name: string
): Promise<{
  error?: string;
  message?: string;
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

  const ref = await firestoreAdmin
    .collection('users')
    .doc(session.user.id as string)
    .collection('classes')
    .doc(classId);

  await firestoreAdmin.recursiveDelete(ref);
  revalidatePath('/app/classes');
  return { message: `Class ${name} deleted!` };
}

export async function editClass(
  c: FormClass,
  id: string
): Promise<{
  error?: string;
  message?: string;
}> {
  const parsed = await formClassSchema.safeParse(c);
  const session = await auth();
  if (!parsed.success || !id)
    return { message: 'Invalid form data or missing id' };
  if (!session?.user) return { error: 'User not authenticated' };

  // edit class in firestore
  try {
    const ref = await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(id);

    await ref.set(parsed.data);
  } catch (e) {
    return { error: 'Error editing class' };
  }
  revalidatePath('/app/classes');
  return { message: `Class: ${c.name} edited!` };
}
