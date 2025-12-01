import { useState } from "react";
import { actions } from "../../actions";
import threeDotsIcon from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import timeIcon from "../../assets/icons/time.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import useAxios from "../../hooks/useAxios";
import { useEditPost } from "../../hooks/useEditPost";
import { usePost } from "../../hooks/usePost";
import { getDateDifferenceFromNow } from "../../utils";

export default function PostHeader({ post }) {
  const [showAction, setShowAction] = useState(false);
  const { avatarUrl } = useAvatar(post);
  const { auth } = useAuth();
  const isMe = post?.author?.id === auth?.user?.id;
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { setEditPost } = useEditPost();
  const handleDeletePost = async () => {
    if (confirm("Are you sure?")) {
      dispatch({ type: actions.post.DATA_FETCHING });

      try {
        const response = await api.delete(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}`
        );

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_DELETED, data: post?.id });
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: err?.message });
      }
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarUrl}
          alt="avatar"
        />
        <div>
          <h6 className="text-sm md:text-lg lg:text-xl">
            {post?.author?.name}
          </h6>
          <div className="flex items-center gap-1.5">
            <img src={timeIcon} />
            <span className="text-[12px] md:text-sm text-gray-400 lg:text-base">
              {getDateDifferenceFromNow(post?.createAt)} ago
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={() => setShowAction((prevAction) => !prevAction)}>
            <img src={threeDotsIcon} alt="3dots of Action" />
          </button>
        )}
        {showAction && (
          <div className="action-modal-container text-xs md:text-base">
            <button
              onClick={() => setEditPost(post)}
              className="action-menu-item hover:text-lwsGreen"
            >
              <img src={editIcon} alt="Edit" />
              Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="action-menu-item hover:text-red-500"
            >
              <img src={deleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
