import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ConfirmResetPasswordDialog({ open, onOpenChange, onConfirm }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-brown-6 text-center my-4 text-2xl">
            Confirm Password Reset
          </AlertDialogTitle>
          <AlertDialogDescription className="text-brown-4 text-center text-lg mb-4">
            Do you want to reset your password?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-4 sm:justify-center">
          <AlertDialogCancel className="bg-white border-brown-4 text-brown-6 hover:bg-brown-2 py-5 px-5 rounded-3xl cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-brown-6 border-brown-6 text-white hover:bg-brown-4 py-5 px-6 rounded-3xl cursor-pointer"
          >
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
