import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { LoaderCircle } from "lucide-react";

import Navbar from "@/components/navbar/PublicNavbar.jsx";
import Footer from "@/components/Footer";
import PostSection from "@/components/post/PostSection";
import ShareBar from "@/components/post/ShareBar";
import CommentBox from "@/components/post/CommentBox";
import NotFound from "@/components/NotFound";
import NotFoundPage from "./NotFoundPage";

export default function ViewPostPage() {
  const param = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;

    (async () => {
      try {
        setStatus("loading");

        // Check if postId exists
        if (!param.postId) {
          if (!alive.current) return;
          setStatus("notfound");
          return;
        }

        const { data } = await axios.get(
          `https://tawann-space-db-api.vercel.app/posts/${param.postId}`
        );

        if (!alive.current) return;

        // Handle different API response structures: { data: {...} }, { post: {...} }, or {...}
        const postData = data?.data || data?.post || data;

        // Check if postData exists and has a valid id (id can be 0 or any number)
        if (!postData || postData.id === undefined || postData.id === null) {
          console.error("Post data invalid:", { postData, originalData: data });
          setStatus("notfound");
          return;
        }

        setPost(postData);
        setStatus("ok");
      } catch (err) {
        if (!alive.current) return;
        console.error("Error fetching post:", err);
        setStatus(err?.response?.status === 404 ? "notfound" : "error");
      }
    })();
    return () => {
      alive.current = false;
    };
  }, [param.postId]);

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center gap-4">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        <p className="text-brown-6 text-lg font-semibold">Loading...</p>
      </div>
    );
  if (status === "notfound") return <NotFoundPage />;
  if (status === "error")
    return (
      <NotFound title="Something went wrong" onAction={() => navigate("/")} />
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-11">
        <div className="max-w-[768px] md:max-w-[1200px] md:px-6 md:mx-auto">
          <div>
            <PostSection post={post} />
          </div>
          <div className="mx-auto my-8 max-w-[1200px] pt-3 md:grid md:grid-cols-12 md:gap-8 md:pt-5">
            <div className="md:col-span-8">
              <ShareBar
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={post.title}
                reactions={post.likes ?? 0}
              />
            </div>
            <div className="mx-6 md:mx-0 md:col-span-8">
              <CommentBox onSend={(txt) => console.log("send comment;", txt)} />
            </div>
          </div>

          <Toaster position="bottom-right" richColors />
        </div>
      </div>
      <Footer />
    </div>
  );
}
