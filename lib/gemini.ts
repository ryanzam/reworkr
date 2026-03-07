import { JobSummary } from "../types";

export async function generateJobSummary(notes: string, jobType: string): Promise<JobSummary | null> {
  // const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  // const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: "You are a professional field service report writer. Create concise, formal, customer-friendly job summary from technician notes. Be factual and helpful. Respond ONLY with valid JSON matching the exact schema provided. No markdown, no preamble.",
      messages: [{
        role: "user",
        content: `Generate a field service job summary for a ${jobType} job. Technician notes: "${notes}". 
        
          Return JSON with this exact schema:
          {
            "professionalDescription": "3-5 sentence formal description",
            "workPerformed": ["array", "of", "tasks"],
            "issuesResolved": ["array", "of", "resolved issues"],
            "remainingIssues": ["optional array or empty"],
            "suggestedUpsell": "optional upsell suggestion or null",
            "confidence": 85
          }`
      }]
    })
  });

  const data = await response.json();
  const text = data.content?.[0]?.text || "{}";
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return null;
  }
}