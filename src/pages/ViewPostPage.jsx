import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Toaster } from "sonner";

import NavBar from "@/components/navbar/Navbar";
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
        const { data } = await axios.get(
          `https://blog-post-project-api.vercel.app/posts/${param.postId}`
        );
        if (!alive.current) return;
        if (!data || !data.id) return setStatus("notfound");
        setPost(data);
        setStatus("ok");
      } catch (err) {
        if (!alive.current) return;
        setStatus(err?.response?.status === 404 ? "notfound" : "error");
      }
    })();
    return () => {
      alive.current = false;
    };
  }, [param.postId]);

  if (status === "loading")
    return <div className="m-6 text-center">Loading...</div>;
  if (status === "notfound") return <NotFoundPage />;
  if (status === "error")
    return (
      <NotFound title="Something went wrong" onAction={() => navigate("/")} />
    );

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
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