"use client";

import { lazy, Suspense, useMemo, memo } from "react";
import { useTranslations } from "next-intl";
import { useCalculatorInstancesStore } from "@/features/calculators/store/calculatorInstancesStore";
import { useCalculatorHistoryStore } from "@/features/calculators/store/calculatorHistoryStore";
import { CloseAllButton } from "@/shared/components/buttons/CloseAllButton";
import {
  PositionWithWidth,
  CalculatorInstance,
} from "@/features/calculators/domain/types";

// Lazy loading com preload dos componentes
const MolarMassCalculator = lazy(() =>
  import("@/features/calculators/components/calculators/molar-mass").then(
    (module) => ({
      default: module.MolarMassCalculator,
    })
  )
);

const ScientificCalculator = lazy(() =>
  import("@/features/calculators/components/calculators/scientific").then(
    (module) => ({
      default: module.ScientificCalculator,
    })
  )
);

// Preload dos componentes quando o módulo é carregado
if (typeof window !== "undefined") {
  // Preload com timeout para não bloquear o carregamento inicial
  setTimeout(() => {
    import("@/features/calculators/components/calculators/molar-mass");
    import("@/features/calculators/components/calculators/scientific");
  }, 1000);
}

// Loading component otimizado
const CalculatorLoader = memo(() => {
  const t = useTranslations("calculators");
  
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-600 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">{t("loadingCalculator")}</span>
      </div>
    </div>
  );
});
CalculatorLoader.displayName = "CalculatorLoader";

// Componente para renderizar cada calculadora
const CalculatorRenderer = memo(
  ({
    calculator,
    onClose,
    onUpdate,
  }: {
    calculator: CalculatorInstance;
    onClose: (id: number) => void;
    onUpdate: (id: number, updates: Partial<CalculatorInstance>) => void;
  }) => {
    const commonProps = useMemo(
      () => ({
        id: calculator.id,
        onClose: () => onClose(calculator.id),
        initialPosition: calculator.position,
        onPositionChange: (position: PositionWithWidth) =>
          onUpdate(calculator.id, { position }),
        initialFormula: calculator.state?.formula,
        onFormulaChange: (formula: string) =>
          onUpdate(calculator.id, {
            state: { ...calculator.state, formula },
          }),
        initialResult: calculator.state?.result,
        onResultChange: (result: string | null) =>
          onUpdate(calculator.id, {
            state: { ...calculator.state, result },
          }),
        isKeyboardVisible: calculator.state?.isKeyboardVisible,
        onKeyboardVisibilityChange: (isKeyboardVisible: boolean) =>
          onUpdate(calculator.id, {
            state: { ...calculator.state, isKeyboardVisible },
          }),
      }),
      [calculator, onClose, onUpdate]
    );

    const renderCalculatorComponent = () => {
      switch (calculator.type) {
        case "molar-mass":
          return <MolarMassCalculator {...commonProps} />;
        case "scientific":
          return <ScientificCalculator {...commonProps} />;
        default:
          return null;
      }
    };

    return (
      <Suspense key={calculator.id} fallback={<CalculatorLoader />}>
        {renderCalculatorComponent()}
      </Suspense>
    );
  }
);
CalculatorRenderer.displayName = "CalculatorRenderer";

export function CalculatorPageContent() {
  const calculators = useCalculatorInstancesStore((state) => state.calculators);
  const removeCalculator = useCalculatorInstancesStore(
    (state) => state.removeCalculator
  );
  const updateCalculator = useCalculatorInstancesStore(
    (state) => state.updateCalculator
  );
  const clearCalculators = useCalculatorInstancesStore(
    (state) => state.clearCalculators
  );

  const resetHistoryVisibility = useCalculatorHistoryStore(
    (state) => state.resetHistoryVisibility
  );

  // Memoizar callbacks para evitar re-renders desnecessários
  const handleClose = useMemo(
    () => (id: number) => {
      resetHistoryVisibility(id);
      removeCalculator(id);
    },
    [resetHistoryVisibility, removeCalculator]
  );

  const handleUpdate = useMemo(
    () => (id: number, updates: Partial<CalculatorInstance>) => {
      updateCalculator(id, updates);
    },
    [updateCalculator]
  );

  const handleCloseAll = useMemo(
    () => () => {
      calculators.forEach((calc) => resetHistoryVisibility(calc.id));
      clearCalculators();
    },
    [calculators, resetHistoryVisibility, clearCalculators]
  );

  if (calculators.length === 0) {
    return null;
  }

  return (
    <div id="main-content-area" className="w-full min-h-screen relative">
      <div className="absolute top-4 left-4 z-50">
        <CloseAllButton count={calculators.length} onClick={handleCloseAll} />
      </div>
      {calculators.map((calculator) => (
        <CalculatorRenderer
          key={calculator.id}
          calculator={calculator}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
