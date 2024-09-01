const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATEFUL_CONTENT,
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_VIOLENT_CONTENT,
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_ADULT_CONTENT,
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_MEDIUM,
    },
    {
      category: HarmCategory.HARM_CATEGORY_OTHER_OFFENSIVE_CONTENT,
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH,
    },
  ];

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AiChatSession = model.startChat({
    generationConfig,
   // safetySettings,
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });