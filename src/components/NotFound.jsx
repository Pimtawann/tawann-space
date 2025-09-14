import { CircleAlert } from "lucide-react";

function NotFound(props) {
  return (
    <div className="flex flex-col items-center gap-5 mx-auto py-50">
      <CircleAlert size={60} />
      <p className="text-2xl font-bold text-[#26231e] mb-2">{props.title}</p>
      {props.onAction && (
        <button
          onClick={props.onAction}
          className="w-45 h-12 rounded-full font-semibold bg-[#26231e] text-white border border-[#d7d2cb] hover:opacity-80 transition"
        >
          Go to Homepage
        </button>
      )}
    </div>
  );
}

export default NotFound;
