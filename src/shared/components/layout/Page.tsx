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
  calculatorType?: "standard" | "scientific";
  className?: string;
  [key: string]: string | boolean | number | React.ReactNode | undefined;
}

export default function Page({ title, children, ...rest }: PageProps) {
  const sectionTitle = useSectionTitle();
  const collapsed = useSidebarStore((state) => state.collapsed);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);

  return (
    <div className="flex h-screen bg-zinc-100">
      <SideArea collapsed={collapsed} onToggleCollapsed={toggleCollapsed}>
        <Menu collapsed={collapsed} />
      </SideArea>
      <div className="flex flex-col flex-1 min-w-0">
        <Header title={sectionTitle} className="h-16 bg-zinc-100" />
        <Content title={title}>
          {React.isValidElement(children)
            ? React.cloneElement(children, rest)
            : children}
        </Content>
        <Footer />
      </div>
    </div>
  );
}
