import { useState } from "react";
import Avatar from "@/components/Avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import moodengImg from "@/assets/Moodeng.jpg";
import { useNavigate } from "react-router-dom";
import { User, RefreshCcw } from "lucide-react";

export default function UserProfileForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Moodeng ja",
    username: "moodeng.cute",
    email: "moodeng.cute@gmail.com",
    avatar: moodengImg,
  });

  return (
    <div className="max-w-xl mx-auto rounded-lg">
      <div className="flex justify-start pb-5 pt-3 px-6 md:hidden">
        <button className="flex items-center gap-3 w-full py-3 font-medium text-brown-6 cursor-pointer">
          <User className="w-6 h-6" /> Profile
        </button>
        <button
          onClick={() => navigate("/reset-password")}
          className="flex items-center gap-3 w-full py-3 font-medium text-brown-4 hover:text-brown-6 cursor-pointer"
        >
          <RefreshCcw className="w-5 h-5" /> Reset password
        </button>
      </div>
      <div className="flex items-center gap-3 mb-6 px-6 md:px-0">
        <Avatar src={user.avatar} name={user.name} className="md:h-12 md:w-12" />
        <span className="font-semibold text-xl text-brown-4">{user.name}</span>
        <span className="text-brown-3 text-xl">|</span>
        <span className="text-xl font-semibold text-brown-6">Profile</span>
      </div>

      <div className="md:flex md:gap-10 md:w-400">
        <div className="hidden md:block md:px-3">
          <button className="flex items-center gap-3 w-full py-3 font-medium text-brown-6 cursor-pointer">
            <User className="w-6 h-6" /> Profile
          </button>
          <button
            onClick={() => navigate("/reset-password")}
            className="flex items-center gap-3 w-full py-3 font-medium text-brown-4 hover:text-brown-6 cursor-pointer"
          >
            <RefreshCcw className="w-5 h-5" /> Reset password
          </button>
        </div>

        <div className="bg-brown-2 py-6 md:rounded-xl md:w-110">
            <div className="md:flex md:px-6 md:gap-5 md:justify-center md:items-center">
          <div className="flex justify-center mb-4">
            <Avatar src={user.avatar} name={user.name} className="w-32 h-32" />
          </div>
          <div className="flex justify-center mb-6 mt-5">
            <button className="border border-brown-4 text-brown-6 bg-white font-medium px-8 py-3 rounded-full hover:bg-brown-3 transition cursor-pointer md:h-12">
              Upload profile picture
            </button>
          </div>
          </div>
          <form className="space-y-6 px-6">
            <div>
              <label className="block text-brown-4 font-medium mb-1">
                Name
              </label>
              <Input
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-white h-12 border border-brown-3 text-brown-5"
              />
            </div>

            <div>
              <label className="block text-brown-4 font-medium mb-1">
                Username
              </label>
              <Input
                value={user.username}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, username: e.target.value }))
                }
                className="bg-white h-12 border border-brown-3 text-brown-5"
              />
            </div>

            <div>
              <label className="block text-brown-4 font-medium mb-1">
                Email
              </label>
              <Input
                value={user.email}
                readOnly
                disabled
                className="bg-white h-12 border border-brown-3 text-brown-4 opacity-70 cursor-not-allowed"
              />
            </div>

            <div className="mt-4 flex justify-start">
              <Button className="rounded-full bg-brown-6 text-white font-medium px-8 py-6 hover:bg-brown-4 cursor-pointer">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
