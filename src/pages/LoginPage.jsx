import LoginForm from "@/components/form/LoginForm";
import NavBar from "@/components/NavBar";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="mx-6 mt-6">
            <LoginForm />
        </div>
    </div>
  );
}