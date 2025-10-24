import { useEffect, useMemo, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useTranslations } from "next-intl";
import { CalculatorContainerProps } from "@/features/calculators/domain/types";
import { containerStyles } from "@/features/calculators/styles/containerStyles";
import {
  CalculatorKeyboardToggle,
  CalculatorHeader,
} from "@/features/calculators/components/common";
import { useCalculatorPosition } from "@/features/calculators/hooks";

export default function CalculatorContainer({
  title,
  subtitle,
  input,
  actions,
  children,
  errorMessage,
  onClose,
  initialPosition,
  onPositionChange,
  isKeyboardVisible = true,
  onKeyboardVisibilityChange,
}: CalculatorContainerProps) {
  const t = useTranslations();
  const [collapsed, setCollapsed] = useState(!isKeyboardVisible);
  const hasAppliedResponsiveCollapse = useRef(false);
  const previousVisibility = useRef(isKeyboardVisible);

  useEffect(() => {
    if (previousVisibility.current !== isKeyboardVisible) {
      setCollapsed(!isKeyboardVisible);
      previousVisibility.current = isKeyboardVisible;
    }
  }, [isKeyboardVisible]);

  useEffect(() => {
    if (typeof window === "undefined" || hasAppliedResponsiveCollapse.current) {
      return;
    }

    const isMobileViewport = window.matchMedia("(max-width: 639px)").matches;
    if (isMobileViewport && !collapsed) {
      hasAppliedResponsiveCollapse.current = true;
      setCollapsed(true);
      onKeyboardVisibilityChange?.(false);
    }
  }, [collapsed, onKeyboardVisibilityChange]);

  const { defaultPosition, handleDragStop, handleResizeStop } =
    useCalculatorPosition({
      initialPosition,
      onPositionChange,
    });

  const handleKeyboardToggle = () => {
    setCollapsed((prev) => {
      const newValue = !prev;
      onKeyboardVisibilityChange?.(!newValue);
      return newValue;
    });
  };

  return (
    <Rnd
      minWidth={containerStyles.rnd.minWidth}
      maxWidth={containerStyles.rnd.maxWidth}
      default={defaultPosition}
      bounds="#main-content-area"
      enable={containerStyles.rnd.enable}
      className={containerStyles.rnd.className}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      // Evita que elementos interativos iniciem drag em dispositivos touch
      cancel={useMemo(() => {
        if (typeof window === "undefined") return undefined;
        const mq = typeof window.matchMedia === "function" ? window.matchMedia("(pointer: coarse)") : null;
        const isTouch =
          "ontouchstart" in window ||
          (navigator as any)?.maxTouchPoints > 0 ||
          (mq ? mq.matches : false);
        return isTouch
          ? "input, textarea, select, button, [contenteditable=true], [role=combobox], .prevent-drag"
          : undefined;
      }, [])}
    >
      <div className={containerStyles.root}>
        <CalculatorHeader title={title} subtitle={subtitle} onClose={onClose} />

        <div className={containerStyles.content.container}>{input}</div>
        {!collapsed && (
          <div className={containerStyles.content.actions}>{actions}</div>
        )}
        {children}
        {errorMessage && (
          <div className={containerStyles.content.error}>{errorMessage}</div>
        )}

        <CalculatorKeyboardToggle
          isCollapsed={collapsed}
          onToggle={handleKeyboardToggle}
          showKeyboardText={t("calculators.molarMass.keyboard.showKeyboard")}
          hideKeyboardText={t("calculators.molarMass.keyboard.hideKeyboard")}
        />
      </div>
    </Rnd>
  );
}
