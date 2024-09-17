"use client";

import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CurrentUserProps } from "@/lib/types";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ProfileSidebar({ user }: CurrentUserProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-white p-4 border-r">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-20 h-20">
          {user.image ? (
            <AvatarImage src={user.image} alt="Profile picture" />
          ) : (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="flex justify-between w-full text-sm">
          <div className="text-center">
            <p className="font-bold">0</p>
            <p className="text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold">0</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">0</p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Button className="w-full" asChild>
            {pathname == "/dashboard" ? (
              <Link href="/profile/edit">Edit Profile</Link>
            ) : (
              <Link href="/dashboard">Dashboard</Link>
            )}
          </Button>
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}
