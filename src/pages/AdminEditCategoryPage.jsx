import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import EditCategory from "@/components/admin/EditCategory";

export default function AdminEditCategoryPage() {
  return (
    <div className="min-h-screen flex">
      <AdminPanelSidebar />
      <main className="flex-1">
        <EditCategory />
      </main>
    </div>
  );
}
