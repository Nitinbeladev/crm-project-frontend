import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export const ShowSuccessToast = (
  res :any
) => {
  toast.custom(() => (
    <div
      className="
        overflow-hidden rounded-xl border w-[300px] shadow-sm 
        bg-white border-green-200
        dark:bg-zinc-900 dark:border-green-800
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center gap-2 px-3 py-2 border-b
          bg-green-100 border-green-200 text-green-800
          dark:bg-green-950/60 dark:border-green-800 dark:text-green-400
        "
      >
        <CheckCircle className="w-5 h-5 text-green-700 dark:text-green-500" />
        <p className="text-sm font-medium">{res.status}</p>
      </div>

      {/* Message */}
      <div className="px-4 py-3">
        <p className="text-sm leading-5 whitespace-pre-line text-green-700 dark:text-green-300">
          {res.message}
        </p>
      </div>
    </div>
  ));
};
