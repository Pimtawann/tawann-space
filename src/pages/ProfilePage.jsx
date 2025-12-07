import UserProfileForm from "@/components/form/UserProfileForm";
import MemberNavbar from "@/components/navbar/MemberNavbar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import { useAuth } from "@/context/authentication";
import Loading from "@/components/ui/Loading";

export default function ProfilePage() {
  const { state } = useAuth();
  const isLoading = state.getUserLoading;
  const isLoggedIn = !!state.user;
  const isAdmin = state.user?.role === "admin";

  if (isLoading) {
    return <Loading />;
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
            <UserProfileForm />
        </div>
      </div>
    </div>
  );
}