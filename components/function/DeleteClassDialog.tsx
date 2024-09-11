import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { ClassType } from '@/schema/classSchemas';
import { Button } from '../ui/button';
import { deleteClass } from '@/actions/classes';
import { useToast } from '../hooks/use-toast';

export function DeleteClassDialog({
  c,
  open,
  setOpen,
}: {
  c: ClassType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {toast} = useToast();
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="">Delete Class</DialogTitle>
            <DialogDescription className="text-xs ">
              Are you sure you want to delete class: {c.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <Button variant='default' onClick={() => setOpen(false)}>Cancel</Button> */}
            <Button
              variant="destructive"
              className=""
              onClick={async () => {
                const {message, error} = await deleteClass(c.id, c.name);
                if (error) {
                  toast({
                    title: 'Error deleting class',
                    description: error,
                    variant: 'destructive',
                  })
                }
                if (message) {
                  toast({
                    title: 'Class deleted',
                    description: message,
                    variant: 'destructive',
                  }); 
                }
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
