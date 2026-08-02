// 📄 Backend/services/aiService.js

const axios = require("axios");

class AIService {
  constructor() {
    this.ollamaEndpoint =
      process.env.OLLAMA_URL || "http://localhost:11434/api/generate";

    this.model = process.env.OLLAMA_MODEL || "gemma3:4b";
  }

  async generateNotesFromTranscript(transcript) {
    try {
      if (!transcript || transcript.trim() === "") {
        throw new Error("Transcript is empty.");
      }

      // Limit transcript size for local model
      const cleanedTranscript =
        transcript.length > 15000 ? transcript.substring(0, 15000) : transcript;

      console.log("Original Transcript:", transcript.length);
      console.log("Sending Transcript:", cleanedTranscript.length);

      const prompt = `
You are an expert AI Teacher.

Analyze the following lecture transcript and generate high-quality study notes.

IMPORTANT RULES:
- Return ONLY valid JSON.
- Do NOT wrap JSON inside markdown.
- Do NOT add explanations.
- Use only information from transcript.
- Use simple English.
- Create headings.
- Create proper notes.
- Create key points.
- Create definitions.

Return JSON exactly like this:

{
  "shortSummary": "string",
  "detailedNotes": "string",
  "keyPoints": [
    {
      "heading": "string",
      "description": "string"
    }
  ],
  "importantDefinitions": [
    {
      "term": "string",
      "definition": "string"
    }
  ]
}

Transcript:

${cleanedTranscript}
`;

      const response = await axios.post(
        this.ollamaEndpoint,
        {
          model: this.model,
          prompt,
          stream: false,
          format: "json",
          options: {
            temperature: 0.2,
          },
        },
        {
          timeout: 300000, // 5 Minutes
        },
      );

      if (!response.data || !response.data.response) {
        throw new Error("No response received from Ollama.");
      }

      let parsed;

      try {
        parsed = JSON.parse(response.data.response);
      } catch (err) {
        console.log(response.data.response);
        throw new Error("Invalid JSON returned by Ollama.");
      }

      return {
        shortSummary: parsed.shortSummary || "",
        detailedNotes: parsed.detailedNotes || "",
        keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
        importantDefinitions: Array.isArray(parsed.importantDefinitions)
          ? parsed.importantDefinitions
          : [],
        aiModel: this.model,
      };
    } catch (error) {
      console.error("AI Service Error:", error.message);
      throw error;
    }
  }
}

module.exports = new AIService();