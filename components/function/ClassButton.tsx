'use client';
import React, { useState } from 'react';
import { ClassType } from '@/schema/classSchemas';
import { Button } from '../ui/button';
import { Edit, Ellipsis, EllipsisVertical, Pin, Trash } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../ui/dropdown-menu';
import { DeleteClassDialog } from './DeleteClassDialog';
import EditClassDialog from './EditClassDialog';
import { useToast } from '../hooks/use-toast';

export default function ClassButton({ c }: { c: ClassType }) {
  const { toast } = useToast();
  return (
    <>
      <Card className="p-5 hover:bg-muted/10">
        <CardContent className="p-0">
          <div className="flex justify-between items-center mb-2">
            <Link
              href={`/classes/${c.id}`}
              className="text-lg flex gap-2 font-bold hover:text-muted-foreground hover:underline "
            >
              {c.name}
              <Badge variant={'secondary'}>10</Badge>
            </Link>
            <ClassDropdown c={c} />
          </div>

          <p className="text-muted-foreground text-sm">{c.description}</p>

          <p className="text-muted-foreground text-sm">
            Teacher: {c.teacher} {c.id}
          </p>
        </CardContent>
      </Card>
    </>
  );
}

function ClassDropdown({ c }: { c: ClassType }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'dropdown'} size="sm">
            <Ellipsis size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-2 border-border ">
          <DropdownMenuItem
            onClick={() => setEditDialogOpen(true)}
            className="flex items-center justify-between hover:cursor-pointer text-muted-foreground hover:text-primary"
          >
            Edit
            <Edit size={15} />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-between hover:cursor-pointer text-muted-foreground hover:text-primary">
            Pin
            <Pin size={15} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            className="flex items-center w-full hover:cursor-pointer  justify-between text-destructive font-semibold hover:text-primary"
          >
            Delete
            <Trash size={15} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteClassDialog
        c={c}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
      />
      <EditClassDialog
        c={c}
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
      />
    </>
  );
}
