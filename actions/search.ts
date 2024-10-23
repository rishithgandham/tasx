'use server';

// server search action
import { firestoreAdmin } from '@/server/firebase';
import { auth } from '@/server/auth';

export async function search(searchTerm: string): Promise<{
  error?: string;
  data: SearchResults[];
}> {
  const session = await auth();
  if (!session?.user) return { error: 'User not authenticated', data: [] };
  try {
    // search tasks -------------------------------------
    const tasks = await firestoreAdmin
      .collectionGroup('tasks')
      .where('user_id', '==', session.user.id)
      .get();

    const results: SearchResults[] = [];
    tasks.docs.forEach((doc, i) => {
      const data = doc.data();
      if (
        (data.name as string)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (data.description as string)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        data.dueDate = data.dueDate.toDate()
        results.push({
          type: 'task',
          id: doc.id,
          name: data.name,
          description: data.description,
          dueDate: data.dueDate,
          class_id: data.class_id,
          class_name: data.class_name,
        });
      }
    });

    console.log(results);
    return {
      data: results,
    };
  } catch (e) {
    console.log(e);
    return {
      error: 'Error searching tasks',
      data: [],
    };
  }
}

type SearchResults = {
  type: 'task' | 'class';
  id: string;
  name: string;
  description: string;
  dueDate: string;
  class_id: string;
  class_name: string;
};
