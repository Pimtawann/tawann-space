import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";

function SearchBox(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const timer = useRef();

  useEffect(() => {
    clearTimeout(timer.current);
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    timer.current = setTimeout(async () => {
      const params = { keyword: searchQuery };
      const { data } = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        { params }
      );
      const list = (data.posts ?? []).filter(
        (post, index, allPosts) => allPosts.findIndex((postToCompare) => postToCompare.id === post.id) === index
      )
      setResults(list);
      setOpen(true);
    }, 300);
    return () => clearTimeout(timer.current);
  }, [searchQuery]);

  const go = (post) => {
    setSearchQuery("");
    setOpen(false);
    navigate(`/post/${post.id}`);
  };

  return (
    <div className=" z-[60]">
      <div className="relative">
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search"
          className="w-full h-[48px] px-4 border rounded-lg bg-white text-[#26231e] placeholder:text-[#75716b] placeholder:font-medium"
        />
        {open && (
          <div className="absolute w-full mt-2 bg-white text-[#26231e] border rounded-xl shadow z-[60]">
            {results.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">No results</div>
            )}
            {results.map((post) => (
              <button
                key={post.id}
                onClick={() => go(post)}
                className="w-full text-left px-4 py-2 hover:bg-[#efeeeb] hover:text-[#75716b]"
              >
                <div className="font-medium">{post.title}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <Search
          size={20}
          className="absolute right-5.5 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
}

export default SearchBox;
