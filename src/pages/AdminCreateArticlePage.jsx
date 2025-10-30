import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import AdminCreateArticleHeader from "@/components/header/CreateArticleHeader";
import CreateArticle from "@/components/admin/CreateArticle";

export default function AdminCreateArticlePage() {
  return (
    <div className="min-h-screen flex">
            <AdminPanelSidebar />
            <main className="flex-1">
              <AdminCreateArticleHeader />
              <CreateArticle />
            </main>
    </div>
  );
}