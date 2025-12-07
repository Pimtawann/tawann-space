import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";

export default function EditCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(
          "https://tawann-space-db-api.vercel.app/auth/categories"
        );
        const categories = response.data.categories || [];
        const category = categories.find((cat) => cat.id === Number(categoryId));

        if (category) {
          setCategoryName(category.name);
        } else {
          toast.error("Category not found");
          navigate("/admin/category");
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
        toast.error("Failed to load category");
        navigate("/admin/category");
      } finally {
        setIsFetching(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId, navigate]);

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

      await axios.put(
        `https://tawann-space-db-api.vercel.app/auth/categories/${categoryId}`,
        { name: categoryName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category updated successfully");
      navigate("/admin/category");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(
        error.response?.data?.message || "Failed to update category"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-4 mb-8 border-b border-brown-3">
        <p className="text-2xl font-semibold text-brown-6">Edit category</p>
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
