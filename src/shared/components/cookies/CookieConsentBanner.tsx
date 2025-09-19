"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/shared/hooks/useCookieConsent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, Settings, ExternalLink, Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieConsentBanner() {
  const t = useTranslations("cookies");
  const { showBanner, acceptAll, declineAll, savePreferences } =
    useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  if (!showBanner) return null;

  const handleSavePreferences = () => {
    savePreferences(analyticsEnabled);
    setShowPreferences(false);
  };

  const handleAccept = () => acceptAll();
  const handleDecline = () => declineAll();

  if (showPreferences) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
        <Card
          className={`
       w-full max-w-lg
    
    dark:from-neutral-200
    dark:via-slate-600/15
    dark:to-gray-600/10
    shadow-2xl
    border-2
    border-slate-200
    dark:border-slate-500
    backdrop-blur-md
    transform
    animate-in
    zoom-in-95
    duration-300
    `}
        >
          <CardHeader className="pb-3 bg-gradient-to-r from-slate-600/5 to-gray-600/5 dark:from-slate-500/8 dark:to-gray-500/8 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg shadow-lg">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-slate-600 to-gray-600 dark:from-slate-400 dark:to-gray-400 bg-clip-text text-transparent font-bold">
                  {t("preferences.title")}
                </CardTitle>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(false)}
                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Cookies Essenciais */}
            <div className="flex items-center justify-between space-x-4 p-4 bg-gradient-to-r from-gray-50/60 to-slate-50/40 dark:from-gray-700/40 dark:to-slate-700/30 rounded-xl border border-gray-300 dark:border-gray-600/50">
              <div className="flex-1">
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t("preferences.essential")}
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {t("preferences.essentialDescription")}
                </p>
              </div>
              <Switch
                checked={true}
                disabled
                className="opacity-70 scale-125 shadow-lg ring-2 ring-gray-300 dark:ring-gray-500"
              />
            </div>

            {/* Cookies de Análise */}
            <div className="flex items-center justify-between space-x-4 p-4 bg-gradient-to-r from-gray-50/50 to-slate-50/40 dark:from-gray-700/40 dark:to-slate-700/30 rounded-xl border border-gray-300 dark:border-gray-600/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex-1">
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t("preferences.analytics")}
                </Label>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {t("preferences.analyticsDescription")}
                </p>
              </div>
              <Switch
                checked={analyticsEnabled}
                onCheckedChange={setAnalyticsEnabled}
                className="scale-125 shadow-lg ring-2 ring-blue-300 dark:ring-blue-500 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600 transition-all duration-300 hover:scale-130"
              />
            </div>

            {/* Links legais */}
            <div className="pt-4 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700">
              <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                {t("preferences.legalLinks")}
              </p>
              <div className="flex items-center justify-center gap-8">
                <Link
                  href="/privacy-policy"
                  onClick={() => setShowPreferences(false)}
                  className="text-base text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 font-semibold transition-all duration-200 hover:scale-105 underline hover:no-underline"
                >
                  {t("preferences.privacyPolicy")}
                  <ExternalLink className="h-5 w-5" />
                </Link>
                <Link
                  href="/terms-of-use"
                  onClick={() => setShowPreferences(false)}
                  className="text-base text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 flex items-center gap-2 font-semibold transition-all duration-200 hover:scale-105 underline hover:no-underline"
                >
                  {t("preferences.termsOfUse")}
                  <ExternalLink className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSavePreferences}
                className="flex-1 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                {t("preferences.save")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 p-4 animate-in slide-in-from-bottom duration-500">
      <Card className="mx-auto max-w-7xl bg-gradient-to-br from-white/90 via-slate-50/50 to-gray-50/30 dark:from-neutral-900/90 dark:via-slate-950/25 dark:to-gray-950/15 shadow-2xl border-4 border-slate-300/80 dark:border-slate-700/80 backdrop-blur-md relative overflow-hidden">
        {/* brilho */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 dark:via-slate-400/8 to-transparent animate-pulse opacity-60"></div>

        <CardContent className="p-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="p-3 bg-gradient-to-br from-slate-500 to-gray-600 rounded-full shadow-lg animate-bounce">
                <Cookie className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <CardDescription className="text-sm text-gray-900 dark:text-gray-200 flex-1 font-medium leading-relaxed">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full mr-2 animate-pulse"></span>
                  {t("banner.message")}
                </CardDescription>

                <div className="flex flex-col sm:flex-row gap-3 sm:flex-shrink-0">
                  <Button
                    onClick={handleAccept}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                  >
                    {t("banner.accept")}
                  </Button>

                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="border-2 border-red-300 dark:border-red-600 px-5 py-2.5 font-semibold bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/50 dark:hover:to-pink-900/50 text-red-700 dark:text-red-300 transition-all duration-300 transform hover:scale-105"
                  >
                    {t("banner.decline")}
                  </Button>

                  <Button
                    onClick={() => setShowPreferences(true)}
                    variant="ghost"
                    className="border-2 border-slate-400 dark:border-slate-700 text-slate-900 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-5 py-2.5 font-semibold bg-gradient-to-r from-slate-50/40 to-gray-50/40 dark:from-slate-950/20 dark:to-gray-950/20 hover:from-slate-100/60 hover:to-gray-100/60 dark:hover:from-slate-900/40 dark:hover:to-gray-900/40 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                  >
                    <Settings className="h-4 w-4 mr-2 animate-spin-slow" />
                    {t("banner.learnMore")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
