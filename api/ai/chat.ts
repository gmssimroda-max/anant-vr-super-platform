import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

function getGeminiClient(userKey?: string): GoogleGenAI | null {
  const apiKey = userKey || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "TODO_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    messages,
    prompt,
    mode = "general",
    language = "hi",
    provider = "gemini",
    modelKey,
    apiKey,
    customEndpoint,
  } = req.body || {};

  const systemPrompt = `You are ANANT AI (अनंत एआई), the core intelligent brain of ANANT VR Super Platform V1.
Your characteristics:
- Highly knowledgeable, encouraging, polite, and respectful.
- Native bilingual capability: fluently understand and respond in Hindi (हिंदी), English, or mixed natural Hinglish as preferred by the user.
- Current mode: ${mode}.
- Preferred response language style: ${language === "hi" ? "Natural Hindi with technical terms in English/Hindi" : "Polite English with optional Hindi greetings"}.
- Capabilities: Answering general knowledge, explaining complex concepts, code generation and debugging, creative writing, summarization, Indian news/affairs, and helping users navigate ANANT platform services (VR, Search, Video, Drive, Mail, Maps, Shop, Apps).
- Structure responses with clear headings, bullet points, and code blocks where applicable.`;

  const lastUserMsg = Array.isArray(messages) && messages.length > 0
    ? messages[messages.length - 1]?.text || ""
    : prompt || "नमस्ते";

  try {
    // 1. OpenAI, Groq, DeepSeek, Custom Endpoints
    if ((provider === "openai" || provider === "groq" || provider === "deepseek" || provider === "custom") && apiKey) {
      let endpoint = "https://api.openai.com/v1/chat/completions";
      if (provider === "groq") endpoint = "https://api.groq.com/openai/v1/chat/completions";
      else if (provider === "deepseek") endpoint = "https://api.deepseek.com/chat/completions";
      else if (provider === "custom" && customEndpoint) {
        endpoint = customEndpoint.endsWith("/chat/completions") ? customEndpoint : `${customEndpoint.replace(/\/+$/, "")}/chat/completions`;
      }

      const formattedMessages = [
        { role: "system", content: systemPrompt },
        ...(Array.isArray(messages)
          ? messages.map((m: any) => ({
              role: m.role === "assistant" || m.role === "model" ? "assistant" : "user",
              content: m.text || m.content || "",
            }))
          : [{ role: "user", content: lastUserMsg }]),
      ];

      const proxyRes = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelKey || (provider === "groq" ? "llama-3.3-70b-versatile" : provider === "deepseek" ? "deepseek-chat" : "gpt-4o-mini"),
          messages: formattedMessages,
          temperature: 0.7,
        }),
      });

      if (!proxyRes.ok) {
        const errText = await proxyRes.text();
        throw new Error(`${provider.toUpperCase()} API Error (${proxyRes.status}): ${errText}`);
      }

      const proxyData: any = await proxyRes.json();
      const reply = proxyData.choices?.[0]?.message?.content || "No reply from model.";
      return res.status(200).json({
        reply,
        model: `${modelKey || provider} (Active)`,
        isDemo: false,
        provider,
      });
    }

    // 2. Anthropic Claude
    if (provider === "anthropic" && apiKey) {
      const endpoint = "https://api.anthropic.com/v1/messages";
      const formattedMessages = (Array.isArray(messages) ? messages : [{ role: "user", text: lastUserMsg }])
        .filter((m: any) => m.role === "user" || m.role === "assistant")
        .map((m: any) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.text || "",
        }));

      const proxyRes = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: modelKey || "claude-3-5-sonnet-20241022",
          system: systemPrompt,
          messages: formattedMessages,
          max_tokens: 1500,
        }),
      });

      if (!proxyRes.ok) {
        const errText = await proxyRes.text();
        throw new Error(`Anthropic API Error (${proxyRes.status}): ${errText}`);
      }

      const proxyData: any = await proxyRes.json();
      const reply = proxyData.content?.[0]?.text || "No reply from Claude.";
      return res.status(200).json({
        reply,
        model: `${modelKey || "Claude 3.5"} (Active)`,
        isDemo: false,
        provider: "anthropic",
      });
    }

    // 3. Default: Google Gemini
    const client = apiKey ? new GoogleGenAI({ apiKey }) : getGeminiClient();

    if (!client) {
      return res.status(200).json({
        reply: language === "hi"
          ? `नमस्ते! मैं ANANT AI हूँ। आपका संदेश: "${lastUserMsg}" प्राप्त हुआ। लाइव जेमिनी मॉडल के लिए सेटिंग्स में GEMINI_API_KEY डालें या अपना पसंदीदा AI मॉडल चुनें।`
          : `Hello! I am ANANT AI. Received: "${lastUserMsg}". For full Gemini intelligence, set your GEMINI_API_KEY or configure another model in settings.`,
        model: "gemini-3.8-flash (Demo Mode)",
        isDemo: true,
      });
    }

    const contents = [];
    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages) {
        contents.push({
          role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.text || msg.content || "" }],
        });
      }
    } else {
      contents.push({
        role: "user",
        parts: [{ text: lastUserMsg }],
      });
    }

    const targetModel = modelKey && modelKey.startsWith("gemini") ? modelKey : "gemini-3.8-flash";
    const response = await client.models.generateContent({
      model: targetModel,
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      reply: response.text || "उत्तर प्राप्त करने में असमर्थ।",
      model: `${targetModel} (Google Gemini)`,
      isDemo: false,
      provider: "gemini",
    });
  } catch (err: any) {
    return res.status(200).json({
      reply: language === "hi"
        ? `ANANT AI: "${lastUserMsg}" पर विचार किया गया। (नोट: ${err.message || "कस्टम API Key की जांच करें"})`
        : `ANANT AI: Response processed for "${lastUserMsg}". (${err.message || "Verify API key"})`,
      model: "gemini-3.8-flash (Resilient)",
      isDemo: true,
    });
  }
}
