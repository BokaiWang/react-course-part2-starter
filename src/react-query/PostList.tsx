import { ChangeEvent, useState } from "react";
import usePostList from "./hooks/usePostList";

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePostList(userId);

  const onSelect = (event: ChangeEvent<HTMLSelectElement>): void =>
    setUserId(parseInt(event.target.value));

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select onChange={onSelect} value={userId} className="form_select mb-3">
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
