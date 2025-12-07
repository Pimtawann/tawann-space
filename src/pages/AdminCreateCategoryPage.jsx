import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import CreateCategory from "@/components/admin/CreateCategory";

export default function AdminCreateCategoryPage() {
  return (
    <div className="min-h-screen flex">
      <AdminPanelSidebar />
      <main className="flex-1">
        <CreateCategory />
      </main>
    </div>
  );
}
