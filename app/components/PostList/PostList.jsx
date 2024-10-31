// "use client";
export default function PostList({ post }) {
  return (
    <>
      <li>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </li>
    </>
  );
}
