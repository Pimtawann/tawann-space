import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="w-full md:w-160 mx-auto mt-20 md:mt-30 bg-brown-2 p-6 rounded-2xl">
      <h1 className="text-xl font-semibold text-center my-6 text-brown-6">
        Log in
      </h1>
      <form className="space-y-4 md:mx-16">
        <label htmlFor="email" className="text-brown-4 font-medium">
          Email
        </label>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          className="bg-white h-12 border border-brown-3 placeholder:text-brown-4 placeholder:font-medium"
        />
        <label htmlFor="password" className="text-brown-4 font-medium">
          Password
        </label>
        <Input
          placeholder="Password"
          name="password"
          type="password"
          className="bg-white h-12 border border-brown-3 placeholder:text-brown-4 placeholder:font-medium"
        />
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
