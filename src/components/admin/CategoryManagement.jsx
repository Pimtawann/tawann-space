import { useState, useEffect } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import ConfirmDeleteArticleDialog from "@/components/modal/ConfirmDeleteArticleDialog";

export default function CategoryManagement() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://tawann-space-db-api.vercel.app/auth/categories"
        );
        setCategories(response.data.categories || []);
        setError(null);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://tawann-space-db-api.vercel.app/auth/categories/${categoryToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category deleted successfully");

      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== categoryToDelete.id)
      );

      setCategoryToDelete(null);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  };

  // Filter categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Paginate filtered categories
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  if (loading) return <Loading />;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="px-8">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-78">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-4 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-brown-3 rounded-md bg-white placeholder:text-brown-4"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-brown-3 rounded-md overflow-hidden">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-brown-3 text-brown-4">
            <tr>
              <th className="px-4 py-3 w-5/6 font-medium">Category</th>
              <th className="px-4 py-3 w-1/6"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category, i) => {
              return (
                <tr
                  key={category.id}
                  className={i % 2 === 0 ? "bg-brown-1" : "bg-brown-2"}
                >
                  <td className="px-4 py-4 text-brown-6">{category.name}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate(`/admin/edit-category/${category.id}`)}
                        className="text-brown-5 hover:text-brown-3 cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setCategoryToDelete(category)}
                        className="text-brown-5 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {paginatedCategories.length === 0 && (
          <p className="text-center py-4 text-brown-4 font-medium">
            No categories found
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(page - 1)}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page === index + 1}
                    onClick={() => setPage(index + 1)}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <ConfirmDeleteArticleDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        onConfirm={handleDeleteCategory}
        articleTitle={categoryToDelete?.name || ""}
        title="Delete Category"
      />
    </div>
  );
}
