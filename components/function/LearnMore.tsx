import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

export default function LearnMore({ variant }: { variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "dropdown" | null | undefined }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={variant}>Learn More</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Why tasX?</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p>
              Tasx is designed with students in mind, offering an intuitive and
              efficient way to manage your academic tasks. Whether it&apos;s
              assignments, projects, or exams, Tasx helps you stay organized,
              prioritize your workload, and ensure that you meet every deadline.
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Task Management:</span> Easily
                  organize assignments, projects, and exams all in one place.
                </li>
                <li>
                  <span className="font-semibold">Class Integration:</span>{' '}
                  Create classes and link tasks directly to them for clear
                  organization.
                </li>
                <li>
                  <span className="font-semibold">Customizable Deadlines:</span>{' '}
                  Set due dates, reminders, and task priorities to stay on
                  track.
                </li>
                <li>
                  <span className="font-semibold">Task Status:</span> Track
                  progress by updating task status—complete, in progress, or
                  upcoming.
                </li>
                <li>
                  <span className="font-semibold">Smart Search:</span> Quickly
                  find specific tasks or classes with a powerful search feature.
                </li>
                <li>
                  <span className="font-semibold">Seamless Workflow:</span> Keep
                  everything structured so you can focus more on studying and
                  less on managing your to-do list.
                </li>
              </ul>
            </div>
            <p>
              Tasx is more than just a task manager—it&apos;s your personal academic
              assistant, helping you stay focused and efficient throughout the
              school year.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
