"use client";

import React from "react";
import { useSidebarStore } from "@/shared/store/sidebarStore";
import DesktopSidebar from "./DesktopSidebar";
import MobileDrawer from "./MobileDrawer";

export default function SideArea({ children }: { children: React.ReactNode }) {
  const {
    collapsed,
    toggleCollapsed,
    mobileOpen,
    setMobileOpen,
    showSettings,
    setShowSettings,
  } = useSidebarStore();

  return (
    <>
      <DesktopSidebar collapsed={collapsed ?? false} onToggleCollapse={toggleCollapsed}>
        {children}
      </DesktopSidebar>

      <MobileDrawer
        open={mobileOpen}
        showSettings={showSettings}
        onClose={() => {
          setMobileOpen(false);
          setShowSettings(false);
        }}
        onBack={() => setShowSettings(false)}
        onOpenSettings={() => setShowSettings(true)}
        onNavigate={() => setMobileOpen(false)}
      >
        {children}
      </MobileDrawer>
    </>
  );
}