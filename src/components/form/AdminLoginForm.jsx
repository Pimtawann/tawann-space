import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function AdminLoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email must be a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null }); // เคลียร์ error ขณะพิมพ์
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "https://tawann-space-db-api.vercel.app/auth/login",
        formData
      );

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      const userResp = await axios.get(
        "https://tawann-space-db-api.vercel.app/auth/get-user",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (userResp.data.role !== "admin") {
        toast.error("Access denied. This page is for admin only.");
        return;
      }

      toast.success("Login successful");
      navigate("/admin/article");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="w-full md:w-160 mx-auto mt-20 md:mt-30 bg-brown-2 p-6 rounded-2xl">
      <Toaster position="top-right" richColors />
      <p className="text-center text-2xl text-orange font-medium mt-6 mb-3">
        Admin panel
      </p>
      <h1 className="text-xl font-semibold text-center mb-6 text-brown-6">
        Log in
      </h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-4 mx-16">
        <div>
          <label htmlFor="email" className="text-brown-4 font-medium">
            Email
          </label>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-white h-12 text-brown-5 placeholder:text-brown-4 placeholder:font-medium ${
              errors.email ? "border-red" : "border-brown-3"
            } border`}
          />
          {errors.email && (
            <p className="text-red text-sm font-medium mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="text-brown-4 font-medium">
            Password
          </label>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`bg-white h-12 text-brown-5 placeholder:text-brown-4 placeholder:font-medium ${
              errors.password ? "border-red" : "border-brown-3"
            } border`}
          />
          {errors.password && (
            <p className="text-red text-sm font-medium mt-1">
              {errors.password}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            className="w-30 h-12 md:w-34 bg-brown-6 mt-2 text-lg rounded-full font-medium hover:bg-brown-4 cursor-pointer"
            type="submit"
          >
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
