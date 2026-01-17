
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async analyzeNewsImpact(newsTitle: string, portfolio: string[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this news: "${newsTitle}". My portfolio contains: ${portfolio.join(', ')}. 
      Explain the direct and indirect impact. Use a structured approach.`,
      config: {
        temperature: 0.2,
      },
    });
    return response.text;
  },

  async getCorrelations(newsContext: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the ripple effects of this news: "${newsContext}". 
      Identify how this news correlates with other entities or sectors. 
      Consider: Competitor reactions, supply chain disruptions, related market trends, and regulatory impacts.
      Return a JSON map of nodes and links representing these news correlations.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  group: { type: Type.STRING, description: "Category like 'competitor', 'supplier', 'customer', 'market-trend', 'regulator'" }
                },
                required: ["id", "label", "group"]
              }
            },
            links: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  strength: { type: Type.NUMBER },
                  reason: { type: Type.STRING, description: "Detailed explanation of the news-driven correlation" }
                },
                required: ["source", "target", "strength", "reason"]
              }
            }
          },
          required: ["nodes", "links"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async generateTimeline(topic: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a historical timeline of the major events leading to the current state of: "${topic}". Focus on causality.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              date: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              significance: { type: Type.STRING }
            },
            required: ["date", "title", "description", "significance"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  }
};
