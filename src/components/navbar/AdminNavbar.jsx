import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, User, RefreshCcw, ChevronDown, SquareArrowOutUpRight } from "lucide-react";
import Avatar from "../Avatar";
import { useAuth } from "@/context/authentication";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, state } = useAuth();

  const username = state.user?.username || "User";
  const avatarUrl = state.user?.profilePic || "";

  return (
    <nav className="w-full bg-brown-1 border-b border-brown-3 fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-7 py-2 md:px-30 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl md:text-4xl text-brown-6 flex items-center cursor-pointer"
        >
          Tawann<span className="text-green-2 text-2xl md:text-4xl">.</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-3">
          <button className="relative flex items-center justify-center bg-white rounded-full w-12 h-12 border border-brown-2 cursor-pointer">
            <Bell className="w-5 h-5 text-brown-5" />
            <span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              className="flex items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Avatar src={avatarUrl} name={username} className="!w-11 !h-11"/>
              <span className="text-brown-5 font-medium text-base cursor-pointer">
                {username}
              </span>
              <ChevronDown className="w-5 h-5 text-brown-4 cursor-pointer" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-md shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 font-medium hover:bg-brown-2 text-brown-5 cursor-pointer"
                >
                  <User className="w-5 h-5" /> Profile
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/reset-password");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 font-medium hover:bg-brown-2 text-brown-5 cursor-pointer"
                >
                  <RefreshCcw className="w-5 h-5" /> Reset password
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/admin/article");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 font-medium hover:bg-brown-2 text-brown-5 cursor-pointer"
                >
                  <SquareArrowOutUpRight className="w-5 h-5" /> Admin panel
                </button>
                <hr className="border-brown-3" />
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 font-medium hover:bg-brown-2 text-brown-5 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="text-4xl text-brown-5 md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-6 px-6 py-8 bg-brown-1 border-t border-brown-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
            <Avatar src={avatarUrl} name={username} size={44} />
            <span className="font-medium text-brown-5">{username}</span>
            </div>
            <div>
              <button className="relative flex items-center justify-center bg-white rounded-full w-12 h-12 border border-brown-2 cursor-pointer hover:bg-brown-2">
                <Bell className="w-5 h-5 text-brown-5" />
                <span className="absolute top-1 right-0 w-2 h-2 bg-red rounded-full" />
              </button>
            </div>
          </div>
          <div className="space-y-5">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/profile");
              }}
              className="flex items-center gap-3 text-brown-5 font-medium px-3 cursor-pointer"
            >
              <User className="w-6 h-6" /> Profile
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/reset-password");
              }}
              className="flex items-center gap-3 text-brown-5 font-medium px-3 cursor-pointer"
            >
              <RefreshCcw className="w-6 h-6" /> Reset password
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/admin/article");
              }}
              className="flex items-center gap-3 text-brown-5 font-medium px-3 cursor-pointer"
            >
              <SquareArrowOutUpRight className="w-6 h-6" /> Admin panel
            </button>
            <hr className="border-brown-3" />
            <button
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-3 text-brown-5 font-medium px-3 cursor-pointer"
            >
              <LogOut className="w-6 h-6" /> Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
