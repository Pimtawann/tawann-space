import { CircleAlert } from "lucide-react";

export default function NotFound(props) {
  return (
    <div className="flex flex-col items-center gap-5 mx-auto py-50">
      <CircleAlert size={60} />
      <p className="text-2xl font-bold text-brown-6 mb-2">{props.title}</p>
      {props.onAction && (
        <button
          onClick={props.onAction}
          className="w-45 h-12 rounded-full font-semibold bg-brown-6 text-white border hover:bg-brown-4 hover:text-brown-6 transition cursor-pointer"
        >
          Go to Homepage
        </button>
      )}
    </div>
  );
}
