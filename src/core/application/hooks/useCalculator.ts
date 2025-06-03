import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ICalculatorService } from '../../domain/interfaces/ICalculatorService';
import { CalculatorFactory } from '../factories/CalculatorFactory';
import { TranslationFunction } from '@/shared/types/translation';

export function useCalculator(type: string) {
  const t = useTranslations() as unknown as TranslationFunction;
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculator: ICalculatorService = new CalculatorFactory(t).createCalculator(type);

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
      const errorMessage = err instanceof Error ? err.message : t('calculators.errors.generic');
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [calculator, t]);

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