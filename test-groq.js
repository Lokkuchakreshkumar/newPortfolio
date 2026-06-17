const apiKey = process.env.VITE_GROQ_API_KEY;

const systemMessage = `
You are an AI theme generator. The user will provide a prompt describing a theme.
Your job is to translate that prompt into a JSON object containing CSS values.
You MUST ONLY return the raw JSON object. Do not include markdown formatting like \`\`\`json, just the raw JSON text.
The JSON object MUST contain exactly these keys:
- "background": The background color for the main layout.
- "text": The main text color.
- "accent": The accent color (used for borders or hover states).
- "radius": The border-radius size (e.g. "0.5rem", "12px", "9999px").
- "elementBackground": The background color for cards or internal elements.
`;

async function test() {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: "Cyberpunk neon theme" }
        ],
        temperature: 0.3,
        max_tokens: 250,
      })
    });

    if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error("Body:", text);
        return;
    }

    const data = await response.json();
    console.log("Raw response:", data.choices[0].message.content);
  } catch (e) {
    console.error(e);
  }
}

test();
