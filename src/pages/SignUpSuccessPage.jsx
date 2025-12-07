import Navbar from "@/components/navbar/PublicNavbar.jsx";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CircleCheck } from 'lucide-react';

export default function SignUpSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[85vh] text-center">
        <div className="flex flex-col items-center bg-brown-2 py-10 px-30 rounded-xl">
          <CircleCheck className="text-green-500 w-20 h-20 mb-6" />
          <h1 className="text-xl font-semibold text-brown-6 mb-8">
            Registration success
          </h1>
          <Button
            onClick={() => navigate("/")}
            className="bg-brown-6 text-white text-lg px-6 py-6 rounded-full hover:bg-brown-4 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
