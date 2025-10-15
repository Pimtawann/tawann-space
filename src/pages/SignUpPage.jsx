import SignUpForm from "@/components/form/SignUpForm";
import NavBar from "@/components/NavBar";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="mx-6 mt-6">
        <SignUpForm />
      </div>
    </div>
  );
}
