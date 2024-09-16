import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CurrentUserProps } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export default function CreatePostForm({ user }: CurrentUserProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Avatar>
            {user.image ? (
              <AvatarImage src={user.image} alt="Profile picture" />
            ) : (
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
          <Input placeholder="What's on your mind?" className="flex-1" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Photo</Button>
        <Button>Post</Button>
      </CardFooter>
    </Card>
  );
}
