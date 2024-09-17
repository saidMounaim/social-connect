"use client";

import { getAllPostsAction } from "@/lib/actions/post.actions";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { PostCardProps } from "@/lib/types";

export default function PostGrid() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPostsAction(),
  });

  if (isLoading) return <>Loading...</>;

  if (error) return <>Unable to fetch posts</>;

  return (
    <>
      {posts.map((post: PostCardProps) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
