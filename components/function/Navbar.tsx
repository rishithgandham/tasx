import { auth, signOut } from '@/server/auth';
import { User } from 'next-auth';
import Link from 'next/link';

import { ModeToggle } from './ThemeModeToggle';

// ui components
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import {
  Bell,
  Book,
  LucideLayoutDashboard,
  LucideLogOut,
  MenuIcon,
  SettingsIcon,
  UserCircle,
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { FaGithub } from 'react-icons/fa';
import { Badge } from '../ui/badge';
import { logOut } from '@/actions/auth';
import { UserProfile } from './UserDropdown';

const navLinks: NavLink[] = [
  { name: 'Classes', href: '/app/classes', icon: <Book size={18} /> },
  {
    name: 'Dashboard',
    href: '/app',
    icon: <LucideLayoutDashboard size={18} />,
  },
  { name: 'Tasks', href: '/app/tasks', icon: <Badge>5</Badge> },
];

interface NavLink {
  name: string;
  href: string;
  icon?: JSX.Element;
}

export default async function Navbar() {
  const session = await auth();
  // async function logOut() {

  // }

  return session?.user ? (
    // <nav className="fixed inset-x-0 top-0  w-screen">
    <NavigationMenu className="border-b-[1px]   fixed top-0 z-20 w-screen border-border h-12  backdrop-blur">
      {/* <div className="flex h-16 items-center px-4"> */}
      <div className="container flex justify-between">
        <ul className="md:flex hidden justify-center items-center space-x-3 ">
          {' '}
          <Link href="/app" legacyBehavior passHref>
            <NavigationMenuLink className="text-xl text-primary font-bold tracking-tight">
              tasx
            </NavigationMenuLink>
          </Link>
          {navLinks.map((link, i) => (
            <Link href={link.href} key={i} legacyBehavior passHref>
              <NavigationMenuLink className="text-xs mt-1 text-muted-foreground hover:text-foreground">
                {link.name}
              </NavigationMenuLink>
            </Link>
          ))}
        </ul>

        <div className=" flex md:max-w-min w-full justify-normal  items-center space-x-2">
          <Sidebar user={session.user} />
          <form className="w-full">
            <Input
              type="search"
              placeholder="Search..."
              className=" w-full bg-card md:w-[200px] lg:w-[300px] h-8"
            />
          </form>

          <UserProfile user={session?.user} />
          <div className="hidden md:flex justify-between space-x-0">
            <Button variant="ghost" size="sm" className="hidden md:flex ">
              <Bell className="h-3 w-3" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <FaGithub className="h-3 w-3" />
              <span className="sr-only">Github</span>
            </Button>

            <ModeToggle />
          </div>
        </div>
      </div>
      {/* </div> */}
    </NavigationMenu>
  ) : (
    //   </div>
    // </nav>
    <>
      <NavigationMenu className="border-b-[1px]   fixed top-0 z-20 w-screen border-border h-12  backdrop-blur">
        {/* <div className="flex h-16 items-center px-4"> */}
        <div className="container grid grid-cols-2 justify-between">
          {' '}
          <div className="flex h-full items-center">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="text-xl text-primary font-bold tracking-tighter">
                tasx
              </NavigationMenuLink>
            </Link>
          </div>
          <div className="flex justify-end items-center text-xs gap-2">
            <Link href="/login" passHref>
              <Button variant="link" className="text-bold text-xs">
                Log in
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button
                variant={'default'}
                size={'navbar'}
                className="font-semibold  text-xs"
              >
                Get started
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </NavigationMenu>
    </>
  );
}

interface UserLink {
  name: string;
  href: string;
  color?: 'destructive' | 'primary' | 'secondary';
  icon: JSX.Element;
  action?: () => any;
}

const userLinks: UserLink[] = [
  { name: 'Profile', href: '/app/profile', icon: <UserCircle size={18} /> },
  { name: 'Settings', href: '/app/settings', icon: <SettingsIcon size={18} /> },
  {
    name: 'Log out',
    href: '/app/logout',
    color: 'destructive',
    icon: <LucideLogOut size={18} />,
    action: logOut,
  },
];

function Sidebar({ user }: { user: User }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className=" md:hidden">
          <MenuIcon className="w-3 h-3" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex justify-between flex-col w-72 border-border backdrop-blur"
      >
        <nav className="flex-1 space-y-1 text-lg font-medium">
          <Link href="/app" legacyBehavior passHref>
            <NavigationMenuLink className="pl-3 text-2xl font-bold tracking-tight">
              tasx
            </NavigationMenuLink>
          </Link>
          {navLinks.map((link, i) => (
            <Link
              href={link.href}
              key={link.href}
              passHref
              className="w-full px-3 py-2 flex justify-between rounded-sm hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <NavigationMenuLink className="text-sm ">
                {link.name}
              </NavigationMenuLink>
              {link.icon}
            </Link>
          ))}
        </nav>
        <div className="">
          <div className="flex justify-start space-x-0 pl-1">
            <Button variant="ghost" size="sm" className=" ">
              <Bell className="h-3 w-3" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="sm" className="">
              <FaGithub className="h-3 w-3" />
              <span className="sr-only">Github</span>
            </Button>

            <ModeToggle />
          </div>
          {userLinks.map((link, i) => {
            return link.action ? (
              <form action={link.action} key={link.href}>
                <button
                  type="submit"
                  className={`w-full px-3 py-2 flex justify-between rounded-sm hover:bg-muted ${
                    link.color == 'destructive'
                      ? 'text-destructive hover:font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  } `}
                >
                  <p className="text-sm ">{link.name}</p>
                  {link.icon}
                </button>
              </form>
            ) : (
              <Link
                href={link.href}
                key={link.href}
                passHref
                className={`w-full px-3 py-2 flex justify-between rounded-sm hover:bg-muted ${
                  link.color == 'destructive'
                    ? 'text-destructive hover:font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                } `}
              >
                <NavigationMenuLink className="text-sm ">
                  {link.name}
                </NavigationMenuLink>
                {link.icon}
              </Link>
            );
          })}
          <hr className="mt-5" />
          <SidebarUser user={user} />
        </div>
      </SheetContent>
      <SheetFooter></SheetFooter>
    </Sheet>
  );
}

function SidebarUser({ user }: { user: User }) {
  return (
    <div className="flex mt-5 items-center  space-x-2 px-2">
      <Avatar className="">
        <AvatarImage className="" src={(user.image as string) + 'lll'} />
        <AvatarFallback className="">{user.name?.slice(0, 1)}</AvatarFallback>
      </Avatar>

      <div className="text-left">
        <p className="text-xs font-medium ">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}
