import { useState, useEffect } from "react";
import { useAuth } from "@/context/authentication";
import LoginAlertDialog from "../ui/LoginAlertDialog";
import { SmilePlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export default function ReactionPill(props) {
  const initial = props.initial ?? 0;
  const postId = props.postId;
  const navigate = useNavigate();

  const { state } = useAuth();
  const user = state.user;

  const [count, setCount] = useState(initial);
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // Fetch liked status when component mounts
  useEffect(() => {
    const fetchLikedStatus = async () => {
      if (!user || !postId) return;

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://tawann-space-db-api.vercel.app/posts/${postId}/liked`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLiked(response.data.liked);
      } catch (error) {
        console.error("Error fetching liked status:", error);
      }
    };

    fetchLikedStatus();
  }, [user, postId]);

  async function handleClick() {
    if (!user) return setOpen(true);
    if (isLiking) return; // Prevent double-clicking

    setIsLiking(true);

    // Optimistic update
    const wasLiked = liked;
    setLiked(!liked);
    setCount((count) => (liked ? count - 1 : count + 1));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://tawann-space-db-api.vercel.app/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update with actual data from server
      setCount(response.data.likes_count);
      setLiked(response.data.liked);
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert optimistic update
      setLiked(wasLiked);
      setCount((count) => (wasLiked ? count + 1 : count - 1));
      toast.error("Failed to update like");
    } finally {
      setIsLiking(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isLiking}
        className={`flex justify-center items-center gap-2 h-[47px] md:w-[120px] font-medium rounded-full border w-full py-2 cursor-pointer transition-colors ${
          liked
            ? "bg-gray-300 border-gray-300 border-2 text-brown-6 hover:bg-brown-2"
            : "bg-white border-brown-6 text-brown-6 hover:bg-brown-2"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={liked ? "Unlike this post" : "Like this post"}
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
