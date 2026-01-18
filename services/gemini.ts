
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async analyzeNewsImpact(newsItem: any, portfolio: string[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `
        作为资深投研分析师，分析该资讯：
        标题: "${newsItem.title}"
        摘要: "${newsItem.summary}"
        持仓: ${portfolio.join(', ')}
        要求：区分核心事实与推测，评估宏观/行业/个股影响，识别分歧并提供建议。
      `,
      config: { temperature: 0.1 },
    });
    return response.text;
  },

  async getSocialIntelligence(symbol: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `分析 ${symbol} 的舆情，提取火热观点与争议。返回 JSON。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            symbol: { type: Type.STRING },
            bullishPercent: { type: Type.NUMBER },
            buzzScore: { type: Type.NUMBER },
            topComments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  author: { type: Type.STRING },
                  content: { type: Type.STRING },
                  sentiment: { type: Type.STRING },
                  platform: { type: Type.STRING },
                  likes: { type: Type.NUMBER },
                  timestamp: { type: Type.STRING },
                  url: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getHistoricalAnalogy(newsTitle: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `
        任务：针对资讯 "${newsTitle}"，执行 5 年深度概念回溯。
        步骤：
        1. 提取 3-4 个【核心情报概念】。
        2. 对每个概念，回溯过去 5 年的重大事件，月度汇总。
        3. 描述格式：首句为精炼摘要，随后以换行符分隔的 2-3 个 Bullet Points（以 "•" 开头）。
        4. 为每个事件随机生成一个逼真的新闻来源 URL。
        5. 生成每个概念在过去 5 年的【舆论热度/讨论量】趋势数据（0-100）。
        返回 JSON。
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING },
              description: { type: Type.STRING },
              history: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    date: { type: Type.STRING },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    significance: { type: Type.STRING },
                    url: { type: Type.STRING }
                  }
                }
              },
              trends: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    date: { type: Type.STRING },
                    volume: { type: Type.NUMBER },
                    sentiment: { type: Type.NUMBER }
                  }
                }
              }
            },
            required: ["concept", "description", "history", "trends"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getFactorCorrelations(newsTitle: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `分析 "${newsTitle}" 中的核心因子。识别其对上下游、竞争对手的信号增强/减弱效应。返回 JSON。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nodes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, label: { type: Type.STRING }, group: { type: Type.STRING } } } },
            links: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { source: { type: Type.STRING }, target: { type: Type.STRING }, strength: { type: Type.NUMBER }, reason: { type: Type.STRING } } } }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getSocialUserHistory(author: string, platform: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `调查用户 ${author} 在 ${platform} 的历史预测准确性。格式要求同上：首句摘要 + Bullet Points。返回 JSON。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            author: { type: Type.STRING },
            platform: { type: Type.STRING },
            trustScore: { type: Type.NUMBER },
            trustSummary: { type: Type.STRING },
            pastPosts: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { date: { type: Type.STRING }, title: { type: Type.STRING }, description: { type: Type.STRING }, significance: { type: Type.STRING }, url: { type: Type.STRING } } } }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getSocialOpinionCorrelations(comment: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `分析观点 "${comment}" 的支持与反对集群。返回 JSON。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nodes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, label: { type: Type.STRING }, group: { type: Type.STRING } } } },
            links: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { source: { type: Type.STRING }, target: { type: Type.STRING }, strength: { type: Type.NUMBER }, reason: { type: Type.STRING } } } }
          }
        }
      }
    });
    return JSON.parse(response.text);
  }
};
