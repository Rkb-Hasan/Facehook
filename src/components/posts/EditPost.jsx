import { useEditPost } from "../../hooks/useEditPost";
import PostEntry from "./PostEntry";

export default function EditPost() {
  const { editPost, setEditPost } = useEditPost();

  return (
    <div className="mt-3">
      {editPost?.id && (
        <PostEntry onEdit={() => setEditPost({})} post={editPost} />
      )}
    </div>
  );
}
