import { useState } from "react";
import { actions } from "../../actions";
import checkIcon from "../../assets/icons/comment.svg";
import editIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

export default function Bio() {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);
  const { api } = useAxios();

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response?.data,
        });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div class="mt-4 flex items-start gap-2 lg:mt-6">
      <div class="flex-1">
        {!editMode ? (
          <p class="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className="p-2 leading-[188%] bg-gray-400 text-gray-800 lg:text-lg rounded-md"
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className=" cursor-pointer flex-center h-7 w-7 rounded-full"
        >
          <img src={editIcon} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className=" cursor-pointer flex-center h-7 w-7 rounded-full"
        >
          <img src={checkIcon} alt="Check" />
        </button>
      )}
    </div>
  );
}
