"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost } from "../../service/apiPosts";
export default function PostForm({ post = {}, onCloseModal }) {
  const { id: editId, ...editValues } = post;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const queryClint = useQueryClient();
  const { isLoading: isCreating, mutate: createPostUser } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ["userPosts"],
      });
    },
  });

  const { isLoading: isUpdated, mutate: updatePostUser } = useMutation({
    mutationFn: ({ id, data }) => updatePost(id, data),
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ["userPosts"],
      });
    },
  });

  const onSubmit = (data) => {
    if (isEditSession) {
      updatePostUser(
        { id: post?.id, data },
        { onSuccess: () => onCloseModal?.() },
      );
    } else {
      createPostUser(data, { onSuccess: () => onCloseModal?.() });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
      <h2>{editId ? "Edit Post" : "Create Post"}</h2>
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
      />
      {errors.title && <span>Title is required</span>}

      <textarea
        type="text"
        placeholder="Content"
        {...register("content", { required: true })}
      />
      {errors.password && <span>Content is required</span>}

      <button type="submit">{editId ? "Edit post" : "Create post"}</button>
    </form>
  );
}
