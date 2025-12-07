import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import AdminProfileSettings from "@/components/admin/AdminProfileSettings";

export default function AdminProfilePage() {
  return (
    <div className="min-h-screen flex">
      <AdminPanelSidebar />
      <main className="flex-1">
        <AdminProfileSettings />
      </main>
    </div>
  );
}
