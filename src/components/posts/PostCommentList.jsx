export default function PostCommentList({ comments }) {
  return (
    <div class="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
      {!!comments &&
        comments.map((comment) => {
          return (
            <div class="flex items-center gap-3 pt-4">
              {comment?.author?.avatar && (
                <img
                  class="max-w-6 max-h-6 rounded-full"
                  src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
                    comment?.author?.avatar
                  }`}
                />
              )}
              <div>
                <div class="flex gap-1 text-xs lg:text-sm">
                  <span>{comment?.author?.name}: </span>
                  <span>{comment?.comment}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
