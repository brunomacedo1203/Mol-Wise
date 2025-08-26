"use client";

import Page from "@/shared/components/layout/Page";
import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  const commonT = useTranslations("common");
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);

  useEffect(() => {
    setSubtitle(commonT("chooseTool"));
    return () => setSubtitle("");
  }, [setSubtitle, commonT]);

  return (
    <Page title={t("title")}>
      <div className="flex-1 flex justify-center items-center w-full h-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold mb-4 text-blue-700">
            {t("welcome")}
          </h1>
          <p className="text-lg text-zinc-700 mb-8 dark:text-zinc-100">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </Page>
  );
}
