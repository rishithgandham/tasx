'use client';
import { search } from '@/actions/search';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import Link from 'next/link';
import { formatDate, formatDistance, set } from 'date-fns';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { useDebounce } from '../hooks/use-debounce';



export default function Search() {
  const [term, setTerm] = useState<string>();
  const debouncedTerm = useDebounce<string | undefined>(term, 100);
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', debouncedTerm],
    queryFn: () => search(debouncedTerm ?? ''),
    enabled: !!term,

  });

  const { push } = useRouter();
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="md:w-[200px] lg:w-[330px] w-full">
      <Input
        type="search"
        placeholder="Search..."
        className=" w-full bg-card  h-8"
        onChange={e => {
          if (e.target.value.trim() === term) console.log('same');
          setTerm(e.target.value.trim());
        }}
      />
      {/* dropdown */}
      {isLoading ? (
        <div className="absolute md:w-[200px] lg:w-[330px] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-xs">Loading...</div>
          </div>
        </div>
      ) : null}
      {data && term && data.data.length > 0 ? (
        <div className="absolute md:w-[200px] lg:w-[330px] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ScrollArea
            className={cn('max-h-96', data?.data.length <= 3 && 'h-auto')}
          >
            <div className={`py-1 ${data.data.length > 5 ? 'h-[300px]' : ''}`}>
              {data.data.map(task => (
                <button
                  onClick={() => {
                    setTerm(undefined);
                    push(`/app/classes/${task.class_id}`);
                  }}
                  key={task.id}
                  className=" w-full overflow-scroll  text-left"
                >
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <h3 className="font-semibold text-sm ">
                      {task.name}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                      {formatDistance(task.dueDate, new Date(), {
                        addSuffix: true,
                      })}{' '}
                      - {task.class_name}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      Description: {task.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      ) : null}
    </div>
  );
}
