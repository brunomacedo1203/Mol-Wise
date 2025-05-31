# Mol Wise

Uma aplicação web moderna para cálculos e consultas em química, incluindo uma tabela periódica interativa e **múltiplas calculadoras químicas instanciáveis**.

## 🚀 Funcionalidades

### Tabela Periódica

- Visualização completa dos elementos químicos
- Layout responsivo com 3 níveis de detalhamento:
  - Tela grande: Exibe todas as informações (símbolo, nome, massa molar, número atômico)
  - Tela média: Mostra símbolo e número atômico
  - Tela pequena: Apresenta apenas o símbolo do elemento
- Scroll horizontal automático para telas menores
- Numeração de grupos centralizada

### Calculadora de Massa Molar

- Cálculo preciso de massa molar para compostos químicos
- Interface intuitiva com teclado virtual
- Validação de fórmulas químicas
- Exibição formatada de fórmulas com subíndices
- Tratamento de erros com mensagens em português

### 🆕 Página de Calculadoras (Multi-instância)

- **Abra múltiplas instâncias** da calculadora de massa molar ao mesmo tempo na página `/calculators`
- Menu lateral moderno com submenu dropdown flutuante e destaque visual
- Gerenciamento global das instâncias das calculadoras (abrir, fechar, múltiplas ao mesmo tempo)
- Estrutura pronta para adição de novas calculadoras químicas, como concentração, diluição, estequiometria, etc.
- Layout responsivo, consistente em todos os temas (claro e escuro)

## 🛠️ Tecnologias

