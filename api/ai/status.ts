import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "");
  return res.status(200).json({
    status: "ok",
    model: "gemini-3.8-flash",
    mode: hasKey ? "live" : "demo",
    hasKey,
    provider: "Google Gemini AI",
    engine: "Google GenAI SDK v2.4",
    platform: "Vercel Serverless"
  });
}
