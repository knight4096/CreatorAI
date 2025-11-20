import { GoogleGenAI } from "@google/genai";
import { Platform, WatermarkConfig } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize Gemini Client
// Note: API_KEY is expected to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Helper to convert File to Base64
 */
const fileToGenerativePart = async (file: File) => {
  return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateCreatorContent = async (
  platform: Platform,
  language: string,
  description: string,
  file: File | null,
  watermarkConfig: WatermarkConfig,
  autoThumbnail: boolean
): Promise<string> => {
  
  // Construct the dynamic part of the prompt based on UI state
  let userPrompt = `
    **Request Details:**
    - **Target Platform:** ${platform}
    - **Output Language:** ${language}
    - **User Description:** ${description || "No description provided, please analyze the file content deeply."}
    - **Auto Generate Thumbnail:** ${autoThumbnail ? "ON" : "OFF"}
    - **Watermark Actions:**
      - Add Watermark: ${watermarkConfig.addWatermark ? `YES
        - Text: "${watermarkConfig.customWatermarkText}"
        - Position: ${watermarkConfig.watermarkPosition}
        - Size: ${watermarkConfig.watermarkSize}%
        - Opacity: ${watermarkConfig.watermarkOpacity}%` : "NO"}
      - Remove Watermark: ${watermarkConfig.removeWatermark ? "YES" : "NO"}
  `;

  const modelId = 'gemini-2.5-flash'; 

  try {
    let response;

    // Scenario 1: Text + Image Analysis
    if (file && file.type.startsWith('image/')) {
      const imagePart = await fileToGenerativePart(file);
      
      response = await ai.models.generateContent({
        model: modelId,
        contents: {
            parts: [
                imagePart,
                { text: userPrompt }
            ]
        },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });
    } 
    // Scenario 2: Text Only (or if video is selected but we treat it as text-context for this demo)
    else {
       // Note: For a full video demo, we would use the File API to upload the video to Google's servers.
       // For this frontend-only demo, we will rely on the textual description if a video file is picked
       // but not processed as a heavy buffer.
       
       if (file && file.type.startsWith('video/')) {
          userPrompt += `\n[System Note: The user uploaded a video file named "${file.name}". Since this is a lightweight demo, analyze based on the User Description provided above as the video context.]`;
       }

       response = await ai.models.generateContent({
        model: modelId,
        contents: {
            parts: [
                { text: userPrompt }
            ]
        },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });
    }

    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("No response received from AI.");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};