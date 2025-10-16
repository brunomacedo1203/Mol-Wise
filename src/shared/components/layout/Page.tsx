"use client";

import React, { useEffect, useRef } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import SideArea from "./sidebar/SideArea";
import Menu from "../menu/Menu";
import { useSectionTitle } from "@/shared/hooks/useSectionTitle";
import { useSidebarStore } from "@/shared/store/sidebarStore";
import { usePathname } from "next/navigation";

export interface PageProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Page({ title, children }: PageProps) {
  const sectionTitle = useSectionTitle();
  const { collapsed, mobileOpen, setMobileOpen, showSettings } = useSidebarStore();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // ✅ Fecha o drawer apenas quando muda de PÁGINA (não de idioma)
  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    
    // Remove o locale prefix para comparar apenas o path real
    const getCurrentPath = (path: string) => {
      // Remove "/pt", "/en", "/fr", etc. do início
      return path.replace(/^\/[a-z]{2}(\/|$)/, '/');
    };
    
    const prevPath = getCurrentPath(prevPathname);
    const currentPath = getCurrentPath(pathname);
    
    // Fecha o menu APENAS se o path real mudou (não apenas o idioma)
    // E NÃO fecha se estiver no painel de settings
    if (prevPath !== currentPath && !showSettings) {
      setMobileOpen(false);
    }
    
    prevPathnameRef.current = pathname;
  }, [pathname, setMobileOpen, showSettings]);

  const effectiveCollapsed = mobileOpen ? false : collapsed;

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-neutral-950 md:flex-row">
      {/* ===== Sidebar ===== */}
      <SideArea>
        <Menu collapsed={effectiveCollapsed} />
      </SideArea>

      {/* ===== Main Content ===== */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex min-h-full flex-col">
            {/* Sticky Header */}
            <Header title={sectionTitle} />

            {/* Page Content */}
            <div className="flex-1">
              <Content title={title}>{children}</Content>
            </div>

            {/* Footer pinned if content is short */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}