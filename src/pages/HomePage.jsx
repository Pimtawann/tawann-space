import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ArticleSection from "../components/ArticleSection";
import AdminNavbar from "@/components/navbar/AdminNavbar";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
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