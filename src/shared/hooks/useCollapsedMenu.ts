import { useState, useCallback } from "react";

export function useCollapsedMenu(initial: boolean = false) {
  const [collapsed, setCollapsed] = useState(initial);
  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);
  return { collapsed, setCollapsed, toggleCollapsed };
}
