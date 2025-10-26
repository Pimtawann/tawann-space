import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./ui/SearchBox";

export default function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const fetchPosts = async (category) => {
    setIsLoading(true);

    try {
      const params =
        category === "Highlight"
          ? { page, limit: 6 }
          : { page, limit: 6, category };
      const response = await axios.get(
        "https://tawann-space-db-api.vercel.app/posts",
        { params }
      );

      if (page === 1) {
        setPosts(response.data.posts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      }

      if (response.data.currentPage >= response.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts(category);
  }, [page, category]);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full mx-auto md:px-8 py-10">
      <h2 className="text-2xl font-bold text-brown-6 mb-5 px-5">
        Latest articles
      </h2>
      <div className="bg-brown-2 h-[172px] md:h-[80px] p-3.5 md:rounded-2xl md:mx-5">
        <div className="grid gap-3 md:flex md:justify-between md:items-center md:align-middle">
          <div className="hidden md:flex md:flex-nowrap md:gap-4">
            {categories.map((item, index) => (
              <button
                key={index}
                className={`${
                  category === item
                    ? "bg-brown-3 text-brown-6"
                    : "hover:bg-brown-3 text-brown-4"
                } h-[48px] px-4 py-2 rounded-lg text-sm font-medium cursor-pointer`}
                disabled={category === item}
                onClick={() => {
                  setCategory(item);
                  setPage(1);
                  setPosts([]);
                  setHasMore(true);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <div className="relative md:w-[360px]">
              <SearchBox category={category} />
            </div>
          </div>
          <div className="space-y-2 md:hidden">
            <label className="flex font-medium text-lg text-brown-4 px-1">
              Category
            </label>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                setPage(1);
                setPosts([]);
                setHasMore(true);
              }}
            >
              <SelectTrigger
                size="custom"
                className="w-full h-[48px] bg-white border border-brown-3 rounded-lg px-5 text-lg font-medium text-brown-4 focus:ring-2"
              >
                <SelectValue placeholder="Highlight" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => {
                  return (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <article className="grid grid-cols-1 md:grid-cols-2 py-5 gap-10 md:gap-3 mx-6 md:mb-10">
        {posts.map((post, index) => (
          <BlogCard
            key={index}
            id={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={formatDate(post.date)}
          />
        ))}
      </article>
      {hasMore && (
        <div className="py-5 text-center">
          <button
            onClick={handleLoadMore}
            className={`font-medium text-brown-6 ${!isLoading ? "hover:text-brown-4" : ""} ${!isLoading ? "underline" : ""} cursor-pointer`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </div>
  );
}
