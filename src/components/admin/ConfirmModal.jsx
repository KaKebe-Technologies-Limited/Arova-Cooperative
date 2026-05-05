import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmLabel = "Delete", danger = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <button onClick={onCancel} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition">
          <X size={20} />
        </button>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto ${danger ? "bg-red-100" : "bg-yellow-100"}`}>
          <AlertTriangle size={28} className={danger ? "text-red-600" : "text-yellow-600"} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center mb-8">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 text-white rounded-xl transition font-medium ${danger ? "bg-red-600 hover:bg-red-700" : "bg-yellow-600 hover:bg-yellow-700"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
