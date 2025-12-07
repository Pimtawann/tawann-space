import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/authentication";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const { login, state } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    console.log("validationErrors:", validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const loginPromise = login(formData);

        toast.promise(loginPromise, {
          loading: "Logging in...",
          success: "Logged in successfully",
          error: (err) => err?.error || "Login failed",
        });

        await loginPromise;
        setLoginError(null);
      } catch (error) {
        setLoginError("Please check your email and password and try again.");
      }
    }
  };

  return (
    <div className="w-full md:w-160 mx-auto mt-20 md:mt-30 bg-brown-2 p-6 rounded-2xl">
      <h1 className="text-xl font-semibold text-center my-6 text-brown-6">
        Log in
      </h1>
      <form noValidate className="space-y-2 md:mx-16" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-brown-4 font-medium">
            Email
          </label>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
          <div className="min-h-[1.25rem] mt-1">
            {loginError && (
              <p className="text-red text-sm font-medium text-center mt-1">
                {loginError}
              </p>
            )}
          </div>
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

      <div className="flex justify-center items-center gap-3 my-4 md:my-6">
        <span className="text-center text-brown-4 font-medium">
          Don't have any account?
        </span>
        <Link to="/signup" className="text-black !underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
