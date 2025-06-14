const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  isTextarea = false,
  className = "",
}) => {
  const baseClasses =
    "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-200";

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-white/80 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={6}
          className={`${baseClasses} resize-none ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      )}
    </div>
  );
};

export default TextInput;
