import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import PostSection from "@/components/post/PostSection";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewPostPage() {
  const param = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const getPost = async () => {
    try {
      const response = await axios.get(
        `https://blog-post-project-api.vercel.app/posts/${param.postId}`
      );
      console.log("API res", response.data)
      setPost(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getPost();
  }, [param.postId]);

  if (!post) return <div className="m-6 text-center">Loading...</div>

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow pt-11">
        <div className="max-w-[768px] md:max-w-[1200px] md:px-6 md:mx-auto">
          <div>
            <PostSection post={post} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewPostPage;
