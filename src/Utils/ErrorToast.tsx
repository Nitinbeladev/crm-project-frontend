import { toast } from "sonner";
import { XCircle } from "lucide-react";

export const showErrorToast = (error: any) => {
  const status = error?.response?.data?.status || "Error";
  const message = error?.response?.data?.message || "Something went wrong";

  toast.custom(() => (
    <div
      className="
        overflow-hidden rounded-xl border w-[300px] shadow-sm 
        bg-white border-red-200 
        dark:bg-zinc-900 dark:border-red-800
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center gap-2 px-3 py-2 border-b
          bg-red-100 border-red-200 text-red-700
          dark:bg-red-950/60 dark:border-red-800 dark:text-red-400
        "
      >
        <XCircle className="w-5 h-5 text-red-600 dark:text-red-500" />
        <p className="text-sm font-medium">{status}</p>
      </div>

      {/* Message */}
      <div className="px-4 py-3">
        <p className="text-sm leading-5 whitespace-pre-line text-red-700 dark:text-red-300">
          {message}
        </p>
      </div>
    </div>
  ));
};
