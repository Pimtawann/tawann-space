import { useState, useEffect } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockArticles = [
  {
    title:
      "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do…",
    category: "Cat",
    status: "Published",
  },
  {
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    category: "Cat",
    status: "Draft",
  },
  {
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    category: "General",
    status: "Published",
  },
  {
    title:
      "The Science of the Cat’s Purr: How It Benefits Cats and Humans Alike",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
    category: "Cat",
    status: "Draft",
  },
  {
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    category: "Inspiration",
    status: "Published",
  },
];

export default function ArticleManagement() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredArticles = mockArticles.filter((article) => {
    const matchTitle = article.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus =
      statusFilter && statusFilter !== "all"
        ? article.status.toLowerCase() === statusFilter
        : true;

    const matchCategory =
      categoryFilter && categoryFilter !== "all"
        ? article.category.toLowerCase() === categoryFilter
        : true;
    return matchTitle && matchStatus && matchCategory;
  });

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

          {/* Category Filter */}
          <Select
            value={categoryFilter}
            onValueChange={(val) => setCategoryFilter(val)}
          >
            <SelectTrigger className="w-[160px] !h-10 border border-brown-3 rounded-md text-brown-4 bg-white">
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
                  key={i}
                  className={i % 2 === 0 ? "bg-brown-1" : "bg-brown-2"}
                >
                  <td className="px-4 py-4 truncate text-brown-6">
                    {article.title}
                  </td>
                  <td className="px-4 py-4">{article.category}</td>
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
    </div>
  );
}
