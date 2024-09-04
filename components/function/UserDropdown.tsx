import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UserCircle, SettingsIcon, LucideLogOut } from 'lucide-react';

//
import { type User } from 'next-auth';
import { logOut } from '@/actions/auth';
import Link from 'next/link';

export function UserProfile({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DPTrigger user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-b-[1px] border-border"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link legacyBehavior href={'/profile'}>
          <DropdownMenuItem className="flex justify-between">
            <p>Profile</p>
            <UserCircle size={17} className="text-muted-foreground" />
          </DropdownMenuItem>
        </Link>
        <Link legacyBehavior href={'/settings'}>
          <DropdownMenuItem className="flex justify-between">
            <p>Settings</p>
            <SettingsIcon size={17} className="text-muted-foreground" />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <form action={logOut} className="w-full">
          <button type="submit" className="w-full">
            <DropdownMenuItem className="flex justify-between">
              <p className="text-destructive">Log out</p>
              <LucideLogOut size={17} className="text-destructive" />
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DPTrigger({ user }: { user: User }) {
  return (
    <Button variant="ghost" className="mt-auto p-0   md:pr-4 md:pl-2">
      <div className="md:flex hidden items-center space-x-2">
        <Avatar className="scale-90">
          <AvatarImage className="" src={(user.image as string) + 'lll'} />
          <AvatarFallback className="">{user.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>

        <div className="text-left">
          <p className="text-xs font-medium ">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Avatar className="scale-90 md:hidden flex">
        <AvatarImage className="" src={(user.image as string) + 'lll'} />
        <AvatarFallback className="">{user.name?.slice(0, 1)}</AvatarFallback>
      </Avatar>
    </Button>
  );
}
