export interface ICalculatorService {
  calculate(input: string): Promise<number>;
  validate(input: string): string[];
}

export interface IMolarMassCalculator extends ICalculatorService {
  getElements(): Promise<Array<{
    symbol: string;
    atomicMass: number;
  }>>;
}

export interface ICalculatorFactory {
  createCalculator(type: string): ICalculatorService;
} 