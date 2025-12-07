import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import ConfirmResetPasswordDialog from "@/components/modal/ConfirmResetPasswordDialog";

export default function AdminResetPassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetClick = () => {
    // Validation
    if (!formData.currentPassword.trim() || !formData.newPassword.trim() || !formData.confirmPassword.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    // Open confirmation modal
    setIsModalOpen(true);
  };

  const handleConfirmReset = async () => {
    setIsModalOpen(false);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token missing");
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

      toast.success("Password reset successfully");

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(
        error.response?.data?.error || "Failed to reset password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-4 mb-8 border-b border-brown-3">
        <p className="text-2xl font-semibold text-brown-6">Reset password</p>
        <button
          type="button"
          onClick={handleResetClick}
          disabled={isLoading}
          className="flex gap-2 bg-brown-6 text-white font-medium px-12 py-3 rounded-full hover:bg-brown-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Resetting..." : "Reset password"}
        </button>
      </div>

      <div className="px-8 pb-15">
        <form>
          <div className="mb-6 max-w-md">
            <label className="text-brown-4 font-medium">Current password</label>
            <Input
              type="password"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              placeholder="Current password"
              className="w-full h-10 mt-1 border-brown-3 bg-white placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          <div className="mb-6 max-w-md">
            <label className="text-brown-4 font-medium">New password</label>
            <Input
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              placeholder="New password"
              className="w-full h-10 mt-1 border-brown-3 bg-white placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>

          <div className="mb-6 max-w-md">
            <label className="text-brown-4 font-medium">Confirm new password</label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm new password"
              className="w-full h-10 mt-1 border-brown-3 bg-white placeholder:text-brown-4 placeholder:font-medium"
            />
          </div>
        </form>
      </div>

      <ConfirmResetPasswordDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
