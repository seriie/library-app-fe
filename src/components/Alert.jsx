import { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes, FaQuestionCircle } from "react-icons/fa";

export default function Alert({ open, message, type = "success", onClose, onConfirm }) {
    
  useEffect(() => {
    if (open && type !== "confirm") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, type]);

  if (!open) return null;

  const isSuccess = type === "success";
  const isError = type === "error";
  const isConfirm = type === "confirm";

  let bgColor = "bg-green-600";
  let Icon = FaCheckCircle;

  if (isError) {
    bgColor = "bg-red-600";
    Icon = FaExclamationCircle;
  } else if (isConfirm) {
    bgColor = "bg-indigo-600";
    Icon = FaQuestionCircle;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col p-4 mb-4 text-white rounded-xl shadow-2xl min-w-[300px] ${bgColor} animate-popup`}
      role="alert"
    >
      <div className="flex items-center w-full">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-white/20">
          <Icon />
        </div>
        <div className="ml-3 text-sm font-bold mr-8">{message}</div>
        {!isConfirm && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 text-white hover:bg-white/20"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {isConfirm && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 text-sm font-bold bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}