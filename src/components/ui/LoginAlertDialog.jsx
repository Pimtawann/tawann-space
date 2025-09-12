import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

function LoginAlertDialog({ open, onClose, onCreate, onGoLogin }) {
  const goCreate = onCreate ?? (() => (window.location.href = "/register"));
  const goLogin = onGoLogin ?? (() => (window.location.href = "/login"));

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose?.()}>
      <AlertDialogContent
        className="left-1/2 top-1/2 w-[75%] h-[250px] md:h-[280px] rounded-xl bg-[#f9f8f6] p-0 shadow-xl focus:outline-none"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-zinc-600"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <AlertDialogHeader className="px-5 pt-9 ">
          <AlertDialogTitle className="text-center text-2xl md:text-4xl font-bold text-[#26231e]">
            Create an account to
            <br className="hidden sm:block" /> continue
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="px-6 pb-8 flex flex-col items-center gap-4 md:pt-4">
          <button
            onClick={goCreate}
            className="w-45 rounded-full bg-[#26231e] px-4 py-2 text-white font-medium shadow hover:opacity-90" 
          >
            Create account
          </button>

          <p className="pt-2 md:pt-5 text-[#75716b] ">
            Already have an account?{" "}
            <button
              onClick={goLogin}
              className="font-medium underline underline-offset-2 text-black hover:text-zinc-700"
            >
              Log in
            </button>
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoginAlertDialog;
