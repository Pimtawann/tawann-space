import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ArticleSection from "../components/ArticleSection";
import PublicNavbar from "@/components/navbar/PublicNavbar";
import MemberNavbar from "@/components/navbar/MemberNavbar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import { useAuth } from "@/context/authentication";
import { LoaderCircle } from "lucide-react";

export default function HomePage() {
  const { state } = useAuth();
  const isLoading = state.getUserLoading;
  const isLoggedIn = !!state.user;
  const isAdmin = state.user?.role === "admin";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4">
        <LoaderCircle className="h-5 w-5 text-brown-6 animate-spin" />
        <p className="text-brown-6 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAdmin ? (
        <AdminNavbar />
      ) : isLoggedIn ? (
        <MemberNavbar />
      ) : (
        <PublicNavbar />
      )}

      <div className="flex-grow">
        <div className="max-w-[768px] md:max-w-[1200px] md:px-6 md:mx-auto">
          <div className="mx-6">
            <HeroSection />
          </div>
          <div>
            <ArticleSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
