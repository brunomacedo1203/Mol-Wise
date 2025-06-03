import { ICalculatorService, ICalculatorFactory } from '../../domain/interfaces/ICalculatorService';
import { MolarMassCalculator } from '../services/MolarMassCalculator';
import { TranslationFunction } from '@/shared/types/translation';

export class CalculatorFactory implements ICalculatorFactory {
  constructor(private readonly t: TranslationFunction) {}

  createCalculator(type: string): ICalculatorService {
    switch (type) {
      case 'molar-mass':
        return new MolarMassCalculator(this.t);
      // Adicione outros tipos de calculadoras aqui
      default:
        throw new Error(this.t('calculators.errors.unsupportedType', { type }));
    }
  }
} 