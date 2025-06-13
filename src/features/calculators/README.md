# Calculadoras - Guia de Implementação

Este guia detalha como implementar novas calculadoras químicas no Mol Wise, usando a calculadora de massa molar como exemplo.

## Estrutura do Módulo

```
calculators/
├── components/           # Componentes React
│   ├── common/          # Componentes compartilhados
│   │   ├── CalculatorContainer.tsx  # Container base para calculadoras
│   │   └── index.ts
│   └── calculators/     # Implementações específicas
│       ├── molar-mass/  # Calculadora de massa molar
│       │   ├── index.ts
│       │   ├── MolarMassCalculator.tsx
│       │   ├── MolecularFormulaInput.tsx
│       │   └── KeyboardCalculate.tsx
│       ├── scientific/  # Calculadora Científica
│       │   ├── index.ts
│       │   ├── ScientificCalculator.tsx
│       │   ├── ScientificExpressionInput.tsx
│       │   └── ScientificKeyboard.tsx
│       └── sua-calculadora/  # Sua nova calculadora aqui
├── domain/              # Regras de negócio e tipos
│   ├── types.ts        # Tipos compartilhados
│   └── services/       # Serviços de cálculo
│       └── formulaParser.ts # Serviço de parseamento de fórmulas
├── hooks/              # Hooks personalizados
│   ├── index.ts
│   ├── useMolarMassCalculator.ts
│   └── calculators/ # Hooks específicos de calculadora
│       └── scientific/ # Hooks da calculadora científica
│           └── useScientificCalculator.ts
├── services/           # Serviços e adaptadores
└── styles/             # Estilos e temas
```

## Passo a Passo: Criando uma Nova Calculadora

### 1. Definir o Tipo da Calculadora

1. Adicione o ID da calculadora em `domain/types.ts`:

```typescript
export type CalculatorId = "molar-mass" | "sua-calculadora" | "scientific";

export interface CalculatorBaseProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  initialPosition?: Position;
  onPositionChange?: (pos: PositionWithWidth) => void;
  isKeyboardVisible?: boolean;
  onKeyboardVisibilityChange?: (visible: boolean) => void;
}
```

### 2. Criar a Estrutura de Pastas

1. Crie uma nova pasta em `components/calculators/`:

```bash
mkdir src/features/calculators/components/calculators/sua-calculadora
```

2. Crie os arquivos base:

```bash
touch src/features/calculators/components/calculators/sua-calculadora/index.ts
touch src/features/calculators/components/calculators/sua-calculadora/SuaCalculadora.tsx
touch src/features/calculators/components/calculators/sua-calculadora/SuaInput.tsx
touch src/features/calculators/components/calculators/sua-calculadora/SuaKeyboard.tsx
```

### 3. Implementar os Componentes

#### 3.1. Arquivo de Exportação (index.ts)

```typescript
export { default as SuaCalculadora } from "./SuaCalculadora";
export { default as SuaInput } from "./SuaInput";
export { default as SuaKeyboard } from "./SuaKeyboard";
```

#### 3.2. Componente Principal (SuaCalculadora.tsx)

```typescript
"use client";
import { useTranslations } from "next-intl";
import { CalculatorBaseProps } from "@/features/calculators/domain/types";
import { useSuaCalculadora } from "@/features/calculators/hooks";
import { SuaInput, SuaKeyboard } from "./";
import { CalculatorContainer } from "@/features/calculators/components/common";

type SuaCalculadoraProps = Omit<CalculatorBaseProps, "title" | "subtitle"> & {
  id: number;
  // Props específicas da sua calculadora
};

export default function SuaCalculadora({
  id,
  onClose,
  initialPosition,
  onPositionChange,
}: // ... outras props
SuaCalculadoraProps) {
  const {
    // Estado e handlers da sua calculadora
  } = useSuaCalculadora({
    // Configuração inicial
  });

  const t = useTranslations("calculators.suaCalculadora");

  return (
    <CalculatorContainer
      id={id}
      title={t("title")}
      subtitle={t("subtitle")}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      input={<SuaInput /* props */ />}
      actions={<SuaKeyboard /* props */ />}
      onClose={onClose}
    />
  );
}
```

#### 3.3. Componente de Entrada (SuaInput.tsx)

```typescript
interface SuaInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnterPress: () => void;
  errorMessage?: string | null;
  resultHtml?: string;
}

export default function SuaInput({
  value,
  onChange,
  onEnterPress,
  errorMessage,
  resultHtml,
}: SuaInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnterPress()}
        className="input-base"
      />
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      {resultHtml && <div dangerouslySetInnerHTML={{ __html: resultHtml }} />}
    </div>
  );
}
```

#### 3.4. Componente do Teclado (SuaKeyboard.tsx)

