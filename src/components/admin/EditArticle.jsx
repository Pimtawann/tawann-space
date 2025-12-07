import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ConfirmDeleteArticleDialog from "@/components/modal/ConfirmDeleteArticleDialog";
import { Trash2 } from "lucide-react";
import Loading from "@/components/ui/Loading";

export default function EditArticle() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    content: "",
    category_id: null,
    status_id: null,
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [introduction, setIntroduction] = useState("");
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const resp = await axios.get(
          "https://tawann-space-db-api.vercel.app/auth/categories"
        );
        setCategories(resp.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(
          `https://tawann-space-db-api.vercel.app/posts/${postId}`
        );
        const postData = response.data.data;

        console.log("Fetched post data:", postData);
        console.log("Category ID type:", typeof postData.category_id, postData.category_id);

        setPost({
          title: postData.title || "",
          description: postData.description || "",
          content: postData.content || "",
          category_id: Number(postData.category_id),
          status_id: Number(postData.status_id),
          image: postData.image || "",
        });
        setIntroduction(postData.description || "");
      } catch (error) {
        console.error("Failed to fetch post:", error);
        toast.error("Failed to load article");
        navigate("/admin/article");
      } finally {
        setIsFetching(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(
        "The file is too large. Please upload an image smaller than 5MB."
      );
      return;
    }

    setImageFile({ file });
  };

  const handleSave = async (statusId) => {
    if (!post.title || post.title.trim() === "") {
      toast.error("Please enter a title.");
      return;
    }

    if (!post.description || post.description.trim() === "") {
      toast.error("Please enter an introduction.");
      return;
    }

    if (!post.content || post.content.trim() === "") {
      toast.error("Please enter content.");
      return;
    }

    if (!post.category_id) {
      toast.error("Please select a category.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("category_id", Number(post.category_id));
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("status_id", Number(statusId));

    if (imageFile) {
      formData.append("imageFile", imageFile.file);
    } else {
      formData.append("image", post.image);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token missing");
      }
      await axios.put(
        `https://tawann-space-db-api.vercel.app/posts/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      sessionStorage.setItem("toastType", statusId === 1 ? "draft" : "publish");
      toast.success("Article updated successfully");
      navigate("/admin/article");
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data || error.message
      );
      toast.error("Failed to update post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token missing");
      }

      await axios.delete(
        `https://tawann-space-db-api.vercel.app/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Article deleted successfully");
      navigate("/admin/article");
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete article"
      );
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-4 mb-8 border-b border-brown-3">
        <p className="text-2xl font-semibold text-brown-6">Edit article</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleSave(1)}
            disabled={isLoading}
            className="flex gap-2 text-brown-6 bg-white border border-brown-6 font-medium px-7 py-3 rounded-full hover:bg-brown-3 cursor-pointer"
          >
            {isLoading ? "Saving..." : "Save as draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSave(2)}
            disabled={isLoading}
            className="flex gap-2 bg-brown-6 text-white font-medium px-12 py-3 rounded-full hover:bg-brown-4 cursor-pointer"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="px-8 pb-15">
        <form>
          <div>
            <label className="text-brown-4 font-medium">Thumbnail image</label>
            <div className="flex items-end space-x-5 py-4">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile.file)}
                  alt="Preview"
                  className="rounded-md object-cover max-w-lg h-80"
                />
              ) : post.image ? (
                <img
                  src={post.image}
                  alt="Current thumbnail"
                  className="rounded-md object-cover max-w-lg h-80"
                />
              ) : (
                <div className="flex justify-center items-center w-full max-w-lg h-80 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-brown-2">
                  <div className="text-center space-y-2">
                    <Image
                      className="mx-auto h-10 w-10 text-brown-4"
                      strokeWidth={1}
                    />
                  </div>
                </div>
              )}
              <label
                htmlFor="file-upload"
                className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-brown-3 hover:bg-brown-3  cursor-pointer"
              >
                <span>Upload thumbnail image</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <div className="flex-1 max-w-lg">
              <label className="text-brown-4 font-medium">Category</label>
              <Select
                key={post.category_id || "no-category"}
                value={post.category_id ? String(post.category_id) : undefined}
                onValueChange={(val) => setPost({ ...post, category_id: Number(val) })}
              >
                <SelectTrigger className="w-full mt-1 bg-white !h-10 !text-brown-4 font-medium border-brown-3 cursor-pointer">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={String(cat.id)}
                      className="text-brown-4 cursor-pointer"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 max-w-lg mt-2">
              <label className="text-brown-4 font-medium">Author name</label>
              <Input
                disabled
                value="Thompson P."
                className="bg-brown-2 mt-1 h-10 text-brown-5 font-medium"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-brown-4 font-medium">Title</label>
            <Input
              placeholder="Article title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full break-words whitespace-pre-wrap bg-white h-10 mt-1 border-brown-3 placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          <div className="mt-6">
            <label className="text-brown-4 font-medium">
              Introduction (max 120 letters)
              <span className="text-sm text-gray-400 ml-4">
                {introduction.replace(/\s/g, "").length}/120
              </span>
            </label>
            <Textarea
              placeholder="Introduction"
              maxLength={120}
              value={introduction}
              onChange={(e) => {
                setIntroduction(e.target.value);
                setPost({ ...post, description: e.target.value });
              }}
              className="w-full break-words whitespace-pre-wrap bg-white mt-1 h-30 border-brown-3 placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          <div className="mt-6">
            <label className="text-brown-4 font-medium">Content</label>
            <Textarea
              placeholder="Content"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full break-words whitespace-pre-wrap bg-white mt-1 h-80 border-brown-3 placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          <div className="mt-6 flex items-center gap-2 text-red">
          <Trash2 size={16} />
            <p
              onClick={() => setShowDeleteModal(true)}
              className="hover:underline cursor-pointer font-medium"
            >
              Delete article
            </p>
          </div>
        </form>
      </div>

      <ConfirmDeleteArticleDialog
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDelete}
        articleTitle={post.title}
      />
    </div>
  );
}
