import { X } from "lucide-react";
import { CalculatorHeaderProps } from "../domain/types/calculator";
import { HEADER_STYLES } from "../styles/headerStyles";

export function CalculatorHeader({
  title,
  subtitle,
  onClose,
}: CalculatorHeaderProps) {
  return (
    <div className={HEADER_STYLES.container}>
      <div className={HEADER_STYLES.titleContainer}>
        <h1 className={HEADER_STYLES.title}>{title}</h1>
        {subtitle && <span className={HEADER_STYLES.subtitle}>{subtitle}</span>}
      </div>
      {onClose && (
        <button
          className={HEADER_STYLES.closeButton}
          aria-label="Fechar calculadora"
          onClick={onClose}
          type="button"
        >
          <X size={14} strokeWidth={2.6} />
        </button>
      )}
    </div>
  );
}
