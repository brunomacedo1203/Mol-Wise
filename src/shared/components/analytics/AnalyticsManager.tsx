"use client";

import { useEffect, useMemo } from "react";
import Script from "next/script";
import { useCookieConsent } from "@/shared/hooks/useCookieConsent";
import { GA_TRACKING_ID, setAnalyticsConsent } from "@/lib/gtag";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "";

export default function AnalyticsManager() {
  const { consentState } = useCookieConsent();

  const analyticsEnabled = !!consentState.analyticsEnabled;

  useEffect(() => {
    setAnalyticsConsent(analyticsEnabled);
  }, [analyticsEnabled]);

  const claritySnippet = useMemo(() => {
    if (!CLARITY_ID) return "";
    return `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");
    `;
  }, []);

  const gaConfigSnippet = useMemo(() => {
    if (!GA_TRACKING_ID) return "";
    return `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);} 
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_path: window.location.pathname,
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;
  }, []);

  // Se não há consentimento, não carregamos scripts de analytics
  if (!analyticsEnabled) {
    return null;
  }

  return (
    <>
      {GA_TRACKING_ID && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: gaConfigSnippet }}
          />
        </>
      )}

      {CLARITY_ID && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: claritySnippet }}
        />
      )}
    </>
  );
}
