import { ChangeEvent, useState } from "react";
import usePostList from "./hooks/usePostList";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const { data: posts, error, isLoading } = usePostList({ page, pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-primary my-3"
      >
        Pervious
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary my-3 ms-3"
      >
        Next
      </button>
    </>
  );
};

export default PostList;
