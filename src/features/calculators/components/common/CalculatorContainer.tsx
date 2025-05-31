import { useState } from "react";
import { Rnd } from "react-rnd";
import { useTranslations } from "next-intl";
import { CalculatorContainerProps } from "../../domain/types/calculator";
import { containerStyles } from "../../styles/containerStyles";
import { CalculatorKeyboardToggle } from "./CalculatorKeyboardToggle";
import { CalculatorHeader } from "./CalculatorHeader";
import { useCalculatorPosition } from "../../hooks/common/useCalculatorPosition";

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
