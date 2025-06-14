const TextLengthCounter = ({ text, label }) => {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="flex gap-4 text-sm text-white/70">
      <span>
        {label}: {wordCount} words
      </span>
      <span>{charCount} characters</span>
    </div>
  );
};

export default TextLengthCounter;
