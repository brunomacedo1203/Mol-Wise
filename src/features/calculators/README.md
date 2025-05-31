# Calculadoras

Este módulo implementa calculadoras químicas interativas, começando com a calculadora de massa molar.

## Estrutura

```
calculators/
├── components/           # Componentes React
├── domain/              # Regras de negócio e tipos
├── hooks/               # Hooks personalizados
├── services/            # Serviços e adaptadores
└── styles/              # Estilos e temas
```

## Componentes

### CalculatorContainer

Componente base que fornece a estrutura comum para todas as calculadoras. Implementa:

- Container arrastável e redimensionável
- Cabeçalho com título e subtítulo
- Área para input e ações
- Toggle para teclado virtual
- Tratamento de erros

```tsx
<CalculatorContainer
  title="Calculadora de Massa Molar"
  subtitle="Digite uma fórmula molecular"
  input={<MolecularFormulaInput ... />}
  actions={<KeyboardCalculate ... />}
  errorMessage={null}
  onClose={() => console.log('Fechar')}
  initialPosition={{ x: 100, y: 100 }}
  onPositionChange={(pos) => console.log(pos)}
  isKeyboardVisible={true}
  onKeyboardVisibilityChange={(visible) => console.log(visible)}
/>
```

#### Props

- `title: string` - Título da calculadora
- `subtitle?: string` - Subtítulo opcional
- `input: ReactNode` - Componente de entrada
- `actions?: ReactNode` - Componentes de ação (ex: teclado)
- `children?: ReactNode` - Conteúdo adicional
- `errorMessage?: string` - Mensagem de erro
- `onClose?: () => void` - Handler de fechamento
- `initialPosition?: Position` - Posição inicial
- `onPositionChange?: (pos: PositionWithWidth) => void` - Handler de posição
- `isKeyboardVisible?: boolean` - Visibilidade do teclado
- `onKeyboardVisibilityChange?: (visible: boolean) => void` - Handler de visibilidade

### MolecularFormulaInput

Componente de entrada para fórmulas moleculares com suporte a subscritos.

```tsx
<MolecularFormulaInput
  value="H2O"
  onChange={(formula) => console.log(formula)}
  onEnterPress={() => console.log("Calcular")}
  errorMessage={null}
  resultHtml="<span>H₂O = 18.02 g/mol</span>"
/>
```

#### Props

- `value?: string` - Valor atual da fórmula
- `onChange: (val: string) => void` - Handler de mudança
- `onEnterPress: () => void` - Handler do Enter
- `errorMessage?: string | null` - Mensagem de erro
- `resultHtml?: string | null` - HTML do resultado

### MolarMassCalculator

Calculadora de massa molar com interface arrastável e teclado virtual.

```tsx
<MolarMassCalculator
  id={1}
  initialFormula="H2O"
  onFormulaChange={(formula) => console.log(formula)}
  onResultChange={(result) => console.log(result)}
  initialPosition={{ x: 100, y: 100 }}
  onPositionChange={(pos) => console.log(pos)}
  onClose={() => console.log("Fechar")}
/>
```

#### Props

- `id: number` - ID único da calculadora
- `initialFormula?: string` - Fórmula inicial
- `onFormulaChange?: (formula: string) => void` - Handler de mudança
- `initialResult?: string | null` - Resultado inicial
- `onResultChange?: (result: string | null) => void` - Handler de resultado
- `initialPosition?: Position` - Posição inicial
- `onPositionChange?: (pos: Position) => void` - Handler de posição
- `onClose?: () => void` - Handler de fechamento

## Hooks

### useMolarMassCalculator

Hook para gerenciar o estado e lógica da calculadora de massa molar.

```tsx
const {
  formula,
  molarMass,
  errorMessage,
  handleFormulaChange,
  calculate,
  reset,
  handleKeyPress,
} = useMolarMassCalculator({
  initialFormula: "H2O",
  onFormulaChange: (formula) => console.log(formula),
  onResultChange: (result) => console.log(result),
});
```

#### Parâmetros

- `initialFormula?: string` - Fórmula inicial
- `initialResult?: string | null` - Resultado inicial
- `onFormulaChange?: (formula: string) => void` - Handler de mudança
- `onResultChange?: (result: string | null) => void` - Handler de resultado

#### Retorno

- `formula: string` - Fórmula atual
- `molarMass: string | null` - Massa molar calculada
- `errorMessage: string | null` - Mensagem de erro
- `handleFormulaChange: (newFormula: string) => void` - Atualiza fórmula
- `calculate: () => void` - Calcula massa molar
- `reset: () => void` - Reseta estado
- `backspace: () => void` - Remove último caractere
- `handleKeyPress: (key: string) => void` - Handler de teclas
- `handleFormulaBtn: (value: string) => void` - Adiciona fórmulas
- `handleParenthesis: (paren: string) => void` - Adiciona parênteses

## Tipos

### Position

```ts
interface Position {
  x: number;
  y: number;
}
```

### PositionWithWidth

```ts
interface PositionWithWidth extends Position {
  width: number;
}
```

### CalculatorState

```ts
interface CalculatorState {
  formula: string;
  result: string | null;
  error: string | null;
  isKeyboardVisible: boolean;
}
```

## Estilos

Os estilos são definidos usando Tailwind CSS e estão organizados em:

- `containerStyles.ts`
