export default function PostBody({ poster, content }) {
  return (
    <div class="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <p className="mb-4">{content ?? "No content available"}</p>
      <div class="flex items-center justify-center overflow-hidden">
        {poster && (
          <img
            class="max-w-full w-1/2"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
            alt="poster"
          />
        )}
      </div>
    </div>
  );
}
