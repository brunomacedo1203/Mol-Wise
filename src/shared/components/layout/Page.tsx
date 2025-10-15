"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import SideArea from "./SideArea";
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
  const { collapsed, mobileOpen, setMobileOpen } = useSidebarStore();
  const pathname = usePathname();

  // ✅ Close drawer on route change (including Home)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

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
