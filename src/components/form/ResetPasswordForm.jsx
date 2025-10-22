import { useState } from "react";
import Avatar from "@/components/Avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import moodengImg from "@/assets/moodeng.jpg";
import { useNavigate } from "react-router-dom";
import { User, RefreshCcw } from "lucide-react";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Moodeng ja",
    avatar: moodengImg,
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Please enter your New Password";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    } else if (formData.confirmPassword.length < 6) {
        newErrors.confirmPassword = "Password must be at least 6 characters";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ success:", formData);
      // TODO: ส่งไป API ภายหลัง
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-start pb-5 pt-3 px-6 md:hidden">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 w-full py-3 font-medium text-brown-4 hover:text-brown-6 cursor-pointer"
        >
          <User className="w-6 h-6" /> Profile
        </button>
        <button className="flex items-center gap-3 w-full py-3 font-medium text-brown-6 cursor-pointer">
          <RefreshCcw className="w-5 h-5" /> Reset password
        </button>
      </div>
      <div className="flex items-center gap-3 mb-6 px-6 md:px-0">
        <Avatar src={user.avatar} name={user.name} className="md:w-12 md:h-12" />
        <span className="font-semibold text-xl text-brown-4">{user.name}</span>
        <span className="text-brown-3 text-xl">|</span>
        <span className="text-xl font-semibold text-brown-6">
          Reset password
        </span>
      </div>

      <div className="md:flex md:gap-10 md:w-400">
        <div className="hidden md:block md:px-3">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 w-full py-3 font-medium text-brown-4 hover:text-brown-6 cursor-pointer"
        >
          <User className="w-6 h-6" /> Profile
        </button>
        <button className="flex items-center gap-3 w-full py-3 font-medium text-brown-6 cursor-pointer">
          <RefreshCcw className="w-5 h-5" /> Reset password
        </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 px-6 bg-brown-2 py-6 md:rounded-xl md:w-110">
          <div>
            <label className="block text-brown-4 font-medium mb-1">
              Current password
            </label>
            <Input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current password"
              className="bg-white h-12 border border-brown-3 text-brown-5 placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          <div>
            <label className="block text-brown-4 font-medium mb-1">
              New password
            </label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New password"
              className={`bg-white h-12 text-brown-5 placeholder:text-brown-4 placeholder:font-medium ${
                errors.newPassword ? "border-red" : "border-brown-3"
              } border`}
            />
            {errors.newPassword && (
              <p className="text-red text-sm font-medium mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label className="block text-brown-4 font-medium mb-1">
              Confirm new password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className={`bg-white h-12 text-brown-5 placeholder:text-brown-4 placeholder:font-medium ${
                errors.confirmPassword ? "border-red" : "border-brown-3"
              } border`}
            />
            {errors.confirmPassword && (
              <p className="text-red text-sm font-medium mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-start">
            <Button className="rounded-full bg-brown-6 text-white font-medium px-8 py-6 hover:bg-brown-4 cursor-pointer">
              Reset password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
