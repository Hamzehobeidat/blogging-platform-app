export default function ConfirmDelete({
  post,
  handelDeletePost,
  onCloseModal,
}) {
  return (
    <div>
      <h3>Are you sure you want to delete this post?</h3>
      <div className="buttonRaper">
        <button onClick={() => handelDeletePost(post?.id)}>Yes</button>
        <button onClick={onCloseModal}>No</button>
      </div>
    </div>
  );
}
