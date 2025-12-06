import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import EditArticle from "@/components/admin/EditArticle";

export default function AdminEditArticlePage() {
  return (
    <div className="min-h-screen flex">
      <AdminPanelSidebar />
      <main className="flex-1">
        <EditArticle />
      </main>
    </div>
  );
}
