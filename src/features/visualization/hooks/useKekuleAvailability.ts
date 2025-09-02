import { useState, useEffect, useCallback } from 'react';

interface UseKekuleAvailabilityResult {
  isAvailable: boolean;
  isLoading: boolean;
  error: Error | null;
  checkAvailability: () => Promise<boolean>;
}

export function useKekuleAvailability(): UseKekuleAvailabilityResult {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const checkAvailability = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Tenta carregar Kekule.js
      const Kekule = await import('kekule');
      
      // Verifica se o objeto principal está disponível
      if (Kekule && (Kekule.default || Kekule)) {
        setIsAvailable(true);
        return true;
      } else {
        throw new Error('Kekule.js carregado mas não inicializado corretamente');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido ao carregar Kekule.js');
      setError(error);
      setIsAvailable(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verifica disponibilidade na montagem
  useEffect(() => {
    checkAvailability();
  }, [checkAvailability]);

  return {
    isAvailable,
    isLoading,
    error,
    checkAvailability,
  };
}
