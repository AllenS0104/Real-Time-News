import { GoogleGenAI } from "@google/genai";
import type { NewsArticle, Source } from '../types';

const getLatestNews = async (category: string): Promise<{ articles: NewsArticle[], sources: Source[] }> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const categoryPrompts: { [key: string]: string } = {
    '国内': 'Chinese domestic news',
    '国际': 'international news',
    '科技': 'technology news',
    '体育': 'sports news',
    '财经': 'business and finance news',
    '娱乐': 'entertainment news',
  };

  const topic = categoryPrompts[category] || 'latest news';

  const prompt = `
    Fetch the top 9 latest and most important news headlines for the '${topic}' category.
    For each headline, provide the following in a bilingual format:
    1.  A concise, neutral title in both Chinese (zh) and English (en).
    2.  A brief summary (2-3 sentences) in both Chinese (zh) and English (en).
    3.  The primary news source (e.g., Xinhua, Reuters, BBC).

    Please format the entire response as a valid JSON array of objects. Each object must have the following structure:
    - 'title': an object with 'zh' and 'en' keys.
    - 'summary': an object with 'zh' and 'en' keys.
    - 'source': a string.

    Do not include any markdown formatting, just the raw JSON array.
    Example:
    [
      {
        "title": {
          "zh": "全球市场对新政策作出反应",
          "en": "Global Markets React to New Policy"
        },
        "summary": {
          "zh": "世界各地的股票市场今天出现了重大转变...",
          "en": "Stock markets around the world saw significant shifts today..."
        },
        "source": "Reuters"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text.trim();
    let articles: NewsArticle[] = [];
    
    try {
        let cleanedText = text;
        // Strip markdown code block fences if they exist
        if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.slice(7, -3);
        } else if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.slice(3, -3);
        }
        articles = JSON.parse(cleanedText);
    } catch (parseError) {
        console.error("Failed to parse Gemini response as JSON:", text);
        throw new Error("Could not parse the news data from the AI. The response might be in an unexpected format.");
    }

    if (!Array.isArray(articles)) {
      throw new Error("The parsed data is not an array of news articles.");
    }
    
    // Ensure all articles have a source property for data consistency and valid bilingual structure
    articles = articles.map(article => ({ 
        title: article.title || { zh: '无标题', en: 'No Title' },
        summary: article.summary || { zh: '无摘要', en: 'No Summary' },
        source: article.source || 'Unknown' 
    }));

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as Source[] || [];
    
    return { articles, sources };

  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    if (error instanceof Error && error.message.includes("Could not parse")) {
        throw error;
    }
    throw new Error("Failed to fetch news. Please check your API key and network connection.");
  }
};

export { getLatestNews };