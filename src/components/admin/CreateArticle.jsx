import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

export default function CreateArticle() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    content: "",
    category_id: null,
    status_id: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("The file is too large. Please upload an image smaller than 5MB.");
      return;
    }

    setImageFile({ file });
  };

  const handleSave = async (statusId) => {
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("category_id", post.category_id);
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("status_id", statusId);
    formData.append("imageFile", imageFile.file);

    try {
      const response = await axios.post(
        `https://blog-post-project-api.vercel.app/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Post created successfully!");
      navigate("/admin/article");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <div className="flex-1 max-w-sm">
            <label className="text-brown-4 font-medium">Category</label>
            <Select>
              <SelectTrigger className="w-full mt-1 bg-white !h-10 text-brown-4 border-brown-3 cursor-pointer">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cat" className="text-brown-4 cursor-pointer">Cat</SelectItem>
                <SelectItem value="inspiration" className="text-brown-4 cursor-pointer">Inspiration</SelectItem>
                <SelectItem value="general" className="text-brown-4 cursor-pointer">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 max-w-sm mt-2">
            <label className="text-brown-4 font-medium">Author name</label>
            <Input
              disabled
              value="Thompson P."
              className="bg-brown-2 mt-1 h-10"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-brown-4 font-medium">Title</label>
          <Input placeholder="Article title" className="bg-white h-10 mt-1 border-brown-3 placeholder:text-brown-4 placeholder:font-medium" />
        </div>

        <div className="mt-6">
          <label className="text-brown-4 font-medium">
            Introduction (max 120 letters)
          </label>
          <Textarea placeholder="Introduction" className="bg-white mt-1 h-30 border-brown-3 placeholder:text-brown-4 placeholder:font-medium" />
        </div>

        <div className="mt-6">
          <label className="text-brown-4 font-medium">Content</label>
          <Textarea placeholder="Content" className="bg-white mt-1 h-80 border-brown-3 placeholder:text-brown-4 placeholder:font-medium" />
        </div>
      </form>
    </div>
  );
}
