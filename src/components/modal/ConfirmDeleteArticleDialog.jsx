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

export default function ConfirmDeleteArticleDialog({
  open,
  onOpenChange,
  onConfirm,
  articleTitle,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-brown-6 text-center my-4 text-2xl">
            Delete Article
          </AlertDialogTitle>
          <AlertDialogDescription className="text-brown-4 text-center text-lg mb-4">
            Are you sure you want to delete "{articleTitle}"?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-4 sm:justify-center">
          <AlertDialogCancel className="bg-white border-brown-4 text-brown-6 hover:bg-brown-2 py-5 px-5 rounded-3xl cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red border-red text-white hover:bg-red/80 py-5 px-6 rounded-3xl cursor-pointer"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
