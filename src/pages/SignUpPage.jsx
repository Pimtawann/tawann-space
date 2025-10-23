import SignUpForm from "@/components/form/SignUpForm";
import Navbar from "@/components/navbar/Navbar.jsx";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mx-6 mt-6">
        <SignUpForm />
      </div>
    </div>
  );
}
