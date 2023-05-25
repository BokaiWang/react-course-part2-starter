import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePostList = (query: PostQuery) => {
  const fetchPostList = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: ["postList", query],
    queryFn: fetchPostList,
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true,
  });
};

export default usePostList;
