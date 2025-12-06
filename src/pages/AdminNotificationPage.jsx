import AdminPanelSidebar from "@/components/navbar/AdminPanelSidebar";
import NotificationHeader from "@/components/header/NotificationHeader";
import AdminNotification from "@/components/admin/AdminNotification";

export default function AdminNotificationPage() {
  return (
    <div className="min-h-screen flex">
      <AdminPanelSidebar />
      <main className="flex-1">
        <NotificationHeader />
        <AdminNotification />
      </main>
    </div>
  );
}
