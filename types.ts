export enum Platform {
    Instagram = 'Instagram',
    TikTok = 'TikTok',
    YouTube = 'YouTube'
}

export type WatermarkPosition = 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right';

export interface WatermarkConfig {
    removeWatermark: boolean;
    addWatermark: boolean;
    customWatermarkText: string;
    watermarkPosition: WatermarkPosition;
    watermarkSize: number; // 1-100
    watermarkOpacity: number; // 1-100
}

export interface AnalysisState {
    isLoading: boolean;
    result: string | null;
    error: string | null;
}

export interface GenerationRequest {
    platform: Platform;
    language: string;
    description: string;
    hasFile: boolean;
    fileType?: string;
    watermarkConfig: WatermarkConfig;
    autoThumbnail: boolean;
}