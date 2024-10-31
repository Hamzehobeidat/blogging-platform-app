"use client";
import {} from "@tanstack/react-query";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getUserPostsByUserId, deletePost } from "../../service/apiPosts";
import Modal from "../../ui/Modal/Modal";
import ConfirmDelete from "../../components/ConfirmDelete/ConfirmDelete";
import PostForm from "../../components/PostForm//PostForm";
import "./UserPosts.css";

export default function UserPosts({ onCloseModal }) {
  const queryClint = useQueryClient();
  const {
    isLoading,
    data: userPosts,
    error,
  } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPostsByUserId,
  });

  const { isLoading: isDeleting, mutate: deletePostUser } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ["userPosts"],
      });
    },
  });
  const handelDeletePost = (id) => {
    deletePostUser(id, { onSuccess: () => onCloseModal?.() });
  };

  return (
    <aside>
      <h2>Post archive</h2>
      <Modal>
        <Modal.Open opens={"cretePost"}>
          <button>Create new post</button>
        </Modal.Open>
        <Modal.Window name={"cretePost"}>
          <PostForm />
        </Modal.Window>
      </Modal>

      <ul>
        {userPosts?.map((post, i) => (
          <li key={i}>
            <Modal>
              <Modal.Open opens={"showPost"}>
                <p>
                  <strong>{post.title}:</strong> {post.content}
                </p>
              </Modal.Open>
              <Modal.Window name={"showPost"}>
                <li>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </li>
              </Modal.Window>
            </Modal>

            <div className="buttonRaper">
              <Modal>
                <Modal.Open opens={"editPost"}>
                  <button>Edit post</button>
                </Modal.Open>
                <Modal.Window name={"editPost"}>
                  <PostForm post={post} />
                </Modal.Window>

                <Modal.Open opens={"deletePost"}>
                  <button>Delete post</button>
                </Modal.Open>
                <Modal.Window name={"deletePost"}>
                  <ConfirmDelete
                    handelDeletePost={handelDeletePost}
                    post={post}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
