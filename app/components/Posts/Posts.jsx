"use client";

import { useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import { getPosts } from "../../service/apiPosts";
export default function Posts() {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return (
    <ul>
      {posts?.map((post) => (
        <PostList post={post} key={post.id} />
      ))}
    </ul>
  );
}
