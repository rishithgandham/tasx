import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { TaskType } from '@/schema/taskSchemas';
import { Button } from '../ui/button';
import { deleteTask } from '@/actions/tasks';

export default function DeleteTaskDialog({
  t,
  classId,
  open,
  setOpen,
}: {
  classId: string;
  t: TaskType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Delete Task</DialogTitle>
            <DialogDescription className="text-xs ">
              Are you sure you want to delete task:{' '}
              <span className="font-bold text-primary ">{t.name}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false);
                deleteTask(t.id, classId);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
