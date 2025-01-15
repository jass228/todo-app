import { toast } from "sonner";

const ToastPopup = (toastText: string, toastType: string) => {
  if (toastType === "success") {
    return toast.success(toastText, {
      style: {
        backgroundColor: "#4caf50", // Set custom background color
        color: "#fff", // Set custom text color
      },
    });
  } else if (toastType === "error") {
    toast.error(toastText, {
      style: {
        backgroundColor: "#f44336", // Custom red background color
        color: "#fff", // White text for better contrast
      },
    });
  }
};

export default ToastPopup;
