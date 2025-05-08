"use client";
import Page from "@/shared/components/Page";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SubtitleProvider subtitle="Welcome to Mol Wise">
      <Page title="Mol Wise">{children}</Page>
    </SubtitleProvider>
  );
}
