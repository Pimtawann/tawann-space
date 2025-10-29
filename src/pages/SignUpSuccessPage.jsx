import Navbar from "@/components/navbar/PublicNavbar.jsx";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SignUpSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[85vh] text-center p-4">
        <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
        <h1 className="text-2xl font-semibold text-brown-6 mb-2">
          Sign up successful!
        </h1>
        <p className="text-brown-4 mb-6 text-lg">
          Your account has been created. You can now log in.
        </p>
        <Button
          onClick={() => navigate("/login")}
          className="bg-brown-6 text-white text-lg px-6 py-6 rounded-full hover:bg-brown-4 cursor-pointer"
        >
          Go to Login
        </Button>
      </div>
      <Footer />
    </div>
  );
}
