import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import AdminResetPassword from "@/components/admin/AdminResetPassword";

export default function AdminResetPasswordPage() {
  return (
    <div className="min-h-screen flex">
      <AdminPanelSidebar />
      <main className="flex-1">
        <AdminResetPassword />
      </main>
    </div>
  );
}
