import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";

export const useAvatar = (post) => {
  const { state } = useProfile();
  const { auth } = useAuth();
  const isMe = post?.author?.id === auth?.user?.id;

  const myAvatar = state?.user?.avatar ?? auth?.user?.avatar;
  const updatedAvatar = isMe ? myAvatar : post?.author?.avatar;
  const avatarUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/${updatedAvatar}`;
  return { avatarUrl };
};
