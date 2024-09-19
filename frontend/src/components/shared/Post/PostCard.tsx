"use client";

import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { deletePostAction } from "@/lib/actions/post.actions";
import { PostCardProps } from "@/lib/types";
import { formatErrorMessage, showToast } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
import PostCardFooter from "./PostCardFooter";
import { PostContent } from "./PostCardContent";
import PostCardHeader from "./PostCardHeader";

export default function PostCard({ post }: { post: PostCardProps }) {
  const [showComments, setShowComments] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDeletePost = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (confirm("Are you sure?")) {
        try {
          const response = await deletePostAction(post.id);
          if (response.id) {
            showToast(toast, "Post has been successfully deleted.", "success");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
          } else if (response.errorMessage) {
            showToast(
              toast,
              formatErrorMessage(response.errorMessage),
              "danger"
            );
          }
        } catch (error: any) {
          const errorMessage =
            error?.errorMessage || "Something went wrong, please try again.";
          showToast(toast, errorMessage, "danger");
        }
      }
    },
    [post.id, toast, queryClient]
  );

  const toggleComments = useCallback(
    () => setShowComments((prev) => !prev),
    []
  );

  const canDelete = useMemo(
    () => session?.user.id === post.user.id,
    [session?.user.id, post.user.id]
  );

  return (
    <Card>
      <PostCardHeader
        post={post}
        canDelete={canDelete}
        onDelete={handleDeletePost}
      />
      <PostContent body={post.body} image={post.image} />
      <PostCardFooter
        showComments={showComments}
        onToggleComments={toggleComments}
        comments={post.comments}
        user={session?.user}
        postId={post.id}
        likes={post.likes}
      />
    </Card>
  );
}
