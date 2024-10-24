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
    // console.log(tasksData);
    return { data: tasksData };
  } catch (e) {
    console.log(e)
    return { error: `Error getting tasks`, data: []};
  }
}

export async function setTaskComplete(
  classId: string,
  taskId: string,
  completed: boolean
): Promise<{
  error?: string;
  message?: string;
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

  if (!classId) return { error: 'Class ID not provided' };
  if (!taskId) return { error: 'Task ID not provided' };

  try {
    await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(classId)
      .collection('tasks')
      .doc(taskId)
      .update({
        completed,
      });
    revalidatePath(`/app/classes/${classId}`);
    return { message: 'Task updated successfully' };
  } catch (e) {
    return { error: 'Error updating task' };
  }
}

export async function editTask(
  task: TaskForm,
  classId: string,
  taskId: string
): Promise<{
  error?: string;
  message?: string;
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

  const parsed = taskFormSchema.safeParse(task);
  if (!parsed.success) return { error: parsed.error.message };

  if (!classId) return { error: 'Class ID not provided' };
  if (!taskId) return { error: 'Task ID not provided' };

  const fireStoreDueDate = Timestamp.fromDate(parsed.data.dueDate);

  try {
    await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(classId)
      .collection('tasks')
      .doc(taskId)
      .update({
        name: parsed.data.name,
        description: parsed.data.description,
        dueDate: fireStoreDueDate,
      });
    revalidatePath(`/app/classes/${classId}`);
    return { message: 'Task edited successfully' };
  } catch (e) {
    return { error: 'Error editing task' };
  }
}

export async function addTask(
  task: TaskForm,
  classId: string,
  className: string
): Promise<{
  message?: string;
  error?: string;
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

  const parsed = await taskFormSchema.safeParse(task);
  if (!parsed.success) return { error: parsed.error.message };

  if (!classId) return { error: 'Class ID not provided' };

  const fireStoreDueDate = Timestamp.fromDate(parsed.data.dueDate);

  try {
    await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(classId)
      .collection('tasks')
      .add({
        name: parsed.data.name,
        description: parsed.data.description,
        dueDate: fireStoreDueDate,
        completed: false,
        user_id: session.user.id,
        class_id: classId,
        class_name: className,
      });
    revalidatePath(`/app/classes/${classId}`);
    return { message: 'Task added successfully' };
  } catch (e) {
    return { error: 'Error adding task' };
  }
}

export async function deleteTask(
  taskId: string,
  classId: string
): Promise<{
  error?: string;
  message?: string;
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated' };

  if (!classId) return { error: 'Class ID not provided' };
  if (!taskId) return { error: 'Task ID not provided' };

  try {
    await firestoreAdmin
      .collection('users')
      .doc(session.user.id as string)
      .collection('classes')
      .doc(classId)
      .collection('tasks')
      .doc(taskId)
      .delete();
    revalidatePath(`/app/classes/${classId}`);
    return { message: 'Task deleted successfully' };
  } catch (e) {
    return { error: 'Error deleting task' };
  }
}

export async function getTasksFlat(): Promise<{
  error?: string;
  data: TaskType[];
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated', data: [] };

  try {
    const ref = await firestoreAdmin
      .collectionGroup('tasks')
      .where('user_id', '==', session.user.id)
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

    return { data: tasksData };
  } catch (e) {
    return { error: `Error getting Tasks ${e}`, data: [] };
  }
}
