import { CheckCircle2 } from "lucide-react";
import Button from "./Button";

const SuccessPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/20 backdrop-blur-md border border-green-300/30 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Success</h3>
        </div>
        <p className="text-white/90 mb-6">{message}</p>
        <Button onClick={onClose} variant="secondary" className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SuccessPopup;
