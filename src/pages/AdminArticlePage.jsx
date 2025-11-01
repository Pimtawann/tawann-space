import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import AdminArticleHeader from "@/components/header/ArticleManagementHeader";
import ArticleManagement from "@/components/admin/ArticleManagement";

export default function AdminArticlePage() {
  return (
    <div className="min-h-screen flex">
            <AdminPanelSidebar />
            <main className="flex-1">
              <AdminArticleHeader />
              <ArticleManagement />
            </main>
    </div>
  );
}