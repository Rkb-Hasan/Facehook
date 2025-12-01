export default function PostBody({ poster, content }) {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 text-xs md:text-lg ">
      <p className="mb-2 md:mb-4">{content ?? "No content available"}</p>
      <div className="flex items-center justify-center overflow-hidden">
        {poster && (
          <img
            className="max-w-full w-[80%] md:w-1/2"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
            alt="poster"
          />
        )}
      </div>
    </div>
  );
}
