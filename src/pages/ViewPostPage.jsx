import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Loading from "@/components/ui/Loading";

import PublicNavbar from "@/components/navbar/PublicNavbar.jsx";
import MemberNavbar from "@/components/navbar/MemberNavbar.jsx";
import AdminNavbar from "@/components/navbar/AdminNavbar.jsx";
import Footer from "@/components/Footer";
import PostSection from "@/components/post/PostSection";
import ShareBar from "@/components/post/ShareBar";
import CommentBox from "@/components/post/CommentBox";
import NotFound from "@/components/NotFound";
import NotFoundPage from "./NotFoundPage";
import { useAuth } from "@/context/authentication";

export default function ViewPostPage() {
  const param = useParams();
  const { state } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const alive = useRef(true);

  const isLoggedIn = !!state.user;
  const isAdmin = state.user?.role === "admin";

  const fetchComments = async (postId) => {
    try {
      const { data } = await axios.get(
        `https://tawann-space-db-api.vercel.app/posts/${postId}/comments`
      );
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

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

        const postData = data?.data || data?.post || data;

        // Check if postData exists and has a valid id (id can be 0 or any number)
        if (!postData || postData.id === undefined || postData.id === null) {
          console.error("Post data invalid:", { postData, originalData: data });
          setStatus("notfound");
          return;
        }

        setPost(postData);
        setStatus("ok");

        // Fetch comments after post is loaded
        await fetchComments(param.postId);
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

  if (status === "loading") return <Loading />;
  if (status === "notfound") return <NotFoundPage />;
  if (status === "error")
    return (
      <NotFound title="Something went wrong" onAction={() => navigate("/")} />
    );

  return (
    <div className="min-h-screen flex flex-col">
      {isAdmin ? (
        <AdminNavbar />
      ) : isLoggedIn ? (
        <MemberNavbar />
      ) : (
        <PublicNavbar />
      )}
      <div className="flex-grow pt-11">
        <div className="max-w-[768px] md:max-w-[1200px] md:px-6 md:mx-auto">
          <div>
            <PostSection post={post} />
          </div>
          <div className="mx-auto my-8 max-w-[1200px] pt-3 md:grid md:grid-cols-12 md:gap-8 md:pt-5">
            <div className="md:col-span-8">
              <ShareBar
                postId={post.id}
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={post.title}
                reactions={post.likes_count ?? 0}
              />
            </div>
            <div className="mx-6 md:mx-0 md:col-span-8">
              <CommentBox
                postId={post.id}
                onCommentAdded={handleCommentAdded}
              />
            </div>
            {comments.length > 0 && (
              <div className="mx-6 mt-8 md:m-0 md:col-span-8">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="pb-6 border-b border-brown-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {comment.profile_pic ? (
                            <img
                              src={comment.profile_pic}
                              alt={comment.username}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-brown-4 flex items-center justify-center text-white font-semibold">
                              {comment.username?.[0]?.toUpperCase() || "?"}
                            </div>
                          )}
                        </div>
                          <div className="flex flex-col mb-4">
                            <span className="font-semibold text-xl text-brown-5">
                              {comment.username}
                            </span>
                            <span className="text-sm text-brown-4 font-medium">
                              {new Date(comment.created_at).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })} at {new Date(comment.created_at).toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                        </div>
                      </div>
                      <p className="text-brown-4 font-medium">{comment.comment_text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
