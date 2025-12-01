import { sortPostsByDate } from "../../utils";
import PostCard from "./PostCard";

export default function PostList({ posts }) {
  return (
    !!posts &&
    posts.sort(sortPostsByDate).map((post) => {
      return <PostCard key={post.id} post={post} />;
    })
  );
}
