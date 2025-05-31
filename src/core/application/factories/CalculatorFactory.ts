import { ICalculatorService, ICalculatorFactory } from '../../domain/interfaces/ICalculatorService';
import { MolarMassCalculator } from '../services/MolarMassCalculator';

export class CalculatorFactory implements ICalculatorFactory {
  createCalculator(type: string): ICalculatorService {
    switch (type) {
      case 'molar-mass':
        return new MolarMassCalculator();
      // Adicione outros tipos de calculadoras aqui
      default:
        throw new Error(`Tipo de calculadora não suportado: ${type}`);
    }
  }
} 