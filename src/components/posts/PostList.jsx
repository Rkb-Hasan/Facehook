import { sortByDate } from "../../utils";
import PostCard from "./PostCard";

export default function PostList({ posts }) {
  return (
    !!posts &&
    posts.sort(sortByDate).map((post) => {
      return <PostCard key={post.id} post={post} />;
    })
  );
}
