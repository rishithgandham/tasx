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

export async function addClass(c: FormClass) {
  const parsed = await formClassSchema.safeParse(c);
  const session = await auth();
  if (!parsed.success) return { error: 'Invalid form data' };
  if (!session?.user) return { error: 'User not authenticated' };

  // add class to firestore
  try {
    const ref = await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes');

    await ref.add(parsed.data);
    
  } catch (e) {
    return { error: 'Error adding class' };
  }
  revalidatePath('/app/classes')
  return { message: 'Class added' };
}

export async function getClasses(): Promise<{
  error?: string;
  classes?: ClassType[];
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

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
  return { classes: classesData };
}

export async function deleteClass(classId: string) {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

  const ref = await firestoreAdmin
    .collection('users')
    .doc(session.user.id as string)
    .collection('classes')
    .doc(classId);

  await ref.delete();
  revalidatePath('/app/classes')
  return { message: 'Class deleted' };
}

export async function updateClass(classId: string, c: FormClass) {
  const parsed = await formClassSchema.safeParse(c);
  const session = await auth();
  if (!parsed.success) return { error: 'Invalid form data' };
  if (!session?.user) return { error: 'User not authenticated' };

  const ref = await firestoreAdmin
    .collection('users')
    .doc(session.user.id as string)
    .collection('classes')
    .doc(classId);

  await ref.update(parsed.data);
  revalidatePath('/app/classes')
  return { message: 'Class updated' };
}
