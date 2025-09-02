import { useState, useEffect, useCallback } from 'react';
import type { KekuleViewerConfig } from '../types/kekuleViewer.types';
import { DEFAULT_KEKULE_CONFIG } from '../constants/kekuleViewer.constants';

const KEKULE_CONFIG_STORAGE_KEY = 'kekule-viewer-config';

export function useKekuleConfig(initialConfig?: Partial<KekuleViewerConfig>) {
  const [config, setConfig] = useState<KekuleViewerConfig>(() => {
    // Tenta carregar configuração salva
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(KEKULE_CONFIG_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_KEKULE_CONFIG, ...parsed };
        }
      } catch (error) {
        console.warn('⚠️ Erro ao carregar configuração salva:', error);
      }
    }
    
    // Usa configuração padrão mesclada com inicial
    return { ...DEFAULT_KEKULE_CONFIG, ...initialConfig };
  });

  // Salva configuração no localStorage
  const saveConfig = useCallback((newConfig: KekuleViewerConfig) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(KEKULE_CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
      } catch (error) {
        console.warn('⚠️ Erro ao salvar configuração:', error);
      }
    }
  }, []);

  // Atualiza configuração
  const updateConfig = useCallback((updates: Partial<KekuleViewerConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    saveConfig(newConfig);
  }, [config, saveConfig]);

  // Reseta para configuração padrão
  const resetConfig = useCallback(() => {
    const defaultConfig = { ...DEFAULT_KEKULE_CONFIG, ...initialConfig };
    setConfig(defaultConfig);
    saveConfig(defaultConfig);
  }, [initialConfig, saveConfig]);

  // Salva configuração quando ela muda
  useEffect(() => {
    saveConfig(config);
  }, [config, saveConfig]);

  return {
    config,
    updateConfig,
    resetConfig,
  };
}
