import { Button } from '@/components/ui/button';
import Image from 'next/image';
import classes_screenshot from './(images)/tasx_classes_screenshot.png';
import { redirect } from 'next/navigation';
import { Card, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: 'Assignment Tracker 📄',
    description:
      'Keep track of all your assignments in one place. tasx will remind you when they are due.',
  },
  {
    title: 'Project Manager 🧑‍💼',
    description:
      'Manage your projects with ease. tasx helps you break down your project into smaller tasks.',
  },
  {
    title: 'Exam Tracker 🅰️',
    description:
      'Never miss an exam again. tasx will remind you when your exams are coming up.',
  },
  {
    title: 'Manage all of your classes 📚',
    description:
      'Add all of your classes to tasx and keep track of all of your assignments, projects, and exams.',
  },
  {
    title: 'Theme Switcher 🌗',
    description:
      'Choose between themes that can help you study and stay on our app for long periods of time, tasx will remember your preference.',
  },
];

type Testimonial = {
  name: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    quote:
      'tasx has helped me stay on top of my assignments and projects. I never miss a deadline anymore!',
  },
  {
    name: 'Jane Doe',
    quote:
      'I love how easy it is to use tasx. I can keep track of all of my classes and assignments in one place.',
  },
  {
    name: 'Alice Doe',
    quote:
      'tasx has helped me manage my time better. I can see all of my assignments and exams in one place.',
  },
  {
    name: 'Bob Doe',
    quote:
      'I love the theme switcher in tasx. I can choose a theme that helps me study better.',
  },
];

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ">
              <div className="flex flex-col justify-center space-y-4 max-w-3xl">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none ">
                    An all in One Task Management App for Students
                  </h1>
                  <p className=" md:text-lg text-muted-foreground ">
                    tasx helps students manage their assignments, projects, and
                    exams with ease. Never miss a deadline again!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <form
                    action={async () => {
                      'use server';
                      redirect('/register');
                    }}
                  >
                    <Button type="submit">Get Started</Button>
                  </form>
                  <form
                    action={async () => {
                      'use server';
                      redirect('/learnmore');
                    }}
                  >
                    <Button type="submit" variant={'link'}>
                      Learn More
                    </Button>
                  </form>
                </div>
              </div>
              <div className="lg:flex lg:justify-end">
                <div className="relative w-full aspect-[16/9] rounded-l-3xl">
                  <Image
                    src={classes_screenshot}
                    alt="tasx app demo"
                    className=" border-border -z-50 shadow-2xl 2xl:scale-110 xl:scale-105 lg:scale-[102%] border-4 rounded-l-[var(--radius)]"
                  />
                </div>
              </div>
            </div>
            <hr className="border-border xl:mt-0 mt-10" />
            <div className="mt-32 text-start">
              <p className=" text-3xl font-bold tracking tracking-tighter text-muted-foreground">
                Keep your{' '}
                <span className="font-extrabold text-primary italic underline">
                  grades
                </span>{' '}
                in your hands 🫴 🅰️+
              </p>
              <p className=" text-muted-foreground mt-4">
                with features designed specifically for students.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {features.map((feature, index) => (
                  <Card key={index} className="border-border p-5">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            {/* testimonials */}
            <div className="mt-32 text-end">
              <p className=" text-3xl font-bold tracking tracking-tighter text-muted-foreground">
                What our{' '}
                <span className="font-extrabold text-primary italic underline">
                  users
                </span>{' '}
                are saying 🗣️
              </p>
              <p className=" text-muted-foreground mt-4">
                testimonials taken from fellow students at various high schools.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {testimonials.map((t, index) => (
                  <Card key={index} className="border-border p-5">
                    <CardTitle className="text-lg w-full flex justify-start items-center gap-2">
                      <Avatar>
                        <AvatarFallback className="text-sm">
                          {t.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-lg">{t.name}</p>
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mt-3 italic">
                      &quot;{t.quote}&quot;
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            {/* end landing */}
            <div className="mt-56 grid md:grid-cols-2 grid-cols-1">
              <div className='flex-col justify-center flex '>
                <p className="text-5xl font-bold tracking-tighter">tasx:</p>
                <p className="text-3xl tracking-tighter font-bold mt-2 text-muted-foreground">
                  A task manager that you can{' '}
                  <span className="text-primary underline italic">trust</span>{' '}
                  🤞
                </p>
                <p className="text-muted-foreground mt-4">
                  tasx is built with the latest technologies to ensure that your
                  data is safe and secure.
                </p>
                <div className="flex gap-3">
                  <form
                    action={async () => {
                      'use server';
                      redirect('/register');
                    }}
                  >
                    <Button type="submit" className="mt-4">
                      Get Started
                    </Button>
                  </form>
                  <form
                    action={async () => {
                      'use server';
                      redirect('/contact');
                    }}
                  >
                    <Button type="submit" variant="link" className="mt-4">
                      Contact us
                    </Button>
                  </form>
                </div>
              </div>
                <div className="relative w-full aspect-[16/9] rounded-xl">
                  <Image
                    src={classes_screenshot}
                    alt="tasx app demo"
                    className=" border-border -z-50 shadow-2xl  border-4 rounded-[var(--radius)]"
                  />
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
