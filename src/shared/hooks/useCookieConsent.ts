"use client";

import { useState, useEffect } from "react";

export interface CookieConsentState {
  hasConsented: boolean | null; // null = não decidiu ainda, true = aceitou, false = recusou
  analyticsEnabled: boolean;
}

const COOKIE_NAME = "molwise-cookie-consent";
const STORAGE_KEY = "molwise-cookie-consent";
const COOKIE_EXPIRY_DAYS = 365;

// Utilitários para cookies
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Utilitários para localStorage
const setLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Erro ao salvar no localStorage:", error);
  }
};

const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn("Erro ao ler do localStorage:", error);
    return null;
  }
};

export const useCookieConsent = () => {
  const [consentState, setConsentState] = useState<CookieConsentState>({
    hasConsented: null,
    analyticsEnabled: false,
  });

  const [showBanner, setShowBanner] = useState(false);

  // Carrega o estado do consentimento ao montar o componente
  useEffect(() => {
    const loadConsentState = () => {
      // Tenta primeiro do cookie
      const cookieValue = getCookie(COOKIE_NAME);
      if (cookieValue) {
        try {
          const parsed = JSON.parse(cookieValue);
          setConsentState(parsed);
          setShowBanner(false);
          return;
        } catch (error) {
          console.warn("Erro ao parsear cookie de consentimento:", error);
        }
      }

      // Fallback para localStorage
      const storageValue = getLocalStorage<CookieConsentState>(STORAGE_KEY);
      if (storageValue) {
        setConsentState(storageValue);
        setShowBanner(false);
        return;
      }

      // Se não há consentimento salvo, mostra o banner
      setShowBanner(true);
    };

    loadConsentState();
  }, []);

  // Salva o estado do consentimento
  const saveConsentState = (newState: CookieConsentState) => {
    const stateToSave = {
      ...newState,
      timestamp: new Date().toISOString(),
    };

    // Salva no cookie (principal)
    setCookie(COOKIE_NAME, JSON.stringify(stateToSave), COOKIE_EXPIRY_DAYS);

    // Salva no localStorage (fallback)
    setLocalStorage<CookieConsentState & { timestamp: string }>(STORAGE_KEY, stateToSave);

    setConsentState(newState);
    setShowBanner(false);
  };

  // Aceita todos os cookies
  const acceptAll = () => {
    const newState: CookieConsentState = {
      hasConsented: true,
      analyticsEnabled: true,
    };
    saveConsentState(newState);
  };

  // Recusa cookies não essenciais
  const declineAll = () => {
    const newState: CookieConsentState = {
      hasConsented: true,
      analyticsEnabled: false,
    };
    saveConsentState(newState);
  };

  // Salva preferências customizadas
  const savePreferences = (analyticsEnabled: boolean) => {
    const newState: CookieConsentState = {
      hasConsented: true,
      analyticsEnabled,
    };
    saveConsentState(newState);
  };

  // Reseta o consentimento (para testes ou mudança de preferências)
  const resetConsent = () => {
    // Remove cookie
    document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    
    // Remove localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Erro ao remover do localStorage:", error);
    }

    setConsentState({
      hasConsented: null,
      analyticsEnabled: false,
    });
    setShowBanner(true);
  };

  return {
    consentState,
    showBanner,
    acceptAll,
    declineAll,
    savePreferences,
    resetConsent,
  };
};