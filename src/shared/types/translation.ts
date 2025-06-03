import { ReactNode } from 'react';

/**
 * Interface para os parâmetros de tradução
 * Compatível com o tipo esperado pelo next-intl
 */
export type TranslationParams = Record<string, string | number | Date>;

/**
 * Tipo para a função de tradução
 * Compatível com o tipo retornado pelo useTranslations do next-intl
 */
export type TranslationFunction = {
  <TargetKey extends string>(
    key: TargetKey,
    values?: TranslationParams
  ): string;
  rich<TargetKey extends string>(
    key: TargetKey,
    values?: TranslationParams
  ): ReactNode;
  markup<TargetKey extends string>(
    key: TargetKey,
    values?: TranslationParams
  ): string;
  raw<TargetKey extends string>(
    key: TargetKey,
    values?: TranslationParams
  ): string;
}; 