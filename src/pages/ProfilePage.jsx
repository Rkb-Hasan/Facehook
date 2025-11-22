import { useEffect } from "react";
import { actions } from "../actions";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch({ type: actions.profile.DATA_FETCHING });
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error);

        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error?.message,
        });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>Fetching your Profile data....</div>;
  }

  return (
    <div>
      <div>
        Welcome, {state?.user?.firstName} {state?.user?.firstName}
      </div>
      <p>You have {state?.posts?.length} posts</p>
    </div>
  );
}
