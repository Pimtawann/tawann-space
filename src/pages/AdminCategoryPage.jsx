import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import CategoryManagement from "@/components/admin/CategoryManagement";
import CategoryManagementHeader from "@/components/header/CategoryManagementHeader";

export default function AdminCategoryPage() {
  return (
    <div className="min-h-screen flex">
      <AdminPanelSidebar />
      <main className="flex-1">
        <CategoryManagementHeader />
        <CategoryManagement />
      </main>
    </div>
  );
}
