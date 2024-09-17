"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { deletePostAction } from "@/lib/actions/post.actions";
import { PostCardProps } from "@/lib/types";
import {
  formatErrorMessage,
  getInitials,
  showToast,
  timeAgo,
} from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function PostCard({ post }: { post: PostCardProps }) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  async function handleDeletePost(e: any) {
    e.preventDefault();
    const postId = e.target.postId.value;
    try {
      if (confirm("Are you sure ?")) {
        const response = await deletePostAction(postId);

        if (response.id) {
          showToast(toast, "Post has been successfully deleted.", "success");
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        } else if (response.errorMessage) {
          showToast(toast, formatErrorMessage(response.errorMessage), "danger");
        }
      }
    } catch (error: any) {
      const errorMessage =
        error?.errorMessage || "Something went wrong, please try again.";
      showToast(toast, errorMessage, "danger");
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar>
          {post.user?.image ? (
            <AvatarImage src={post.user?.image} alt={post.user?.name} />
          ) : (
            <AvatarFallback>{getInitials(post.user?.name)}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <p className="font-bold">{post.user.name}</p>
          <p className="text-sm text-gray-500">
            {timeAgo(new Date(post.createdAt))}
          </p>
        </div>
        {session && post.user.id == session?.user.id && (
          <form onSubmit={handleDeletePost}>
            <input type="hidden" name="postId" value={post.id} />
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" color="red" />
            </Button>
          </form>
        )}
      </CardHeader>
      <CardContent>
        <p>{post.body}</p>
        {post.image && (
          <div className="relative w-36 h-36">
            <Image
              src={post?.image}
              alt={post.body}
              className="object-contain"
              fill
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <Heart className="h-4 w-4 mr-2" />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-4 w-4 mr-2" />
          Comment
        </Button>
      </CardFooter>
    </Card>
  );
}
