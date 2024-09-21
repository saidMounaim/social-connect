"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatErrorMessage, getInitials, showToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CurrentUserProps } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  followUserAction,
  unFollowUserAction,
} from "@/lib/actions/user.actions";
import { useSession } from "next-auth/react";
import { QueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function UserCardPost({ user }: CurrentUserProps) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const queryClient = new QueryClient();

  const pathname = usePathname();

  const isUserFollow = user.following.some(
    (follower: any) => follower.followerId === session?.user.id
  );

  const handleFollowToggle = async (isFollowing: boolean) => {
    try {
      const followUser = { followerId: session?.user.id, followingId: user.id };
      const action = isFollowing ? unFollowUserAction : followUserAction;
      const successMessage = isFollowing
        ? "You successfully unfollowed the user."
        : "You successfully followed the user.";

      const response = await action(followUser, pathname);

      if (response.errorMessage) {
        showToast(toast, formatErrorMessage(response.errorMessage), "danger");
      } else {
        showToast(toast, successMessage, "success");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      }
    } catch (error: any) {
      const errorMessage =
        error?.errorMessage || "Something went wrong, please try again.";
      showToast(toast, errorMessage, "danger");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="w-full flex flex-col space-y-4">
        <div className="flex items-center gap-5">
          <Avatar className="h-24 w-24">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name || ""} />
            ) : (
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <div className="mt-1 flex justify-center space-x-4 text-1xl text-muted-foreground">
              <span>{user.followers?.length} followers</span>
              <span>{user.following?.length} following</span>
              <span>{user.posts?.length} posts</span>
            </div>
            <Button
              className="w-full"
              variant={isUserFollow ? "outline" : "default"}
              onClick={() => handleFollowToggle(isUserFollow)}
            >
              {isUserFollow ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
