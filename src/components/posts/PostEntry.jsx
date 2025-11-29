import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import addPhotoIcon from "../../assets/icons/addPhoto.svg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import Field from "../common/Field";

export default function PostEntry({ onCreate, post, onEdit }) {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const user = profile?.user ?? auth?.user;
  const isEditMode = !!post?.id;
  const editRef = useRef();
  const previewRef = useRef();
  const iImg = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (formData) => {
    const data = new FormData();

    if (formData.image.length > 0) {
      data.append("image", formData.image[0], "ad");
      data.append("postType", "image");
    }

    data.append("content", formData.content);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        data
      );

      if (response.status === 200) {
        dispatch({ type: actions.post.DATA_CREATED, data: response.data });
        // close this ui
        onCreate();
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: err?.message });
    }
  };

  const handleEditPost = async (formData) => {
    console.log(formData);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}`,
        { content: formData.content }
      );
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_EDITED,
          data: response.data,
        });
        // close this ui
        onEdit();
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: err?.message });
    }
  };

  useEffect(() => {
    if (editRef.current) {
      editRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (previewRef.current) {
      if (post && post?.image) {
        previewRef.current.classList.remove("hidden");
        previewRef.current.children[0].src = `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/${post.image}`;
      }
      if (iImg.current) {
        iImg.current.addEventListener("change", function (event) {
          const file = event.target.files[0];
          const imageUrl = URL.createObjectURL(file);
          previewRef.current.classList.remove("hidden");
          previewRef.current.children[0].src = imageUrl;
        });
      }
    }
  }, [post]);

  return (
    <div ref={editRef} className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        {isEditMode ? "Edit Post" : "Create Post"}
      </h6>

      <form
        onSubmit={
          isEditMode
            ? handleSubmit(handleEditPost)
            : handleSubmit(handlePostSubmit)
        }
      >
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firsName} {user?.lastName}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <Field label="Add Photo" img={addPhotoIcon} error={errors.image}>
            <input
              {...register("image")}
              type="file"
              name="image"
              id="image"
              hidden
              ref={iImg}
            />
          </Field>
        </div>

        {/* Post Text Input  */}

        <Field label="" error={errors.content}>
          <textarea
            {...register("content", { required: "Please add some thoughts!!" })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-30 w-full bg-transparent focus:outline-none "
            defaultValue={post?.content}
          ></textarea>
        </Field>

        <div
          ref={previewRef}
          className="w-1/3 mx-auto mb-8 border-green-500 border-2 hidden"
        >
          <img />
        </div>

        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
