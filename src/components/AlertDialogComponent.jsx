import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
const AlertDialogComponent = ({
  isMessageModalOpen,
  setIsMessageModalOpen,
  selectedMessage,
  handleModalClose,
  title,
  onConfirm,
}) => {
  return (
    <div>
      {" "}
      <AlertDialog
        open={isMessageModalOpen}
        onOpenChange={setIsMessageModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogTitle>{selectedMessage?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedMessage?.message}
          </AlertDialogDescription>
          <div className="flex justify-end mt-4">
            {title === "Alert" ? (
              ""
            ) : (
              <AlertDialogCancel
                onClick={() => {
                  handleModalClose();
                }}
              >
                Cancel
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              className="ml-2 bg-green-200 hover:bg-green-300 text-black"
              onClick={() => {
                if (onConfirm) onConfirm(); // Call confirm function
                handleModalClose();
              }}
            >
              OK
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default AlertDialogComponent;
