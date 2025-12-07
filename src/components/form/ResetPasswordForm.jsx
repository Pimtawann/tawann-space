import { useState } from "react";
import Avatar from "@/components/Avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, RefreshCcw } from "lucide-react";
import { useAuth } from "@/context/authentication";
import axios from "axios";
import { toast } from "sonner";
import ConfirmResetPasswordDialog from "@/components/modal/ConfirmResetPasswordDialog";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const { state } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Please enter your current password";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Please enter your new password";
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
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmReset = async () => {
    setShowConfirmDialog(false);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to reset password");
        return;
      }

      await axios.put(
        "https://tawann-space-db-api.vercel.app/auth/reset-password",
        {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password reset successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage = error.response?.data?.error || "Failed to reset password";
      toast.error(errorMessage);

      // Show error under current password field if it's incorrect
      if (errorMessage.toLowerCase().includes("password") &&
          (errorMessage.toLowerCase().includes("incorrect") ||
           errorMessage.toLowerCase().includes("wrong") ||
           errorMessage.toLowerCase().includes("invalid") ||
           errorMessage.toLowerCase().includes("old"))) {
        setErrors({ currentPassword: errorMessage });
      }
    } finally {
      setLoading(false);
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
        <Avatar src={state.user?.profilePic} name={state.user?.username || "User"} className="md:w-12 md:h-12" />
        <span className="font-semibold text-xl text-brown-4">{state.user?.username || "User"}</span>
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
              className={`bg-white h-12 text-brown-5 placeholder:text-brown-4 placeholder:font-medium ${
                errors.currentPassword ? "border-red" : "border-brown-3"
              } border`}
            />
            <p className={`text-red text-sm font-medium mt-1 h-2 ${errors.currentPassword ? "visible" : "invisible"}`}>
              {errors.currentPassword || "\u00A0"}
            </p>
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
            <p className={`text-red text-sm font-medium mt-1 h-2 ${errors.newPassword ? "visible" : "invisible"}`}>
              {errors.newPassword || "\u00A0"}
            </p>
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
            <p className={`text-red text-sm font-medium mt-1 h-2 ${errors.confirmPassword ? "visible" : "invisible"}`}>
              {errors.confirmPassword || "\u00A0"}
            </p>
          </div>

          <div className="mt-4 flex justify-start">
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-brown-6 text-white font-medium px-8 py-6 hover:bg-brown-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset password"}
            </Button>
          </div>
        </form>
      </div>

      <ConfirmResetPasswordDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
