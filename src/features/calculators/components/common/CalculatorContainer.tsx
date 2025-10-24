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

  // Ajusta minWidth baseado no viewport para manter responsividade no mobile
  const [responsiveMinWidth, setResponsiveMinWidth] = useState(() => {
    if (typeof window === "undefined") return containerStyles.rnd.minWidth;
    const isMobile = window.innerWidth < 640;
    return isMobile ? 320 : containerStyles.rnd.minWidth;
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setResponsiveMinWidth(isMobile ? 320 : containerStyles.rnd.minWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Rnd
      minWidth={responsiveMinWidth}
      maxWidth={containerStyles.rnd.maxWidth}
      default={defaultPosition}
      bounds="#main-content-area"
      enable={containerStyles.rnd.enable}
      className={containerStyles.rnd.className}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      // Evita que elementos interativos iniciem drag em dispositivos touch
      cancel="input, textarea, select, button, [contenteditable=true], [role=combobox], .prevent-drag"
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