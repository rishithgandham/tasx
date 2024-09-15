'use server';

import {
  TaskForm,
  taskFormSchema,
  taskSchema,
  TaskType,
} from '@/schema/taskSchemas';
import { auth } from '@/server/auth';
import { firestoreAdmin } from '@/server/firebase';
import { Timestamp } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

export async function getTasks(classId: string): Promise<{
  error?: string;
  data: TaskType[];
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated', data: [] };

  try {
    const ref = await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(classId)
      .collection('tasks')
      .get();

    const tasksData = ref.docs.map(doc => {
      const data = doc.data();
      data.dueDate = data.dueDate.toDate();
      const parsed = taskSchema.parse({
        id: doc.id,
        ...data,
      }) as TaskType;

      return parsed;
    });

    console.log(tasksData);
    return { data: tasksData };
  } catch (e) {
    return { error: 'Error getting tasks', data: [] };
  }
}

export async function addTask(task: TaskForm, classId: string) {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

  const parsed = taskFormSchema.safeParse(task);
  if (!parsed.success) return { error: parsed.error.message };

  if (!classId) return { error: 'Class ID not provided' };

  const { name, description, dueDate } = task;
  const fireStoreDueDate = Timestamp.fromDate(dueDate);

  try {
    await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(classId)
      .collection('tasks')
      .add({
        name,
        description,
        dueDate: fireStoreDueDate,
        completed: false,
      });
    revalidatePath(`/app/classes/${classId}`);
    return { message: 'Task added successfully' };
  } catch (e) {
    return { error: 'Error adding task' };
  }
}
