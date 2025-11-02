import { useState, useEffect } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ArticleManagement() {
  const [articles, setArticles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://tawann-space-db-api.vercel.app/posts",
          {
            params: {
              page: page,
              limit: 10,
            },
          }
        );
        const result = response.data.posts || response.data;
        const sorted = result.slice().sort((a,b) => b.id - a.id);
        setArticles(
          sorted.map((article) => ({
            id: article.id,
            title: article.title,
            categoryRaw: article.category,
            categoryFilter: article.category?.trim().toLowerCase(),
            status:
              article.status.toLowerCase() === "publish"
                ? "published"
                : article.status,
          }))
        );
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        console.error("Error loading articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  const filteredArticles = articles.filter((article) => {
    const matchTitle = article.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus =
      statusFilter === "all" || article.status.toLowerCase() === statusFilter;
    const matchCategory =
      categoryFilter === "all" || article.categoryFilter === categoryFilter;
    console.log("Category:", article.categoryRaw, "| Filter:", categoryFilter);
    console.log("API Category:", article.category);
    return matchTitle && matchStatus && matchCategory;
  });

  if (loading)
    return (
      <div className="p-6 min-h-screen flex justify-center gap-4">
        <LoaderCircle className="h-5 w-5 text-brown-6 animate-spin" />
        <p className="text-brown-6 text-lg font-semibold">Loading...</p>
      </div>
    );
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="px-8">
      {/* Filters */}
      <div className="flex justify-between md:flex-row md:items-center gap-4 mb-6">
        <div className="relative justify-between w-78">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-4 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-brown-3 rounded-md bg-white placeholder:text-brown-4"
          />
        </div>
        <div className="flex gap-4">
          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val)}
          >
            <SelectTrigger className="w-[140px] !h-10 border border-brown-3 rounded-md text-brown-4 bg-white cursor-pointer">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={categoryFilter}
            onValueChange={(val) => setCategoryFilter(val)}
          >
            <SelectTrigger className="w-[160px] !h-10 border border-brown-3 rounded-md text-brown-4 bg-white cursor-pointer">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Category</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="inspiration">Inspiration</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-brown-3 rounded-md overflow-hidden">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-brown-3 text-brown-4">
            <tr>
              <th className="px-4 py-3 w-1/2 font-medium">Article title</th>
              <th className="px-4 py-3 w-1/6 font-medium">Category</th>
              <th className="px-4 py-3 w-1/6 font-medium">Status</th>
              <th className="px-4 py-3 w-1/6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article, i) => {
              const isPublished = article.status.toLowerCase() === "published";
              const statusColor = isPublished ? "text-green-2" : "text-brown-4";
              const dotColor = isPublished ? "bg-green-2" : "bg-brown-4";

              return (
                <tr
                  key={article.id}
                  className={i % 2 === 0 ? "bg-brown-1" : "bg-brown-2"}
                >
                  <td className="px-4 py-4 truncate text-brown-6">
                    {article.title}
                  </td>
                  <td className="px-4 py-4">{article.categoryRaw}</td>
                  <td className="px-4 py-4">
                    <div className={`flex items-center gap-2 ${statusColor}`}>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
                      />
                      <span className="text-sm font-medium">
                        {article.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="text-brown-5 hover:text-brown-3 cursor-pointer">
                        <Pencil size={16} />
                      </button>
                      <button className="text-brown-5 hover:text-red-500 cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredArticles.length === 0 && (
          <p className="text-center py-4 text-brown-4 font-medium">
            No articles found
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(page - 1)} className="cursor-pointer" />
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
                  <PaginationNext onClick={() => setPage(page + 1)} className="cursor-pointer" />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
