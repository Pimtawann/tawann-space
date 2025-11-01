import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-[#f9f8f6] border-b border-[#dad6d1] fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-7 py-2 md:px-30 md:py-4 flex justify-between items-center">
        {/* logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl md:text-4xl text-[#26231e] flex items-center cursor-pointer"
        >
          hh<span className="text-[#12b279] text-2xl md:text-4xl">.</span>
        </div>
        <div className="hidden md:flex gap-3 items-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-white border border-black px-[40px] py-[12px] rounded-full font-medium hover:bg-[#dad6d1] hover:border-[#dad6d1] transition-colors duration-200 cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-black text-white px-[40px] py-[12px] rounded-full font-medium hover:bg-[#dad6d1] hover:text-black transition-colors duration-200 cursor-pointer"
          >
            Sign up
          </button>
        </div>
        <button
          className="text-4xl text-gray-500 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full w-full left-0 flex flex-col items-center gap-7 px-4 py-12 border-b bg-[#f9f8f6] border-gray-300 md:hidden ">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-white border border-black py-3 rounded-full text-lg font-medium mx-auto cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("signup")}
            className="w-full bg-[#26231e] text-white py-3 rounded-full text-lg font-medium mx-auto cursor-pointer"
          >
            Sign up
          </button>
        </div>
      )}
    </nav>
  );
}
