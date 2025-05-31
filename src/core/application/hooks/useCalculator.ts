import { useState, useCallback } from 'react';
import { ICalculatorService } from '../../domain/interfaces/ICalculatorService';
import { CalculatorFactory } from '../factories/CalculatorFactory';

export function useCalculator(type: string) {
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculator: ICalculatorService = new CalculatorFactory().createCalculator(type);

  const calculate = useCallback(async (input: string): Promise<number> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const errors = calculator.validate(input);
      if (errors.length > 0) {
        setError(errors.join(', '));
        throw new Error(errors.join(', '));
      }

      const result = await calculator.calculate(input);
      setResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao calcular';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [calculator]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    error,
    isLoading,
    calculate,
    reset
  };
} 