export const generateThemeFromPrompt = async (prompt) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error("Groq API key not found in .env");
  }

  const systemMessage = `
You are an AI theme generator. The user will provide a prompt describing a theme.
Your job is to translate that prompt into a JSON object containing CSS values.
CRITICAL: Readability is the main thing! You MUST ensure that the "text" color has extremely high contrast against the "background" color, and "elementBackground" has high contrast with "text". If the background is dark, the text must be very light, and vice versa.
You MUST ONLY return the raw JSON object. Do not include markdown formatting like \`\`\`json, just the raw JSON text.
The JSON object MUST contain exactly these keys:
- "background": The background color for the main layout.
- "text": The main text color (ensure high contrast with background).
- "accent": The accent color (used for borders or hover states).
- "radius": The border-radius size (e.g. "0.5rem", "12px", "9999px", "0px").
- "elementBackground": The background color for cards, buttons, or badges.
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 800,
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content.trim();
    
    console.log("AI Theme Reply:", content);
    
    // Extract JSON using regex in case the model adds conversational text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    } else {
      throw new Error("No JSON object found in the response.");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating theme:", error);
    throw error;
  }
};
