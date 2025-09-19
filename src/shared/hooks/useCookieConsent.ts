"use client";

import { useState, useEffect } from "react";

export interface CookieConsentState {
  hasConsented: boolean | null; 
  analyticsEnabled: boolean;
}

const COOKIE_NAME = "molclass-cookie-consent";
const STORAGE_KEY = "molclass-cookie-consent";
const COOKIE_EXPIRY_DAYS = 365;
const CONSENT_REFRESH_MONTHS = 12; // Renovar consentimento anualmente

// Utilitários para cookies - CORRIGIDO com Secure flag
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const isSecure = window.location.protocol === 'https:';
  const secureFlag = isSecure ? ';Secure' : '';
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax${secureFlag}`;
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

// Função para verificar se precisa renovar consentimento
const shouldRefreshConsent = (timestamp: string): boolean => {
  const consentDate = new Date(timestamp);
  const refreshDate = new Date();
  refreshDate.setMonth(refreshDate.getMonth() - CONSENT_REFRESH_MONTHS);
  return consentDate < refreshDate;
};

// Função para controlar scripts de terceiros
const manageThirdPartyScripts = (analyticsEnabled: boolean) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  const gaScript = document.querySelector('script[src*="googletagmanager.com"]');
  const gaConfig = document.querySelector('script[data-type="ga-config"]');
  
  if (analyticsEnabled) {
    // Habilitar Google Analytics se consentimento dado
    if (!gaScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);
      
      const configScript = document.createElement('script');
      configScript.setAttribute('data-type', 'ga-config');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
          'anonymize_ip': true,
          'cookie_expires': 60 * 60 * 24 * 365, // 1 ano
        });
      `;
      document.head.appendChild(configScript);
    }
  } else {
    // Desabilitar/remover scripts de analytics
    if (gaScript) gaScript.remove();
    if (gaConfig) gaConfig.remove();
    
    // Limpar Google Analytics
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        'send_page_view': false
      });
    }
    
    // Remover cookies de terceiros
    const cookiesToRemove = ['_ga', '_ga_', '_gid', '_gat', '_gat_gtag_'];
    cookiesToRemove.forEach(cookieName => {
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.${window.location.hostname}`;
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    });
  }

  // Microsoft Clarity
  if (analyticsEnabled) {
    if (!window.clarity) {
      const clarityScript = document.createElement('script');
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
      `;
      document.head.appendChild(clarityScript);
    }
  } else {
    // Desabilitar Clarity
    if (window.clarity) {
      window.clarity('stop');
    }
  }
};

export const useCookieConsent = () => {
  const [consentState, setConsentState] = useState<CookieConsentState>({
    hasConsented: null,
    analyticsEnabled: false, // CORRIGIDO: false por padrão (LGPD compliance)
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
          
          // Verificar se precisa renovar consentimento
          if (parsed.timestamp && shouldRefreshConsent(parsed.timestamp)) {
            // Consentimento expirado, mostrar banner novamente
            setShowBanner(true);
            return;
          }
          
          setConsentState({
            hasConsented: parsed.hasConsented,
            analyticsEnabled: parsed.analyticsEnabled
          });
          setShowBanner(false);
          
          // Aplicar configurações de terceiros
          manageThirdPartyScripts(parsed.analyticsEnabled);
          return;
        } catch (error) {
          console.warn("Erro ao parsear cookie de consentimento:", error);
        }
      }

      // Fallback para localStorage com verificação de expiração
      const storageValue = getLocalStorage<CookieConsentState & { timestamp?: string }>(STORAGE_KEY);
      if (storageValue) {
        try {
          const timestamp = storageValue.timestamp ? new Date(storageValue.timestamp).getTime() : 0;
          const now = Date.now();
          const maxAgeMs = COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
          const isExpired = !timestamp || now - timestamp > maxAgeMs;

          // Verificar também renovação de consentimento
          const needsRefresh = storageValue.timestamp && shouldRefreshConsent(storageValue.timestamp);

          if (isExpired || needsRefresh) {
            // Expirado ou precisa renovar: limpar storage e exibir banner novamente
            try { localStorage.removeItem(STORAGE_KEY); } catch {}
            setShowBanner(true);
          } else {
            setConsentState({ 
              hasConsented: storageValue.hasConsented, 
              analyticsEnabled: storageValue.analyticsEnabled 
            });
            setShowBanner(false);
            
            // Aplicar configurações de terceiros
            manageThirdPartyScripts(storageValue.analyticsEnabled);
            return;
          }
        } catch (error) {
          console.warn("Erro ao validar expiração do consentimento no localStorage:", error);
        }
      }

      // Se não há consentimento salvo, mostra o banner
      setShowBanner(true);
    };

    loadConsentState();
  }, []);

  // Efeito para gerenciar scripts quando o estado muda
  useEffect(() => {
    if (consentState.hasConsented !== null) {
      manageThirdPartyScripts(consentState.analyticsEnabled);
    }
  }, [consentState.analyticsEnabled, consentState.hasConsented]);

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

    // Aplicar imediatamente as configurações de terceiros
    manageThirdPartyScripts(newState.analyticsEnabled);
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
    const isSecure = window.location.protocol === 'https:';
    const secureFlag = isSecure ? ';Secure' : '';
    document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/${secureFlag}`;
    
    // Remove localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Erro ao remover do localStorage:", error);
    }

    // Desabilitar todos os scripts de terceiros
    manageThirdPartyScripts(false);

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