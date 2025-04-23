import { useState, useCallback, useEffect } from "react";

export function useCollapsedMenu(initial: boolean = false) {
  const [collapsed, setCollapsed] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("molwise_menu_collapsed");
      if (stored !== null) {
        setCollapsed(stored === "true");
      } else {
        setCollapsed(initial);
      }
    }
  }, [initial]);

  useEffect(() => {
    if (typeof window !== "undefined" && collapsed !== undefined) {
      localStorage.setItem("molwise_menu_collapsed", String(collapsed));
    }
  }, [collapsed]);

  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);
  return { collapsed, setCollapsed, toggleCollapsed };
}
