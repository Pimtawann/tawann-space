import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Please enter category name");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token missing");
      }

      await axios.post(
        "https://tawann-space-db-api.vercel.app/auth/categories",
        { name: categoryName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category created successfully");
      navigate("/admin/category");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(
        error.response?.data?.message || "Failed to create category"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-4 mb-8 border-b border-brown-3">
        <p className="text-2xl font-semibold text-brown-6">Create category</p>
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="flex gap-2 bg-brown-6 text-white font-medium px-12 py-3 rounded-full hover:bg-brown-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="px-8">
        <div className="max-w-lg">
          <label className="text-brown-4 font-medium">Category name</label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full h-10 mt-1 border-brown-3 bg-white placeholder:text-brown-4 placeholder:font-medium"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSave();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
