import MemberNavBar from "@/components/MemberNavbar";
import UserProfileForm from "@/components/form/UserProfileForm";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MemberNavBar />
      <div className="flex-grow pt-14">
        <div className="max-w-[768px] md:max-w-[1200px] md:px-6 md:mx-auto">
            <UserProfileForm />
        </div>
      </div>
    </div>
  );
}