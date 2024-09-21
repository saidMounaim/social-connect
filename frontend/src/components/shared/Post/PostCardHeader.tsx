import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { PostCardProps } from "@/lib/types";
import { getInitials, timeAgo } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface PostCardHeaderProps {
  post: PostCardProps;
  canDelete: boolean;
  onDelete: (e: React.FormEvent) => void;
}

export default function PostCardHeader({
  post,
  canDelete,
  onDelete,
}: PostCardHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center space-x-4">
      <Avatar>
        {post.user?.image ? (
          <AvatarImage src={post.user.image} alt={post.user.name || ""} />
        ) : (
          <AvatarFallback>{getInitials(post.user?.name)}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1">
        <Link href={`/user/${post.user.id}`}>
          <p className="font-bold">{post.user.name}</p>
        </Link>
        <p className="text-sm text-muted-foreground">
          {timeAgo(new Date(post.createdAt))}
        </p>
      </div>
      {canDelete && (
        <form onSubmit={onDelete}>
          <Button
            variant="ghost"
            size="icon"
            type="submit"
            aria-label="Delete post"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </form>
      )}
    </CardHeader>
  );
}
