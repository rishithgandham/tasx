'use client';
import { search } from '@/actions/search';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import Link from 'next/link';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [term, setTerm] = useState<string>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', term],
    queryFn: () => search(term ?? ''),
    enabled: !!term,
  });

  const { push } = useRouter();
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Input
        type="search"
        placeholder="Search..."
        className=" w-full bg-card md:w-[200px] lg:w-[300px] h-8"
        onChange={e => setTerm(e.target.value)}
      />
      {/* dropdown */}
      <div className="absolute translate-y-20 translate-x-2  z-10 bg-white md:w-[200px] lg:w-[300px] mt-1 rounded-md shadow-lg">
        <ul className=" divide-y">
          {data?.data.map(d => (
            <button
              key={d.id}
              onClick={() => {
                setTerm(undefined);
                push('/app/classes/' + d.class_id)
              }}
              className="p-1 w-full text-left hover:bg-muted"
            >
              <li key={d.id} className="p-3">
                {d.name}
                <p className="text-xs text-muted-foreground">
                  {d.description} - <span className="font-bold">Task</span>
                </p>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </>
  );
}
