import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Interactive AI Hospitality Trainer Chat API
app.post("/api/trainer/chat", async (req, res) => {
  try {
    const { messages, scenario, difficulty } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. 'messages' must be an array." });
    }

    // Initialize Gemini Client
    const ai = getAiClient();

    // Map difficulty and scenarios to specific system instructions
    const scenarioDetails = {
      angry_guest: "An angry guest whose premium deluxe ocean-view suite was double-booked and is now assigned to a standard room.",
      corporate_vip: "A demanding corporate VIP travel agent trying to negotiate a 40% discount for a block booking of 50 rooms during peak season.",
      last_minute_safari: "A traveler wanting to book a last-minute luxury safari package including transfers and dietary requirements, but has a tight budget.",
      tech_failure: "A guest complaining that their online payment went through twice, but the central reservation system (CRS) shows no record of their booking."
    };

    const difficultyDetails = {
      easy: "The guest is relatively understanding but expects a professional solution. They are cooperative if offered a standard apology and fair compensation.",
      medium: "The guest is skeptical, impatient, and uses industry jargon. They require active listening, quick thinking, and dynamic upselling or alternative options.",
      hard: "The guest is extremely frustrated, threatening negative social media reviews, and demands to speak with the General Manager immediately. The student must demonstrate flawless empathy, de-escalation, and structured problem-solving."
    };

    const activeScenario = scenarioDetails[scenario as keyof typeof scenarioDetails] || scenarioDetails.angry_guest;
    const activeDifficulty = difficultyDetails[difficulty as keyof typeof difficultyDetails] || difficultyDetails.medium;

    const systemInstruction = `
You are simulating a guest or client in a reservation simulation for hospitality students.
Your Role / Persona: ${activeScenario}
Difficulty Level: ${activeDifficulty}

Objective for the student:
- De-escalate the situation, handle the inquiry, or negotiate professionally.
- Use hotel reservation best practices (Active listening, empathy, offering creative solutions, upselling where appropriate, proper checkout/booking flow).

Instruction for you (Gemini):
- Act out the persona naturally. Do NOT break character.
- Keep your responses short, conversational, and realistic to a phone call, live chat, or WhatsApp reservation conversation (1-3 sentences maximum).
- Respond in character. If the student makes a good point, slowly become more cooperative. If they are rude or dismissive, become more difficult.
- Include a subtle hint or feedback only if they fail basic hospitality standards.
- If they resolve the issue successfully, conclude the simulation in-character with a satisfied ending (e.g. "Okay, that works. Thank you for fixing this so quickly!").
    `;

    // Format chat history for Gemini API
    // We can use generateContent with the systemInstruction in the configuration
    const contents = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });

    res.json({ content: response.text || "I apologize, but I am unable to reply at the moment. Please try again." });
  } catch (error: any) {
    console.error("Trainer Chat Error:", error);
    res.status(500).json({ 
      error: error.message || "An internal error occurred",
      isConfigError: !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY"
    });
  }
});

// AI Hospitality Prompt Generator API
app.post("/api/resources/prompts", async (req, res) => {
  try {
    const { department, challenge, aiTool } = req.body;

    if (!department || !challenge) {
      return res.status(400).json({ error: "Department and challenge are required parameters." });
    }

    const ai = getAiClient();

    const systemInstruction = "You are an expert hospitality consultant and AI prompt engineer specializing in reservation departments, property management systems, and guest relationship management.";

    const promptText = `
Generate a highly practical, expert-level AI Prompt that a hospitality professional can copy and paste into ${aiTool || "Gemini or ChatGPT"} to solve a specific challenge.

Department/Role: ${department}
Challenge to solve: ${challenge}

Structure your response strictly in clean, beautiful Markdown format with:
1. **The Objective**: Briefly state what this prompt achieves.
2. **The Professional AI Prompt**: Wrap the exact prompt in a copyable Markdown code block. The prompt should be detailed, include placeholders like [Guest Name] or [Hotel Policy], and employ advanced prompting strategies (role-playing, few-shot examples, or output constraint directives).
3. **How to Use**: 2-3 quick bullet points on how to customize or execute the prompt in a real reservation desk scenario.
4. **Best Practices**: A pro-tip for achieving the best outcome with this specific challenge.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ promptResult: response.text || "Failed to generate prompt. Please try again." });
  } catch (error: any) {
    console.error("Prompt Generator Error:", error);
    res.status(500).json({ 
      error: error.message || "An internal error occurred",
      isConfigError: !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY"
    });
  }
});

// Vite Middleware for Asset Serving & Dynamic Routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CyberGraduates Server] Full-stack application running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
