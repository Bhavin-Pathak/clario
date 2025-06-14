import { useState } from "react";
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import TextInput from "./TextInput";
import Button from "./Button";

const ApiKeySection = ({ apiKey, setApiKey, onSave, isLocked, onReset }) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        🔑 API Configuration
        {isLocked && (
          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
            Saved
          </span>
        )}
      </h3>
      <div className="relative">
        <TextInput
          label="OpenAI API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          type={showKey ? "text" : "password"}
          disabled={isLocked}
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute right-5 top-10 text-white/60 hover:text-white/80"
          disabled={isLocked}
        >
          {showKey ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="flex gap-3">
        {!isLocked ? (
          <Button onClick={onSave} className="flex-1">
            Save and Continue
          </Button>
        ) : (
          <Button onClick={onReset} variant="secondary" className="flex-1">
            <RotateCcw className="w-4 h-4" />
            Reset Configuration
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApiKeySection;
