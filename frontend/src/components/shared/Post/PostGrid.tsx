"use client";

import { getAllPostsAction } from "@/lib/actions/post.actions";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { PostCardProps } from "@/lib/types";
import PostCardSkeleton from "../Skeletons/PostCardSkeleton";

export default function PostGrid() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPostsAction(),
  });

  if (error) return <>Unable to fetch posts</>;

  if (isLoading) return <PostCardSkeleton />;

  return (
    <>
      {posts?.map((post: PostCardProps) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
