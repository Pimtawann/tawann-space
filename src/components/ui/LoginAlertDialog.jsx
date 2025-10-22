import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LoginAlertDialog({ open, onClose, onCreate, onGoLogin }) {
  const navigate = useNavigate();

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose?.()}>
      <AlertDialogContent
        className="left-1/2 top-1/2 w-[75%] h-[250px] md:h-[280px] rounded-xl bg-brown-1 p-0 shadow-xl focus:outline-none"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-brown-6 hover:text-brown-4 cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <AlertDialogHeader className="px-5 pt-9 ">
          <AlertDialogTitle className="text-center text-2xl md:text-4xl font-bold text-brown-6">
            Create an account to
            <br className="hidden sm:block" /> continue
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="px-6 pb-8 flex flex-col items-center gap-4 md:pt-4">
          <button
            onClick={() => navigate("/signup")}
            className="w-45 rounded-full bg-brown-6 px-4 py-2 text-white font-medium shadow hover:bg-brown-4 cursor-pointer" 
          >
            Create account
          </button>

          <p className="pt-2 md:pt-5 text-brown-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium underline underline-offset-2 text-brown-6 hover:text-brown-4 cursor-pointer"
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
