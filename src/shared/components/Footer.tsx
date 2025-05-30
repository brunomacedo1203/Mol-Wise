import React from "react";
import { useTranslations } from "next-intl";

export interface FooterProps {
  year: number;
}

export default function Footer(props: FooterProps) {
  const t = useTranslations("common");
  const { year } = props;
  return (
    <footer
      className={`
  flex justify-between items-center
  h-16 text-base px-10 bg-zinc-100
  border-t border-zinc-400 dark:border-white/10
  text-zinc-500 dark:bg-neutral-900
`}
    >
      <span>{t("footer.contact")}</span>
      <span>{t("footer.developed", { year })}</span>
    </footer>
  );
}
