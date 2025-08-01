"use client";

import Page from "@/shared/components/layout/Page";
import { MolViewIframe } from "@/features/molview";
import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";
import { useTranslations } from "next-intl";

export default function MolViewPage() {
  const t = useTranslations("molview");
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);

  useEffect(() => {
    setSubtitle(t("subtitle"));
    return () => setSubtitle("");
  }, [setSubtitle, t]);

  return (
    <Page title={t("title")}>
      <div className="flex-1 flex flex-col w-full h-full">
        <div className="max-w-6xl mx-auto w-full px-4 py-8">
          <p className="text-lg text-zinc-700 mb-8 dark:text-zinc-100">
            {t("description")}
          </p>

          <MolViewIframe width="100%" height="700px" className="w-full" />
        </div>
      </div>
    </Page>
  );
}
