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
import { useState } from "react";

function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");

  return (
    <div className="w-full mx-auto md:px-8 py-10">
      <h2 className="text-2xl font-bold text-[#26231e] mb-5 px-5">
        Latest articles
      </h2>
      <div className="bg-[#efeeeb] h-[172px] md:h-[80px] p-3.5 md:rounded-2xl md:mx-5">
        <div className="grid gap-3 md:flex md:justify-between md:items-center">
          <div className="hidden md:flex md:flex-nowrap md:gap-4">
            {categories.map((item, index) => (
              <button
                key={index}
                className={`${category === item ? "bg-[#d8d4ce] text-[#26231e]" : "hover:bg-gray-100 text-[#75716b]"} h-[48px] px-4 py-2 rounded-lg text-sm font-medium`}
                disabled={category === item}
                onClick={()=>setCategory(item)}
              >
                {item}
              </button>
            ))}
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
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
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
