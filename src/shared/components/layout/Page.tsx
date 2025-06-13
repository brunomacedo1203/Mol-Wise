"use client";

import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import SideArea from "./SideArea";
import Menu from "../menu/Menu";
import { useSectionTitle } from "@/shared/hooks/useSectionTitle";
import { useCollapsedMenu } from "@/shared/hooks/useCollapsedMenu";

export interface PageProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  calculatorType?: "standard" | "scientific";
  className?: string;
  [key: string]: string | boolean | number | React.ReactNode | undefined;
}

export default function Page({ title, children, ...rest }: PageProps) {
  const year = new Date().getFullYear();
  const sectionTitle = useSectionTitle();
  const { collapsed, toggleCollapsed } = useCollapsedMenu();

  const isCollapsed = collapsed ?? false;

  return (
    <div className="flex h-screen bg-zinc-100">
      <SideArea
        bgClass="bg-zinc-800"
        collapsed={isCollapsed}
        onToggleCollapsed={toggleCollapsed}
      >
        <Menu collapsed={isCollapsed} />
      </SideArea>
      <div className="flex flex-col flex-1">
        <Header title={sectionTitle} className="h-16 bg-zinc-100" />
        <Content title={title}>
          {React.isValidElement(children)
            ? React.cloneElement(children, rest)
            : children}
        </Content>
        <Footer year={year} />
      </div>
    </div>
  );
}
