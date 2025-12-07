import { useState, useEffect, useRef } from "react";
import Avatar from "@/components/Avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, RefreshCcw } from "lucide-react";
import { useAuth } from "@/context/authentication";
import axios from "axios";
import { toast } from "sonner";

export default function UserProfileForm() {
  const navigate = useNavigate();
  const { state, fetchUser } = useAuth();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.user) {
      setFormData({
        name: state.user.name || "",
        username: state.user.username || "",
        email: state.user.email || "",
        avatar: state.user.profilePic || "",
      });
    }
  }, [state.user]);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Resize and compress image before converting to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to resize image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set max dimensions
        const maxWidth = 400;
        const maxHeight = 400;
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression
        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8);
        setFormData((prev) => ({ ...prev, avatar: resizedBase64 }));
        toast.success("Image uploaded successfully!");
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update profile");
        return;
      }

      await axios.put(
        "https://tawann-space-db-api.vercel.app/auth/update-profile",
        {
          name: formData.name,
          username: formData.username,
          profilePic: formData.avatar || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchUser();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Save profile error:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto rounded-lg">
      <div className="flex justify-start pb-5 pt-3 px-6 md:hidden">
        <button className="flex items-center gap-3 w-full py-3 font-medium text-brown-6 cursor-pointer">
          <User className="w-6 h-6" /> Profile
        </button>
        <button
          onClick={() => navigate("/reset-password")}
          className="flex items-center gap-3 w-full py-3 font-medium text-brown-4 hover:text-brown-6 cursor-pointer"
        >
          <RefreshCcw className="w-5 h-5" /> Reset password
        </button>
      </div>
      <div className="flex items-center gap-3 mb-6 px-6 md:px-0">
        <Avatar
          src={state.user?.profilePic}
          name={state.user?.name || "User"}
          className="md:h-12 md:w-12"
        />
        <span className="font-semibold text-xl text-brown-4">
          {state.user?.username || "User"}
        </span>
        <span className="text-brown-3 text-xl">|</span>
        <span className="text-xl font-semibold text-brown-6">Profile</span>
      </div>

      <div className="md:flex md:gap-10 md:w-400">
        <div className="hidden md:block md:px-3">
          <button className="flex items-center gap-3 w-full py-3 font-medium text-brown-6 cursor-pointer">
            <User className="w-6 h-6" /> Profile
          </button>
          <button
            onClick={() => navigate("/reset-password")}
            className="flex items-center gap-3 w-full py-3 font-medium text-brown-4 hover:text-brown-6 cursor-pointer"
          >
            <RefreshCcw className="w-5 h-5" /> Reset password
          </button>
        </div>

        <div className="bg-brown-2 py-6 md:rounded-xl md:w-110">
          <div className="md:flex md:px-6 md:gap-5 md:justify-center md:items-center">
            <div className="flex justify-center mb-4">
              <Avatar
                src={formData.avatar}
                name={formData.name}
                className="w-32 h-32"
              />
            </div>
            <div className="flex justify-center mb-6 mt-5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleImageUpload}
                className="border border-brown-4 text-brown-6 bg-white font-medium px-8 py-3 rounded-full hover:bg-brown-3 transition cursor-pointer md:h-12"
              >
                Upload profile picture
              </button>
            </div>
          </div>
          <form onSubmit={handleSave} className="space-y-6 px-6">
            <div>
              <label className="block text-brown-4 font-medium mb-1">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-white h-12 border border-brown-3 text-brown-5"
              />
            </div>

            <div>
              <label className="block text-brown-4 font-medium mb-1">
                Username
              </label>
              <Input
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                className="bg-white h-12 border border-brown-3 text-brown-5"
              />
            </div>

            <div>
              <label className="block text-brown-4 font-medium mb-1">
                Email
              </label>
              <Input
                value={formData.email}
                readOnly
                disabled
                className="bg-white h-12 border border-brown-3 text-brown-4 opacity-70 cursor-not-allowed"
              />
            </div>

            <div className="mt-4 flex justify-start">
              <Button
                type="submit"
                disabled={loading}
                className="rounded-full bg-brown-6 text-white font-medium px-8 py-6 hover:bg-brown-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
