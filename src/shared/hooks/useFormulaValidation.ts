'use client';

import { useTranslations } from 'next-intl';

export function useFormulaValidation() {
  const t = useTranslations();

  const validateFormula = (formula: string): string | null => {
    if (!formula || formula.trim() === '') {
      return t('common.errors.emptyFormula');
    }
    return null;
  };

  return { validateFormula };
}
