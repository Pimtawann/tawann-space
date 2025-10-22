import { useState } from "react";
import Avatar from "@/components/Avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import moodengImg from "@/assets/moodeng.jpg";
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
      <div className="flex justify-start pb-5 pt-3 px-6">
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
      <div className="flex items-center gap-3 mb-6 px-6">
        <Avatar src={user.avatar} name={user.name} size={36} />
        <span className="font-semibold text-xl text-brown-4">{user.name}</span>
        <span className="text-brown-3 text-xl">|</span>
        <span className="text-xl font-semibold text-brown-6">Profile</span>
      </div>

      <div className="bg-brown-2 py-6">
        <div className="flex justify-center mb-4">
          <Avatar src={user.avatar} name={user.name} size={120} />
        </div>
        <div className="flex justify-center mb-6 mt-5">
          <button className="border border-brown-4 text-brown-6 bg-white font-medium px-8 py-3 rounded-full hover:bg-brown-3 transition cursor-pointer">
            Upload profile picture
          </button>
        </div>

        <form className="space-y-6 px-6">
          <div>
            <label className="block text-brown-4 font-medium mb-1">Name</label>
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
            <label className="block text-brown-4 font-medium mb-1">Email</label>
            <Input
              value={user.email}
              readOnly
              disabled
              className="bg-white h-12 border border-brown-3 text-brown-4 opacity-70 cursor-not-allowed"
            />
          </div>

          <div className="mt-4 flex justify-start">
            <Button className="rounded-full bg-brown-6 text-white font-medium px-8 py-5 hover:bg-brown-4">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
