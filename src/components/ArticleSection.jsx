import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import { blogPosts } from "../data/blogPosts";

function ArticleSection() {
  return (
    <div className="w-full mx-auto md:px-8 py-10">
      <h2 className="text-2xl font-bold text-[#26231e] mb-5 px-5">
        Latest articles
      </h2>
      <div className="bg-[#efeeeb] h-[172px] md:h-[80px] p-3.5 md:rounded-2xl md:mx-5">
        <div className="grid gap-3 md:flex md:justify-between md:items-center">
          <div className="hidden md:flex md:flex-nowrap md:gap-4">
            <button className="h-[48px] px-4 py-2 rounded-lg text-sm font-medium bg-[#d8d4ce] text-[#26231e]">
              Highlight
            </button>
            <button className="h-[48px] px-4 py-2 rounded-lg text-sm font-medium text-[#26231e]">
              Cat
            </button>
            <button className="h-[48px] px-4 py-2 rounded-lg text-sm font-medium text-[#26231e]">
              Inspiration
            </button>
            <button className="h-[48px] px-4 py-2 rounded-lg text-sm font-medium text-[#26231e]">
              General
            </button>
          </div>
          <div className="space-y-2">
            <div className="relative md:w-[360px]">
              <Input
                placeholder="Search"
                className="px-5 py-3 h-[48px] bg-white border-[#dad6d1] rounded-lg font-medium text-lg text-[#75716b] focus:ring-2"
              />
              <Search
                size={20}
                className="absolute right-5.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
          <div className="space-y-2 md:hidden">
            <label className="flex font-medium text-lg text-[#75716b] px-1">
              Category
            </label>
            <Select>
              <SelectTrigger
                size="custom"
                className="w-full h-[48px] bg-white border border-[#dad6d1] rounded-lg px-5 text-lg font-medium text-[#75716b] focus:ring-2"
              >
                <SelectValue placeholder="Highlight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highlight">Highlight</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="inspiration">Inspiration</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <article className="grid grid-cols-1 md:grid-cols-2 py-5 gap-10 md:gap-3 mx-6 md:mb-10">
        <BlogCard
          image={blogPosts[0].image}
          category={blogPosts[0].category}
          title={blogPosts[0].title}
          description={blogPosts[0].description}
          author={blogPosts[0].author}
          date={blogPosts[0].date}
        />
        <BlogCard
          image={blogPosts[1].image}
          category={blogPosts[1].category}
          title={blogPosts[1].title}
          description={blogPosts[1].description}
          author={blogPosts[1].author}
          date={blogPosts[1].date}
        />
        <BlogCard
          image={blogPosts[2].image}
          category={blogPosts[2].category}
          title={blogPosts[2].title}
          description={blogPosts[2].description}
          author={blogPosts[2].author}
          date={blogPosts[2].date}
        />
        <BlogCard
          image={blogPosts[3].image}
          category={blogPosts[3].category}
          title={blogPosts[3].title}
          description={blogPosts[3].description}
          author={blogPosts[3].author}
          date={blogPosts[3].date}
        />
        <BlogCard
          image={blogPosts[4].image}
          category={blogPosts[4].category}
          title={blogPosts[4].title}
          description={blogPosts[4].description}
          author={blogPosts[4].author}
          date={blogPosts[4].date}
        />
        <BlogCard
          image={blogPosts[5].image}
          category={blogPosts[5].category}
          title={blogPosts[5].title}
          description={blogPosts[5].description}
          author={blogPosts[5].author}
          date={blogPosts[5].date}
        />
      </article>
      <div className="py-5">
        <p className="text-center font-medium text-[#26231e] underline hover:text-[#75716b]">
          View more
        </p>
      </div>
    </div>
  );
}

export default ArticleSection;
