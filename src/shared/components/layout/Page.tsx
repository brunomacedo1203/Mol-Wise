"use client";

import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import SideArea from "./SideArea";
import Menu from "../menu/Menu";
import { useSectionTitle } from "@/shared/hooks/useSectionTitle";
import { useSidebarStore } from "@/shared/store/sidebarStore";

export interface PageProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Page({ title, children }: PageProps) {
  const sectionTitle = useSectionTitle();
  const { collapsed, mobileOpen } = useSidebarStore();

  const effectiveCollapsed = mobileOpen ? false : collapsed;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-zinc-100 dark:bg-neutral-950">
      <SideArea>
        <Menu collapsed={effectiveCollapsed} />
      </SideArea>

      <div className="flex flex-col flex-1 min-w-0">
        <Header title={sectionTitle} className="h-16" />
      <div className="pt-16 flex-1">
        <Content title={title}>{children}</Content>
        </div>
        <Footer />
      </div>
    </div>
  );
}
