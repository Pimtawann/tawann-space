import MemberNavBar from "@/components/navbar/MemberNavbar";
import ResetPasswordForm from "@/components/form/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MemberNavBar />
      <div className="flex-grow pt-14 md:pt-28">
        <div className="max-w-[768px] md:max-w-[1200px] md:px-6 md:mx-auto">
            <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}