import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import PostSection from "@/components/post/PostSection";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import ShareBar from "@/components/post/ShareBar";
import CommentBox from "@/components/post/CommentBox";

function ViewPostPage() {
  const param = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const getPost = async () => {
    try {
      const response = await axios.get(
        `https://blog-post-project-api.vercel.app/posts/${param.postId}`
      );
      setPost(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getPost();
  }, [param.postId]);

  if (!post) return <div className="m-6 text-center">Loading...</div>;
  if (error) return <div className="m-6 text-center">Error loading post.</div>;

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
                url={url}
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

export default ViewPostPage;
