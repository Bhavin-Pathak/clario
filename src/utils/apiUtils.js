import OpenAI from "openai";
import { ERROR_MESSAGES } from "../utils/errorMessages";

export const summarizeText = async (text, apiKey) => {
  if (!apiKey || apiKey.length < 10) {
    throw new Error(ERROR_MESSAGES.INVALID_API_KEY);
  }

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // Only use this in a secure environment
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional text summarizer. Create concise, well-structured summaries that capture the main points and key information from the given text. Keep summaries significantly shorter than the original while maintaining accuracy and clarity.",
        },
        {
          role: "user",
          content: `Please summarize the following text in 2-3 concise paragraphs, focusing on the main points and key information:\n\n${text}`,
        },
      ],
      max_tokens: Math.min(500, Math.floor(text.length / 4)),
      temperature: 0.3,
    });

    if (!completion.choices?.[0]?.message?.content) {
      throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    return completion.choices[0].message.content.trim();
  } catch (error) {
    if (error.status === 401) {
      throw new Error(ERROR_MESSAGES.INVALID_API_KEY);
    } else if (error.status === 429) {
      throw new Error(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
    } else if (error.status === 403) {
      throw new Error(ERROR_MESSAGES.PERMISSION_DENIED);
    } else if (
      error.name === "TypeError" ||
      error.message.includes("network")
    ) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      throw new Error(error.message || ERROR_MESSAGES.INVALID_RESPONSE);
    }
  }
};
