import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import PostCommentList from "./PostCommentList";

export default function PostComments({ post }) {
  const { auth } = useAuth();
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { api } = useAxios();
  const addComment = async (e) => {
    const pressedKey = e.key;

    if (pressedKey === "Enter") {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/comment`,
          { comment }
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowAllComments((prev) => !prev)}
          className="text-gray-300 max-md:text-sm cursor-pointer"
        >
          All Comment ▾
        </button>
      </div>

      {showAllComments && <PostCommentList comments={comments} />}
    </div>
  );
}
