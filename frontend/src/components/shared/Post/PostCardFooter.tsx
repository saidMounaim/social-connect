"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { likePostAction } from "@/lib/actions/post.actions";
import { LikesProps } from "@/lib/types";
import { formatErrorMessage, showToast } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";

import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";

const DynamicAddCommentForm = dynamic(() => import("../Forms/AddCommentForm"));
const DynamicCommentCard = dynamic(() => import("../CommentCard"));

interface PostCardFooterProps {
  showComments: boolean;
  onToggleComments: () => void;
  comments: any[];
  user: any;
  postId: string;
  likes: LikesProps[];
}

export default function PostCardFooter({
  showComments,
  onToggleComments,
  comments,
  user,
  postId,
  likes,
}: PostCardFooterProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const likePost = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const likeData = { userId: user?.id, postId };
      try {
        const response = await likePostAction(likeData);
        if (response.id) {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        } else if (response.errorMessage) {
          showToast(toast, formatErrorMessage(response.errorMessage), "danger");
        }
      } catch (error: any) {
        const errorMessage =
          error?.errorMessage || "Something went wrong, please try again.";
        showToast(toast, errorMessage, "danger");
      }
    },
    [postId, user?.id, toast, queryClient]
  );

  const isAlreadyLiked = useMemo(() => {
    return likes.some(
      (like) => like.userId === user?.id && like.postId === postId
    );
  }, [likes, user?.id, postId]);

  return (
    <CardFooter className="flex flex-col gap-4 justify-between">
      <div className="flex justify-between w-full">
        {isAlreadyLiked ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={likePost}
            className="text-red-500 hover:text-red-500 font-bold"
          >
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            Unlike
          </Button>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={likePost}>
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>
          </>
        )}
        <Button variant="ghost" size="sm" onClick={onToggleComments}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Comment
        </Button>
      </div>

      {showComments && (
        <>
          {comments.map((comment) => (
            <DynamicCommentCard key={comment.id} comment={comment} />
          ))}
          <DynamicAddCommentForm user={user} postId={postId} />
        </>
      )}
    </CardFooter>
  );
}
