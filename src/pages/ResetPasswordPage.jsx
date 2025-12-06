import MemberNavbar from "@/components/navbar/MemberNavbar";
import ResetPasswordForm from "@/components/form/ResetPasswordForm";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import { useAuth } from "@/context/authentication";
import { LoaderCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const { state } = useAuth();
  const isLoading = state.getUserLoading;
  const isLoggedIn = !!state.user;
  const isAdmin = state.user?.role === "admin";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        <p className="text-brown-6 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAdmin ? (
        <AdminNavbar />
      ) : isLoggedIn ? (
        <MemberNavbar />
      ) : null }
      
      <div className="flex-grow pt-14 md:pt-28">
        <div className="max-w-[768px] md:max-w-[1200px] md:px-6 md:mx-auto">
            <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}