import { useState, useEffect } from "react";

const AnimatedText = ({ text, isVisible }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isVisible && text && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 20);

      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [text, currentIndex, isVisible]);

  useEffect(() => {
    if (isVisible && text) {
      setCurrentIndex(0);
      setDisplayText("");
    }
  }, [text, isVisible]);

  return (
    <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
      {displayText}
      {currentIndex < text.length && isVisible && (
        <span className="animate-pulse">|</span>
      )}
    </p>
  );
};

export default AnimatedText;
