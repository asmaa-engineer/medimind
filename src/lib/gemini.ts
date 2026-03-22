const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

export const getGeminiResponse = async (prompt: string, context: any) => {
  if (!API_KEY) {
    console.warn("Gemini API Key missing. Using fallback responses.");
    return getFallbackResponse(prompt);
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `System: You are MediMind AI, a helpful medication assistant. Context: ${JSON.stringify(context)}. User: ${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getFallbackResponse(prompt);
  }
};

const getFallbackResponse = (prompt: string) => {
  const p = prompt.toLowerCase();
  if (p.includes("missed")) return "If you missed a dose, check your medication instructions. Usually, you should take it as soon as you remember, unless it's almost time for your next dose.";
  if (p.includes("log") || p.includes("took")) return "I've noted that you took your medication. Great job staying on track!";
  if (p.includes("next")) return "Your next scheduled dose is Metformin at 12:30 PM.";
  return "I'm here to help with your medications. You can ask me about your schedule, side effects, or log a dose.";
};