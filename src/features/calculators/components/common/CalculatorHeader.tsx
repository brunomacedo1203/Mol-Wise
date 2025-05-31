import { X } from "lucide-react";
import { containerStyles } from "../../styles/containerStyles";

interface CalculatorHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

export function CalculatorHeader({
  title,
  subtitle,
  onClose,
}: CalculatorHeaderProps) {
  return (
    <div className={containerStyles.header.container}>
      <div className={containerStyles.header.titleContainer}>
        <h1 className={containerStyles.header.title}>{title}</h1>
        {subtitle && (
          <span className={containerStyles.header.subtitle}>{subtitle}</span>
        )}
      </div>
      {onClose && (
        <button
          className={containerStyles.header.closeButton}
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
