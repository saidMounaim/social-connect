import { auth } from "@/auth";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import {
  getPostsByUserIdAction,
  getUserByIdAction,
} from "@/lib/actions/user.actions";
import { notFound, redirect } from "next/navigation";
import UserPosts from "./UserPosts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserCardPost from "./UserCardPost";

interface SearchParamsProps {
  params: {
    id: string;
  };
}

export default async function UserProfilePage({ params }: SearchParamsProps) {
  const session = await auth();

  if (!session) redirect("/");

  const { id } = params;

  const user = await getUserByIdAction(id);

  if (!user) notFound();

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["userPosts"],
    queryFn: () => getPostsByUserIdAction(id),
  });

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <ProfileSidebar user={session?.user} />
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <UserCardPost user={user} />
          <h1 className="font-medium text-2xl">{user.name} Post's</h1>
          <div className="flex flex-col gap-4">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <UserPosts userId={user.id as string} />
            </HydrationBoundary>
          </div>
        </div>
      </main>
    </div>
  );
}
