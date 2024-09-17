import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PostCardProps } from "@/lib/types";
import { getInitials, timeAgo } from "@/lib/utils";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function PostCard({ post }: { post: PostCardProps }) {
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
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
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
