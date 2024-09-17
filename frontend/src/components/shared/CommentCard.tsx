import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentCardProps } from "@/lib/types";
import { getInitials, timeAgo } from "@/lib/utils";

export default function CommentCard({
  comment,
}: {
  comment: CommentCardProps;
}) {
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
      <div className="flex flex-col">
        <p className="text-md">{comment.body}</p>
      </div>
    </div>
  );
}
