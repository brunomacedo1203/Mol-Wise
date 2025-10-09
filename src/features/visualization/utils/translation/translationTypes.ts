// src/features/visualization/utils/translation/translationTypes.ts 
 
export interface TranslationCacheEntry { 
  translated: string; 
  timestamp: number; 
} 
 
export type TranslationCache = Record<string, TranslationCacheEntry>; 
 
export interface PubChemStats { 
  total: number; 
  success: number; 
  failRate: string; 
} 
 
export type LanguageCode = "pt" | "es" | "fr" | "auto"; 
 
export interface TranslateAPIRequest { 
  q: string; 
  source: LanguageCode; 
  target: "en"; 
} 
 
export interface TranslateAPIResponse { 
  translatedText?: string; 
}