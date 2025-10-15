import { useState } from "react";
import { useAuth } from "@/contexts/authentication";
import LoginAlertDialog from "../ui/LoginAlertDialog";

export default function CommentBox(props) {
  const auth = useAuth();
  const user = auth.user;
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  function trySend() {
    if (!user) return setOpen(true);
    if (!text.trim()) return;
    onSend?.(text);
    setText("");
  }

  return (
    <div>
      <div className="pb-10 pt-5">
        <label className="mb-2 block font-medium text-[#75716b]">Comment</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What are your thoughts?"
          className="h-24 w-full resize-none rounded-lg border-[#dad6d1] font-medium text-[#75716b] border px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-zinc-300 
          placeholder:text-[#75716b] placeholder:font-medium"
          onFocus={() => !user && setOpen(true)}
        />
        <div className="mt-3 flex justify-start md:justify-end">
          <button
            onClick={trySend}
            className="rounded-full bg-[#26231e] h-[47px] w-[25%] md:w-[20%] text-white font-medium hover:opacity-90"
          >
            Send
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
