import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import PostEntry from "./PostEntry";

export default function NewPost() {
  const { auth } = useAuth();
  const [showPostEntry, setShowPostEntry] = useState(false);
  const { state: profile } = useProfile();
  const user = profile?.user ?? auth?.user;
  return (
    <>
      {showPostEntry ? (
        <PostEntry onCreate={() => setShowPostEntry(false)} />
      ) : (
        <div className="card">
          <div className="flex-center sm:mb-3 gap-1 sm:gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                onClick={() => setShowPostEntry(true)}
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6 text-[12px]"
                name="post"
                id="post"
                placeholder="What's on your mind?"
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
