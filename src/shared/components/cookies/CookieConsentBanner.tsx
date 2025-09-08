"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/shared/hooks/useCookieConsent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, Settings, Cookie } from "lucide-react";

export default function CookieConsentBanner() {
  const t = useTranslations("common.cookies");
  const { showBanner, acceptAll, declineAll, savePreferences } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  if (!showBanner) {
    return null;
  }

  const handleSavePreferences = () => {
    savePreferences(analyticsEnabled);
    setShowPreferences(false);
  };

  const handleAccept = () => {
    acceptAll();
  };

  const handleDecline = () => {
    declineAll();
  };

  if (showPreferences) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg">{t("preferences.title")}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cookies Essenciais */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label className="text-sm font-medium">
                  {t("preferences.essential")}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("preferences.essentialDescription")}
                </p>
              </div>
              <Switch checked={true} disabled className="opacity-50" />
            </div>

            {/* Cookies de Análise */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label className="text-sm font-medium">
                  {t("preferences.analytics")}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("preferences.analyticsDescription")}
                </p>
              </div>
              <Switch
                checked={analyticsEnabled}
                onCheckedChange={setAnalyticsEnabled}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSavePreferences}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-white dark:bg-neutral-900 shadow-xl border-t-4 border-t-blue-600">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Cookie className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg mb-2 text-gray-900 dark:text-gray-100">
                {t("banner.title")}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t("banner.message")}
              </CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAccept}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {t("banner.accept")}
                </Button>
                
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 px-6"
                >
                  {t("banner.decline")}
                </Button>
                
                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-6"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t("banner.learnMore")}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}