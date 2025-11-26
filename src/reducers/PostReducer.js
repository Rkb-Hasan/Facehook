import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        posts: action.data,
        loading: false,
      };
    }
    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actions.post.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };
    }
    case actions.post.DATA_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post?.id !== action.data),
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, postReducer };
