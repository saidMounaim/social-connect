"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";

import dynamic from "next/dynamic";

const DynamicAddCommentForm = dynamic(() => import("../Forms/AddCommentForm"));
const DynamicCommentCard = dynamic(() => import("../CommentCard"));

interface PostCardFooterProps {
  showComments: boolean;
  onToggleComments: () => void;
  comments: any[];
  user: any;
  postId: string;
}

export default function PostCardFooter({
  showComments,
  onToggleComments,
  comments,
  user,
  postId,
}: PostCardFooterProps) {
  return (
    <CardFooter className="flex flex-col gap-4 justify-between">
      <div className="flex justify-between w-full">
        <Button variant="ghost" size="sm">
          <Heart className="h-4 w-4 mr-2" />
          Like
        </Button>
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
