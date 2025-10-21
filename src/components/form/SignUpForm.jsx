import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  return (
    <div className="w-full md:w-160 mx-auto mt-20 md:mt-30 bg-brown-2 p-6 rounded-2xl">
      <h1 className="text-xl font-semibold text-center my-6 text-brown-6">
        Sign up
      </h1>
      <form className="space-y-4 md:mx-16">
        <label htmlFor="name" className="text-brown-4 font-medium">
          Name
        </label>
        <Input
          placeholder="Full name"
          name="name"
          className="bg-white h-12 border border-brown-3 placeholder:text-brown-4 placeholder:font-medium"
        />
        <label htmlFor="username" className="text-brown-4 font-medium">
          Username
        </label>
        <Input
          placeholder="Username"
          name="username"
          className="bg-white h-12 border border-brown-3 placeholder:text-brown-4 placeholder:font-medium"
        />
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
