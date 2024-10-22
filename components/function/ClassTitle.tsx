'use client';
import { ClassType } from '@/schema/classSchemas';
import React, { useState } from 'react';
import EditClassDialog from './EditClassDialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Delete, Trash } from 'lucide-react';
import { DeleteClassDialog } from './DeleteClassDialog';
import { useQuery } from '@tanstack/react-query';
import { getTaskCount } from '@/actions/classes';

export function ClassTitle({ c }: { c: ClassType }) {
  const [editClassDialogOpen, setEditClassDialogOpen] = useState(false);
  const [deleteClassDialogOpen, setDeleteClassDialogOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['class-doc-count', c.id],
    queryFn: () => getTaskCount(c.id),
  });

  return (
    <div className="flex md:flex-row flex-col justify-between">
      <div>
        <div className="text-2xl text-wrap flex-wrap flex items-center gap-x-4  md:text-4xl tracking-tighter font-bold">
          <p className="">{c?.name}</p>
          <Badge variant={'default'} className=''>{data?.data}</Badge>
        </div>
        <div className="text-muted-foreground ml-[2px] mt-2 text-sm">
          {c?.description}
        </div>
      </div>
      <div className="flex gap-2 md:mt-0 mt-3">
        <Button onClick={() => setEditClassDialogOpen(true)} variant="outline">
          Edit
        </Button>
        <Button
          onClick={() => setDeleteClassDialogOpen(true)}
          variant="destructive"
        >
          <Trash size={16} />
        </Button>
      </div>
      <EditClassDialog
        open={editClassDialogOpen}
        setOpen={setEditClassDialogOpen}
        c={c}
      />
      <DeleteClassDialog
        c={c}
        open={deleteClassDialogOpen}
        setOpen={setDeleteClassDialogOpen}
      />
    </div>
  );
}
