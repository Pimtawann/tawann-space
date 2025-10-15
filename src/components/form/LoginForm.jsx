import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="w-full max-w-sm mx-auto mt-20 bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Log in</h1>
      <form className="space-y-4">
        <Input placeholder="Email" name="email" type="email" />
        <Input placeholder="Password" name="password" type="password" />
        <Button className="w-full" type="submit">
          Log in
        </Button>
      </form>

      <p className="text-center text-sm mt-4">
        Don’t have any account?{" "}
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