- React.js
- Next.js
- TypeScript
- Tailwind CSS
- React Hooks
- Context API
- Framer Motion (animações do menu/submenu)
- [shadcn/ui](https://ui.shadcn.com/) (ScrollArea e outros utilitários de UI)

## 🏗️ Arquitetura

O projeto segue uma arquitetura baseada em domínio, organizando o código em camadas bem definidas e responsabilidades separadas. A estrutura atual é:

### Estrutura de Diretórios

```
src/
├── core/                    # Camada de núcleo da aplicação
│   ├── application/        # Serviços e casos de uso
│   │   ├── services/      # Serviços de domínio (ex: cálculo de massa molar)
│   │   └── hooks/         # Hooks de aplicação reutilizáveis
│   └── domain/            # Entidades e regras de negócio
│       ├── entities/      # Entidades de domínio
│       └── value-objects/ # Objetos de valor
│
├── features/               # Funcionalidades da aplicação
│   ├── calculators/       # Módulo de calculadoras
│   │   ├── components/    # Componentes React
│   │   │   ├── common/    # Componentes compartilhados
│   │   │   └── calculators/
│   │   │       └── molar-mass/ # Componentes específicos
│   │   ├── contexts/      # Contextos React
│   │   ├── domain/        # Tipos e interfaces
│   │   ├── hooks/         # Hooks específicos
│   │   └── styles/        # Estilos específicos
│   └── periodic-table/    # Módulo da tabela periódica
│
└── shared/                # Código compartilhado
    ├── components/        # Componentes UI reutilizáveis
    ├── hooks/            # Hooks utilitários
    ├── styles/           # Estilos globais
    └── utils/            # Funções utilitárias
```

### Camadas da Aplicação

1. **Camada de Domínio (`core/domain/`)**

   - Contém as entidades e regras de negócio fundamentais
   - Define interfaces e tipos base
   - Independente de frameworks e bibliotecas
   - Exemplo: Lógica de cálculo de massa molar

2. **Camada de Aplicação (`core/application/`)**

   - Implementa os casos de uso da aplicação
   - Coordena as interações entre domínio e interface
   - Contém serviços e hooks de aplicação
   - Exemplo: Serviço de cálculo de massa molar

3. **Camada de Features (`features/`)**

   - Organizada por funcionalidades
   - Cada feature é um módulo independente
   - Contém componentes, hooks e lógica específica
   - Exemplo: Módulo de calculadoras

4. **Camada Compartilhada (`shared/`)**
   - Código reutilizável entre features
   - Componentes UI comuns
   - Utilitários e helpers
   - Exemplo: Componentes de botão, input, etc.

### Padrões e Princípios

1. **Separação de Responsabilidades**

   - Cada módulo tem responsabilidades bem definidas
   - Componentes focados em UI
   - Hooks para lógica de estado
   - Serviços para regras de negócio

2. **Composição de Componentes**

   - Componentes pequenos e reutilizáveis
   - Composição sobre herança
   - Props tipadas com TypeScript
   - Exemplo: `CalculatorContainer` compõe `CalculatorHeader` e `KeyboardCalculate`

3. **Gerenciamento de Estado**

   - Context API para estado global
   - Hooks personalizados para lógica de estado
   - Estado local quando apropriado
   - Exemplo: `CalculatorInstancesContext` para gerenciar múltiplas calculadoras

4. **Tipagem Forte**

   - Interfaces e tipos bem definidos
   - Tipos específicos por domínio
   - Reutilização de tipos entre camadas
   - Exemplo: Tipos de calculadora em `domain/types/calculator.ts`

5. **Estilização**
   - Tailwind CSS para estilos
   - Classes utilitárias
   - Temas (claro/escuro)
   - Estilos específicos por feature

### Fluxo de Dados

1. **Calculadora de Massa Molar**

   ```
   UI (Componentes) → Hooks → Serviços → Domínio
   ```

   - Componentes React capturam interações
   - Hooks gerenciam estado e lógica
   - Serviços implementam regras de negócio
   - Domínio contém entidades e cálculos

2. **Gerenciamento de Instâncias**
   ```
   Context → Hooks → Componentes
   ```
   - Context API gerencia estado global
   - Hooks expõem funcionalidades
   - Componentes consomem e atualizam estado

### Extensibilidade

A arquitetura foi projetada para facilitar a adição de novas funcionalidades:

1. **Novas Calculadoras**

   - Implementar novos serviços em `core/application/services/`
   - Adicionar componentes em `features/calculators/components/calculators/`
   - Estender tipos em `features/calculators/domain/types/`

2. **Novas Features**
   - Criar novo diretório em `features/`
   - Seguir estrutura modular existente
   - Reutilizar componentes e hooks compartilhados

### Detalhamento do Módulo de Features

#### Estrutura Geral de uma Feature

```
features/
└── feature-name/              # Nome da feature (ex: calculators, periodic-table)
    ├── components/            # Componentes React
    │   ├── common/           # Componentes compartilhados internamente
    │   └── specific/         # Componentes específicos da feature
    │
    ├── contexts/             # Contextos React para estado global
    │
    ├── domain/               # Tipos e interfaces específicos
    │   └── types/           # Definições de tipos
    │
    ├── hooks/                # Hooks personalizados
    │   ├── common/          # Hooks compartilhados internamente
    │   └── specific/        # Hooks específicos da feature
    │
    └── styles/               # Estilos específicos da feature
```

#### Responsabilidades por Camada

1. **Componentes (`components/`)**

   - **Common**: Componentes reutilizáveis dentro da feature

     - Componentes de layout
     - Componentes de UI compartilhados
     - Wrappers e containers

   - **Specific**: Componentes específicos da feature
     - Implementações concretas
     - Componentes de negócio
     - Componentes de UI específicos

2. **Contextos (`contexts/`)**

   - Gerenciamento de estado global da feature
   - Compartilhamento de estado entre componentes
   - Fornecimento de hooks para interação
   - Persistência de estado quando necessário

3. **Tipos (`domain/types/`)**

   - Interfaces e tipos específicos da feature
   - Definições de props e estados
   - Tipos de eventos e callbacks
   - Enums e constantes

4. **Hooks (`hooks/`)**

   - **Common**: Hooks compartilhados

     - Lógica de UI reutilizável
     - Hooks de estado compartilhados
     - Hooks de efeitos comuns

   - **Specific**: Hooks específicos
     - Lógica de negócio
     - Hooks de estado específicos
     - Hooks de efeitos particulares

5. **Estilos (`styles/`)**
   - Estilos específicos da feature
   - Classes utilitárias
   - Temas e variantes
   - Configurações de layout

#### Exemplo: Módulo de Calculadoras

A feature de calculadoras segue a estrutura geral acima, com implementações específicas:

```
features/calculators/
├── components/
│   ├── common/               # Componentes compartilhados
│   │   ├── CalculatorContainer.tsx    # Container base para todas as calculadoras
│   │   ├── CalculatorHeader.tsx       # Cabeçalho padrão
│   │   └── CalculatorKeyboardToggle.tsx # Controle de teclado
│   │
│   └── calculators/          # Implementações específicas
│       └── molar-mass/       # Calculadora de massa molar
│           ├── MolarMassCalculator.tsx    # Implementação principal
│           └── MolecularFormulaInput.tsx  # Input especializado
│
├── contexts/
│   └── CalculatorInstancesContext.tsx    # Gerenciamento de múltiplas instâncias
│
├── domain/
│   └── types/
│       ├── calculator.ts     # Tipos base de calculadora
│       └── keyboard.ts       # Tipos do teclado virtual
│
├── hooks/
│   ├── common/
│   │   ├── useCalculatorKeyboard.ts    # Hook de teclado
│   │   └── useCalculatorPosition.ts    # Hook de posicionamento
│   │
│   └── calculators/
│       └── molar-mass/
│           └── useMolarMassCalculator.ts    # Hook específico
│
└── styles/
    └── containerStyles.ts    # Estilos do container
```

#### Fluxo de Dados Típico

1. **Inicialização**:

   ```
   Componente Principal
   └── Hook de Feature
       └── Contexto
           └── Componentes Específicos
   ```

2. **Interação**:

   ```
   Componente de UI
   └── Hook Específico
       └── Serviço de Domínio
           └── Atualização de Estado
   ```

3. **Gerenciamento de Estado**:
   ```
   Contexto
   └── Hook de Feature
       └── Componentes
           └── Hooks Específicos
   ```

#### Exemplo: Fluxo na Calculadora de Massa Molar

1. **Inicialização**:

   ```
   CalculatorPageContent
   └── useCalculatorPage
       └── CalculatorInstancesContext
           └── MolarMassCalculator
   ```

2. **Cálculo de Massa Molar**:
   ```
   MolecularFormulaInput
   └── useMolarMassCalculator
       └── Serviço de Cálculo
           └── Atualização de Resultado
   ```

#### Extensibilidade

Para adicionar uma nova feature:

1. **Estrutura Base**:

   - Criar diretório em `features/`
   - Seguir estrutura de pastas padrão
   - Implementar componentes base

2. **Componentes**:

   - Identificar componentes comuns
   - Criar componentes específicos
   - Reutilizar componentes UI quando possível

3. **Estado**:

   - Definir tipos de estado
   - Implementar contexto se necessário
   - Criar hooks de gerenciamento

4. **Lógica**:
   - Implementar hooks específicos
   - Conectar com serviços de domínio
   - Gerenciar efeitos colaterais

#### Exemplo: Adicionar Nova Calculadora

1. **Componentes**:

   - Criar pasta em `components/calculators/`
   - Reutilizar `CalculatorContainer` e outros componentes comuns
   - Implementar componentes específicos

2. **Hooks**:

   - Adicionar hooks em `hooks/calculators/`
   - Reutilizar hooks comuns (teclado, posicionamento)
   - Implementar lógica específica

3. **Tipos**:

   - Estender tipos existentes
   - Adicionar tipos específicos
   - Manter compatibilidade

4. **Contexto**:
   - Usar `CalculatorInstancesContext` existente
   - Adicionar estados específicos se necessário
   - Manter API consistente

## 💻 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/mol-wise.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse `http://localhost:3000` no seu navegador

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

- Desktop (>1280px): Visualização completa
- Tablet (1024px-1280px): Informações reduzidas
- Mobile (<1024px): Visualização simplificada com scroll horizontal

## 🎨 Modo Escuro

- Interface adaptada para dark mode, incluindo menu lateral, caixas de diálogo e dropdowns.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Próximos Passos

- [x] Permitir múltiplas instâncias da calculadora de massa molar (Multi-instância)
- [x] Implementar modo escuro
- [x] Menu lateral com submenu dropdown flutuante
- [ ] Adicionar mais calculadoras químicas (concentração, diluição, etc.)
- [ ] Adicionar informações detalhadas dos elementos
- [ ] Suporte para múltiplos idiomas
- [ ] Adicionar animações e transições em mais componentes
- [ ] Melhorar acessibilidade

---

**Sinta-se à vontade para sugerir melhorias ou contribuir!**
