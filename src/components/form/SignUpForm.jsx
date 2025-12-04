import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/authentication";
import { toast } from "sonner";

export default function SignUpForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Please enter your username";
    }

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

    if (validate()) {
      try {
        const registerPromise = register(formData);

        toast.promise(registerPromise, {
          loading: "Signing up...",
          success: "Account created successfully!",
          error: (err) => err?.error || "Registration failed",
        });

        await registerPromise;
      } catch (error) {
        console.log("Signup error:", error);
        const errorMessage = error?.error || "Registration failed";

        // Display error under appropriate field
        if (errorMessage.toLowerCase().includes("email")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email is already taken, Please try another email."
          }));
        } else if (errorMessage.toLowerCase().includes("username")) {
          setErrors((prevErrors) => ({ ...prevErrors, username: errorMessage }));
        }
      }
    }
  };

  return (
    <div className="w-full md:w-160 mx-auto my-20 md:my-30 bg-brown-2 p-6 rounded-2xl">
      <h1 className="text-xl font-semibold text-center my-6 text-brown-6">
        Sign up
      </h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-2 md:mx-16">
        <div>
          <label htmlFor="name" className="text-brown-4 font-medium">
            Name
          </label>
          <Input
            placeholder="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`bg-white h-12 text-brown-5 placeholder:text-brown-4 placeholder:font-medium ${
              errors.name ? "border-red" : "border-brown-3"
            } border`}
          />
          <div className="min-h-[1.25rem] mt-1">
            {errors.name && (
              <p className="text-red text-sm font-medium mt-1">{errors.name}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="username" className="text-brown-4 font-medium">
            Username
          </label>
          <Input
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`bg-white h-12 text-brown-5 placeholder:text-brown-4 placeholder:font-medium ${
              errors.username ? "border-red" : "border-brown-3"
            } border`}
          />
          <div className="min-h-[1.25rem] mt-1">
            {errors.username && (
              <p className="text-red text-sm font-medium mt-1">
                {errors.username}
              </p>
            )}
          </div>
        </div>
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
          <div className="min-h-[1.25rem] mt-1">
            {errors.email && (
              <p className="text-red text-sm font-medium mt-1">
                {errors.email}
              </p>
            )}
          </div>
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
          <div className="min-h-[1.25rem] mt-1">
            {errors.password && (
              <p className="text-red text-sm font-medium mt-1">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="w-30 h-12 md:w-34 bg-brown-6 mt-2 text-lg rounded-full font-medium hover:bg-brown-4 cursor-pointer"
            type="submit"
          >
            Sign up
          </Button>
        </div>
      </form>
      <div className="flex justify-center items-center gap-3 my-4 md:my-6">
        <span className="text-center text-brown-4 font-medium">
          Already have an account?
        </span>
        <Link to="/login" className="text-black !underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
