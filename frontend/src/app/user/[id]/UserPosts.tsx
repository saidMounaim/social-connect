"use client";

import PostCard from "@/components/shared/Post/PostCard";
import PostCardSkeleton from "@/components/shared/Skeletons/PostCardSkeleton";
import { getPostsByUserIdAction } from "@/lib/actions/user.actions";
import { PostCardProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function UserPosts({ userId }: { userId: string }) {
  const {
    data: userPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getPostsByUserIdAction(userId),
  });

  if (error) return <>Unable to fetch posts</>;

  if (isLoading) return <PostCardSkeleton />;

  return (
    <>
      {userPosts?.map((post: PostCardProps) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
