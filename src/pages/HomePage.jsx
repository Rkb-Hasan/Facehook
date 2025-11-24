import { useEffect, useReducer } from "react";
import { actions } from "../actions";
import PostList from "../components/posts/PostList";
import useAxios from "../hooks/useAxios";
import { initialState, postReducer } from "../reducers/PostReducer";

export default function HomePage() {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPosts = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error?.message,
        });
      }
    };
    fetchPosts();
  }, []);

  if (state?.loading) {
    return <p>Posts loading...</p>;
  }
  if (state?.error) {
    return <p>Error in fetching... {state?.error}</p>;
  }

  return (
    <div>
      <PostList posts={state?.posts} />
    </div>
  );
}
