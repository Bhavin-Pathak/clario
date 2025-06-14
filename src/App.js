import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import AnimatedText from "./components/AnimatedText";
import TextInput from "./components/TextInput";
import TextLengthCounter from "./components/TextLengthCounter";
import Button from "./components/Button";
import ErrorPopup from "./components/ErrorPopup";
import SuccessPopup from "./components/SuccessPopup";
import ApiKeySection from "./components/ApiKeySection";
import { summarizeText } from "./utils/apiUtils";
import { ERROR_MESSAGES } from "./utils/errorMessages";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [apiKey, setApiKey] = useState(() => {
    // Retrieve API key from localStorage on initial load
    return localStorage.getItem("clario_openai_api_key") || "";
  });
  const [isApiKeyLocked, setIsApiKeyLocked] = useState(() => {
    // Check if API key is already saved in localStorage
    return !!localStorage.getItem("clario_openai_api_key");
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [animateText, setAnimateText] = useState(false);

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("clario_openai_api_key", apiKey);
    } else {
      localStorage.removeItem("clario_openai_api_key");
    }
  }, [apiKey]);

  const handleApiKeySave = () => {
    if (!apiKey.trim()) {
      setErrorMessage(ERROR_MESSAGES.EMPTY_API_KEY);
      return;
    }
    setIsApiKeyLocked(true);
    setSuccessMessage(
      "API key saved successfully! You can now use Clario for summarization."
    );
  };

  const handleReset = () => {
    setApiKey("");
    setIsApiKeyLocked(false);
    setInputText("");
    setSummary("");
    setShowSummary(false);
    setAnimateText(false);
    setSuccessMessage("Configuration reset successfully!");
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setErrorMessage(ERROR_MESSAGES.EMPTY_INPUT_TEXT);
      return;
    }
    if (!isApiKeyLocked) {
      setErrorMessage(ERROR_MESSAGES.API_KEY_NOT_SAVED);
      return;
    }

    setShowSummary(true);
    setIsLoading(true);
    setSummary("");
    setAnimateText(false);

    try {
      const result = await summarizeText(inputText, apiKey);
      setSummary(result);
      setTimeout(() => setAnimateText(true), 300);
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setShowSummary(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-800 to-black p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            Clario 💻
          </h1>
          <p className="text-white/80 text-lg">
            Transform long text into concise summaries with AI
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              📝 Enter Your Text
            </h2>
            <TextInput
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here to get a summary..."
              isTextarea
              disabled={!isApiKeyLocked}
            />
            <div className="flex justify-between items-center mb-4">
              <TextLengthCounter text={inputText} label="Input" />
            </div>
            <Button
              onClick={handleSummarize}
              disabled={!isApiKeyLocked || !inputText.trim()}
              loading={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? "Summarizing..." : "✨ Generate Summary"}
            </Button>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out ${
              showSummary
                ? "opacity-100 transform translate-y-0 max-h-screen"
                : "opacity-0 transform translate-y-4 max-h-0 overflow-hidden"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                📋 Summary
                {summary && !isLoading && (
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    Generated
                  </span>
                )}
              </h2>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                  <span className="ml-3 text-white/80">
                    Analyzing and summarizing your text...
                  </span>
                </div>
              ) : summary ? (
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <AnimatedText text={summary} isVisible={animateText} />
                  </div>
                  <div className="flex justify-between items-center">
                    <TextLengthCounter text={summary} label="Summary" />
                    <div className="text-sm text-green-400">
                      ✓{" "}
                      {Math.round(
                        ((inputText.length - summary.length) /
                          inputText.length) *
                          100
                      )}
                      % shorter
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <ApiKeySection
            apiKey={apiKey}
            setApiKey={setApiKey}
            onSave={handleApiKeySave}
            isLocked={isApiKeyLocked}
            onReset={handleReset}
          />
        </div>

        <div className="text-center mt-12 pb-8">
          <p className="text-white/60 text-sm">
            Built with React & Tailwind CSS • Powered by AI
          </p>
        </div>
      </div>

      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
      <SuccessPopup
        message={successMessage}
        onClose={() => setSuccessMessage("")}
      />
    </div>
  );
};

export default App;
