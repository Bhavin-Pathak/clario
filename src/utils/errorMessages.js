export const ERROR_MESSAGES = {
  EMPTY_API_KEY: "Please enter an API key before saving.",
  EMPTY_INPUT_TEXT: "Please enter some text to summarize.",
  API_KEY_NOT_SAVED: "Please save your API key first.",
  INVALID_API_KEY: "Invalid API key. Please provide a valid OpenAI API key.",
  RATE_LIMIT_EXCEEDED: "Rate limit exceeded. Please try again later.",
  PERMISSION_DENIED:
    "API key does not have permission to access this resource.",
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  INVALID_RESPONSE: "Invalid response from OpenAI API.",
  API_ERROR: (status, statusText) => `API Error: ${status} - ${statusText}`,
};
