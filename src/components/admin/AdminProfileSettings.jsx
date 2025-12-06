import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/authentication";
import { User } from "lucide-react";

export default function AdminProfileSettings() {
  const { state } = useAuth();
  const user = state.user;

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePic: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("The file is too large. Please upload an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 500;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

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

        const compressedBase64 = canvas.toDataURL(file.type, 0.8);
        setImageFile(compressedBase64);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.username.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token missing");
      }

      const updateData = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        bio: formData.bio.trim(),
      };

      if (imageFile) {
        updateData.profilePic = imageFile;
      }

      await axios.put(
        "https://tawann-space-db-api.vercel.app/auth/update-profile",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.error || "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-4 mb-8 border-b border-brown-3">
        <p className="text-2xl font-semibold text-brown-6">Profile Settings</p>
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="flex gap-2 bg-brown-6 text-white font-medium px-12 py-3 rounded-full hover:bg-brown-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="px-8 pb-15">
        <form>
          <div className="mb-6">
            <div className="flex items-center gap-4 mt-3">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brown-3 flex items-center justify-center bg-brown-2">
                {(imageFile || formData.profilePic) ? (
                  <img
                    src={imageFile || formData.profilePic}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-brown-4" />
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="px-6 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-brown-3 hover:bg-brown-3 cursor-pointer"
              >
                <span>Upload profile picture</span>
                <input
                  id="profile-upload"
                  name="profile-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                />
              </label>
            </div>
          </div>

          <div className="mb-6 max-w-md">
            <label className="text-brown-4 font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="w-full h-10 mt-1 border-brown-3 bg-white placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          <div className="mb-6 max-w-md">
            <label className="text-brown-4 font-medium">Username</label>
            <Input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Enter your username"
              className="w-full h-10 mt-1 border-brown-3 bg-white placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          {/* Email (read-only) */}
          <div className="mb-6 max-w-md">
            <label className="text-brown-4 font-medium">Email</label>
            <Input
              value={formData.email}
              disabled
              className="w-full h-10 mt-1 border-brown-3 bg-brown-2 text-brown-5 placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          <div className="mb-6">
            <label className="text-brown-4 font-medium">Bio (max 120 letters)</label>
            <Textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Tell us about yourself..."
              className="w-full mt-1 h-32 border-brown-3 bg-white placeholder:text-brown-4 placeholder:font-medium resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
