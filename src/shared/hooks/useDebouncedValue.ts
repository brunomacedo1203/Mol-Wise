// ✅ Arquivo: src/shared/hooks/useDebouncedValue.ts

import { useEffect, useState } from "react";

/**
 * Hook para aplicar debounce em qualquer valor (texto, número, objeto, etc.)
 *
 * @param value Valor de entrada que será "retardado"
 * @param delay Tempo em milissegundos para aguardar antes de atualizar o valor (padrão: 500ms)
 * @returns O valor atualizado apenas após o tempo de inatividade definido
 */
export function useDebouncedValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Inicia um timer para atualizar o valor após o delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancela o timer se o valor mudar antes do delay terminar
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
