import { useState } from "react";
import { useAuth } from "@/context/authentication";
import LoginAlertDialog from "../ui/LoginAlertDialog";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CommentBox(props) {
  const { postId, onCommentAdded } = props;
  const { state } = useAuth();
  const user = state.user;
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function trySend() {
    if (!user) return setOpen(true);
    if (!text.trim()) return;

    setIsSending(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://tawann-space-db-api.vercel.app/posts/${postId}/comments`,
        { content: text.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Comment posted successfully!");
      setText("");

      if (onCommentAdded) {
        onCommentAdded(response.data.comment);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error(error.response?.data?.error || "Failed to post comment");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      <div className="pb- pt-5">
        <label className="mb-2 block font-medium text-brown-4">Comment</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What are your thoughts?"
          className="h-24 w-full resize-none rounded-lg border-brown-3 font-medium text-brown-4 border px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-brown-3 
          placeholder:text-brown-4 placeholder:font-medium"
          onFocus={() => !user && setOpen(true)}
        />
        <div className="mt-3 flex justify-start md:justify-end">
          <button
            onClick={trySend}
            disabled={isSending}
            className="rounded-full bg-brown-6 h-[47px] w-[25%] md:w-[20%] text-white font-medium hover:bg-brown-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      <LoginAlertDialog
        open={open}
        onClose={() => setOpen(false)}
        onGoLogin={() => (window.location.href = "/login")}
      />
    </div>
  );
}
