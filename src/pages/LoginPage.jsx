import LoginForm from "@/components/form/LoginForm";
import Navbar from "@/components/navbar/Navbar.jsx";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="mx-6 mt-6">
            <LoginForm />
        </div>
    </div>
  );
}