"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview, isConsentGranted } from "@/lib/gtag";
import { useCookieConsent } from "@/shared/hooks/useCookieConsent";

export default function useGoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consentState } = useCookieConsent();

  useEffect(() => {
    if (!isConsentGranted() && !consentState.analyticsEnabled) return;
    const qs = searchParams.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    pageview(url);
  }, [pathname, searchParams, consentState.analyticsEnabled]);
}
