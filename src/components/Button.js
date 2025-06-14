import { Loader2 } from "lucide-react";

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  loading = false,
  className = "",
}) => {
  const baseClasses =
    "px-6 py-3 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-white/20 hover:bg-white/30 text-white border border-white/30",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
