import { useState } from "react";
import commentIcon from "../../assets/icons/comment.svg";
import likeIconFilled from "../../assets/icons/like-fill.svg";
import likeIcon from "../../assets/icons/like.svg";
import shareIcon from "../../assets/icons/share.svg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

export default function PostAction({ post, commentCount }) {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));
  const { api } = useAxios();

  const handleLike = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/like`
      );

      if (response.status === 200) {
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
      setLiked(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        onClick={handleLike}
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img
          className={`w-5 md:w-6 ${liked ? "invert-100" : ""}`}
          src={liked ? likeIconFilled : likeIcon}
          alt="Like"
        />
        {!liked && <span>Like</span>}
      </button>

      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img className="w-5 md:w-6" src={commentIcon} alt="Comment" />
        <span>Comment({commentCount})</span>
      </button>

      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img className="w-5 md:w-6" src={shareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
}
