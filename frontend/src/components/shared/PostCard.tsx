import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

export default function PostCard(post: any) {
  <Card>
    <CardHeader className="flex flex-row items-center space-x-4">
      <Avatar>
        <AvatarImage
          src={`/placeholder.svg?height=40&width=40&text=User${post}`}
          alt={`User ${post}`}
        />
        <AvatarFallback>U{post}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-bold">User {post}</p>
        <p className="text-sm text-gray-500">2 hours ago</p>
      </div>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent>
      <p>
        This is a sample post content for post {post}. It can be a longer text,
        image, or any other content.
      </p>
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
  </Card>;
}