```typescript
interface SuaKeyboardProps {
  onKeyPress: (key: string) => void;
  onCalculate: () => void;
  onReset: () => void;
  // ... outros handlers
}

export default function SuaKeyboard({
  onKeyPress,
  onCalculate,
  onReset,
}: SuaKeyboardProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Botões do teclado */}
      <button onClick={() => onKeyPress("1")}>1</button>
      <button onClick={() => onKeyPress("2")}>2</button>
      {/* ... outros botões */}
      <button onClick={onCalculate}>Calcular</button>
      <button onClick={onReset}>Limpar</button>
    </div>
  );
}
```

### 4. Criar o Hook Personalizado

1. Crie um novo arquivo em `hooks/`:

```typescript
// hooks/useSuaCalculadora.ts
interface UseSuaCalculadoraProps {
  // Props de configuração
}

export function useSuaCalculadora({}: // ... props
UseSuaCalculadoraProps) {
  // Estado
  const [value, setValue] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleChange = (newValue: string) => {
    setValue(newValue);
    // Lógica de validação
  };

  const calculate = () => {
    try {
      // Lógica de cálculo
      setResult("resultado");
      setError(null);
    } catch (err) {
      setError("Erro no cálculo");
      setResult(null);
    }
  };

  return {
    value,
    result,
    error,
    handleChange,
    calculate,
    // ... outros handlers
  };
}
```

### 5. Adicionar Traduções

1. Adicione as traduções em `i18n/messages/pt.json` e `en.json`:

```json
{
  "calculators": {
    "suaCalculadora": {
      "title": "Sua Calculadora",
      "subtitle": "Descrição da sua calculadora",
      "input": {
        "placeholder": "Digite um valor",
        "label": "Entrada"
      },
      "keyboard": {
        "calculate": "Calcular",
        "reset": "Limpar"
      },
      "errors": {
        "invalid": "Valor inválido"
      }
    }
  }
}
```

### 6. Integrar ao Menu

1. Adicione a calculadora ao menu em `menuConfig.ts`:

```typescript
{
  id: MENU_SECTIONS.CALCULATORS,
  icon: Calculator,
  translationKey: "navigation.calculators",
  items: [
    // ... outros itens
    {
      icon: SeuIcone,
      translationKey: "calculators.suaCalculadora.title",
      type: "calculator",
      calculatorId: "sua-calculadora",
    } as const,
  ],
}
```

### 7. Testar a Implementação

1. Verifique se a calculadora aparece no menu
2. Teste a abertura e fechamento
3. Verifique o cálculo e validações
4. Teste o teclado virtual
5. Verifique as traduções
6. Teste o comportamento responsivo

## Exemplo Completo: Calculadora Científica

A calculadora científica serve como um exemplo de implementação mais avançada:

1.  **Componentes**:

    - `ScientificCalculator.tsx`: Componente principal
    - `ScientificExpressionInput.tsx`: Entrada de expressão
    - `ScientificKeyboard.tsx`: Teclado virtual

2.  **Hook**:

    - `useScientificCalculator.ts`: Lógica de cálculo

3.  **Serviço**:

    - `formulaParser.ts`: Serviço de parseamento de fórmulas

4.  **Traduções**:

    ```json
    {
      "calculators": {
        "scientific": {
          "title": "Calculadora Científica",
          "subtitle": "Realize cálculos matemáticos avançados",
          "input": {
            "placeholder": "Digite uma expressão matemática",
            "label": "Expressão"
          },
          "keyboard": {
            "calculate": "Calcular",
            "reset": "Reiniciar"
          },
          "errors": {
            "invalidExpression": "Expressão inválida",
            "empty": "A expressão não pode estar vazia"
          }
        }
      }
    }
    ```

5.  **Uso**:

    ```tsx
    <ScientificCalculator
      id={1}
      initialFormula="sin(pi/2)"
      onFormulaChange={(formula) => console.log(formula)}
      onResultChange={(result) => console.log(result)}
      initialPosition={{ x: 100, y: 100 }}
      onPositionChange={(pos) => console.log(pos)}
      onClose={() => console.log("Fechar")}
    />
    ```

## Boas Práticas

1. **Componentes**:

   - Mantenha componentes pequenos e focados
   - Reutilize componentes comuns
   - Use TypeScript para type safety

2. **Estado**:

   - Use hooks personalizados para lógica
   - Mantenha o estado local quando possível
   - Use context para estado global

3. **Estilo**:

   - Use classes Tailwind consistentes
   - Mantenha a consistência visual
   - Suporte tema claro/escuro

4. **Acessibilidade**:

   - Use labels apropriados
   - Suporte navegação por teclado
   - Forneça mensagens de erro claras

5. **Internacionalização**:
   - Use chaves de tradução consistentes
   - Mantenha traduções organizadas
   - Suporte múltiplos idiomas

## Suporte

Se precisar de ajuda:

1. Consulte a documentação existente
2. Verifique os exemplos de implementação
3. Abra uma issue no repositório
4. Entre em contato com a equipe

---

Este guia está em constante evolução. Se encontrar algo que precise ser atualizado ou tiver sugestões de melhoria, por favor, abra uma issue ou envie um pull request.
