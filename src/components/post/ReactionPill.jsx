import { useState } from "react";
import { useAuth } from "@/contexts/authentication";
import LoginAlertDialog from "../ui/LoginAlertDialog";
import { SmilePlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function ReactionPill(props) {
  const initial = props.initial ?? 0;
  const onReact = props.onReact;
  const navigate = useNavigate();

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
        className="flex justify-center items-center gap-2 h-[47px] md:w-[120px] font-medium rounded-full border border-brown-6 bg-white w-full py-2 hover:bg-brown-2 cursor-pointer"
        aria-label="React to this post"
      >
        <SmilePlus size={20} strokeWidth={1.2}/>
        <span>{count}</span>
      </button>

      <LoginAlertDialog
        open={open}
        onClose={() => setOpen(false)}
        onGoLogin={() => navigate("/login")}
      />
    </div>
  );
}
