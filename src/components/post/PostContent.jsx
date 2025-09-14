import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function PostContent(props) {
  return (
    <div className="flex flex-col gap-4 py-2 md:mx-6">
      <div className="mx-6 md:mx-0 flex flex-col">
        <div className="flex mt-2 items-center">
          <span className="bg-[#d7f2e9] rounded-full px-3 py-1 text-sm font-medium text-green-600 mb-1 mr-5">
            {props.category}
          </span>
          <span className="font-medium text-[#75716b]">{props.date}</span>
        </div>
        <h2 className="text-start md:text-4xl font-semibold text-2xl mt-3 line-clamp-2 text-[#26231e]">
          {props.title}
        </h2>
        <p className="font-medium text-[#43403b] my-5 flex-grow line-clamp-3">
          {props.description}
        </p>
        <div className="flex items-center"></div>
        <div className="markdown mb-3">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: (p) => (
                <h2
                  className="text-xl font-semibold mt-6 mb-3 text-[#43403b]"
                  {...p}
                />
              ),

              p: (props) => <p className="text-[#43403b]" {...props} />,
            }}
          >
            {props.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default PostContent;
