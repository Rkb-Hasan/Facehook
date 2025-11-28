import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";

export const useAvatar = (post) => {
  const { state } = useProfile();
  const { auth } = useAuth();
  const isMe = post?.author?.id === auth?.user?.id;

  const avatarFromAuth = isMe
    ? `${auth?.user?.avatar}`
    : `${post?.author?.avatar}`;
  const updatedAvatar = state?.user?.avatar ?? avatarFromAuth;
  const avatarUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/${updatedAvatar}`;
  return { avatarUrl };
};
