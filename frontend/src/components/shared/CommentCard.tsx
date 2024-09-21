import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentCardProps } from "@/lib/types";
import {
  formatErrorMessage,
  getInitials,
  showToast,
  timeAgo,
} from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteCommentAction } from "@/lib/actions/comment.actions";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export default function CommentCard({
  comment,
}: {
  comment: CommentCardProps;
}) {
  const { data: session } = useSession();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const handleDeleteComment = useCallback(
    async (e: any) => {
      e.preventDefault();
      const commentId = e.target.commentId.value;
      try {
        if (confirm("Are you sure ?")) {
          const response = await deleteCommentAction(commentId);
          if (response.id) {
            showToast(
              toast,
              "Comment has been successfully deleted.",
              "success"
            );
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
          } else if (response.errorMessage) {
            showToast(
              toast,
              formatErrorMessage(response.errorMessage),
              "danger"
            );
          }
        }
      } catch (error: any) {
        const errorMessage =
          error?.errorMessage || "Something went wrong, please try again.";
        showToast(toast, errorMessage, "danger");
      }
    },
    [comment.id, toast, queryClient]
  );

  const canDelete = useMemo(
    () => comment.user.id == session?.user.id,
    [(comment.user.id, session?.user.id)]
  );

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <div className="flex space-x-4 w-full">
        <Avatar>
          {comment.user.image ? (
            <AvatarImage src={comment.user.image} alt="Profile picture" />
          ) : (
            <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <p className="font-bold">{comment.user.name}</p>
          <p className="text-sm text-gray-500">
            {timeAgo(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-md">{comment.body}</p>
        {canDelete && (
          <form onSubmit={handleDeleteComment}>
            <input type="hidden" name="commentId" value={comment.id} />
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" color="red" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
