"use client";
import React from "react";
import Header from "@/shared/components/Header";
import Content from "@/shared/components/Content";
import Footer from "@/shared/components/Footer";
import SideArea from "@/shared/components/SideArea";
import Menu from "@/shared/components/Menu";
import { useSectionTitle } from "@/shared/hooks/useSectionTitle";
import { useCollapsedMenu } from "@/shared/hooks/useCollapsedMenu";

export interface PageProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function Page(props: PageProps) {
  const year = new Date().getFullYear();
  const sectionTitle = useSectionTitle();
  const { collapsed, toggleCollapsed } = useCollapsedMenu();

  // Só renderiza SideArea/Menu quando collapsed está definido
  if (collapsed === undefined) return null;

  // Expor função globalmente para SideArea/Logo
  if (typeof window !== 'undefined') {
    (window as any).__molwiseSetSectionHome = () => {};
  }

  return (
    <div className=" flex h-screen bg-zinc-100">
      <SideArea title="Menu" bgClass="bg-zinc-150" collapsed={collapsed} onToggleCollapsed={toggleCollapsed}>
        <Menu collapsed={collapsed} />
      </SideArea>
      <div className=" flex flex-col flex-1">
        <Header
          title={sectionTitle}
          subtitle={props.subtitle}
          className="h-16 bg-zinc-100"
        />
        <Content title={props.title}>{props.children}</Content>
        <Footer
          leftText="Email Contact"
          rightText={`Developed in ${year}`}
        />
      </div>
    </div>
  );
}
