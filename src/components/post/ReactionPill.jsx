import { useState } from "react";
import { useAuth } from "@/contexts/authentication";
import LoginAlertDialog from "../ui/LoginAlertDialog";
import { SmilePlus } from 'lucide-react';

export default function ReactionPill(props) {
  const initial = props.initial ?? 0;
  const onReact = props.onReact;

  const auth = useAuth();
  const user = auth.user;

  const [count, setCount] = useState(initial);
  const [open, setOpen] = useState(false);

  function handleClick() {
    if (!user) return setOpen(true);
    setCount((count) => count + 1);
    onReact?.();
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex justify-center items-center gap-2 h-[47px] md:w-[120px] font-medium rounded-full border border-[#26231e] bg-white w-full py-2 hover:bg-zinc-50"
        aria-label="React to this post"
      >
        <SmilePlus size={20} strokeWidth={1.2}/>
        <span>{count}</span>
      </button>

      <LoginAlertDialog
        open={open}
        onClose={() => setOpen(false)}
        onGoLogin={() => (window.location.href = "/login")}
      />
    </div>
  );
}
