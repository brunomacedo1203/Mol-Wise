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
- Zustand (gerenciamento de estado global)
- Framer Motion (animações do menu/submenu)
- [shadcn/ui](https://ui.shadcn.com/) (ScrollArea e outros utilitários de UI)

## 🏗️ Arquitetura Detalhada das Features

O projeto segue uma arquitetura baseada em domínio, com cada funcionalidade principal organizada em uma feature independente. Abaixo, detalhamos a estrutura de arquivos das principais features:

### Estrutura Geral

```
src/features/
├── catalog/         # Catálogo de compostos químicos
├── calculators/     # Calculadoras químicas
└── periodic-table/  # Tabela periódica
```

---

### Feature: Catalog

```
catalog/
├── components/
│   └── common/
│       ├── CompoundTable.tsx            # Componente principal da tabela de compostos
│       ├── CompoundTableToolbar.tsx     # Barra de ferramentas (busca, seleção de colunas)
│       ├── CompoundTableHeader.tsx      # Cabeçalho da tabela (ordenação, títulos)
│       ├── CompoundTableRows.tsx        # Linhas da tabela (dados, tratamento de vazio)
│       ├── TablePagination.tsx          # Paginação da tabela
│       ├── DataTableColumnHeader.tsx    # Header customizado para colunas
│       ├── columns.tsx                  # Definição das colunas da tabela
│       ├── compoundColumns.tsx          # Colunas específicas de compostos
│       └── README.md                    # Documentação interna
├── hooks/
│   └── common/
│       ├── useCompoundTable.ts          # Hook de estado da tabela (busca, ordenação, etc)
│       ├── useColumnWidths.ts           # Hook para cálculo dinâmico das larguras
│       └── useCompoundData.ts           # Hook para buscar e normalizar dados
├── domain/
│   └── types/
│       ├── TableColumnKey.ts            # Tipos de chave de coluna
│       └── ChemicalCompound.ts          # Tipo de composto químico
├── utils/
│   ├── extractLabelText.ts              # Utilitário para extrair texto de labels
│   └── compoundFormatters.ts            # Funções utilitárias para formatação/tradução
```

**Responsabilidades:**

- `components/common/`: Componentes visuais reutilizáveis para tabelas de compostos.
- `hooks/common/`: Hooks para lógica de estado, dados e layout das tabelas.
- `domain/types/`: Tipos TypeScript para compostos e colunas.
- `utils/`: Funções utilitárias para formatação e manipulação de dados.

---

### Feature: Calculators

```
calculators/
├── components/
│   ├── common/
│   │   ├── CalculatorContainer.tsx         # Container base para calculadoras
│   │   ├── CalculatorHeader.tsx            # Cabeçalho padrão
│   │   └── CalculatorKeyboardToggle.tsx    # Controle de teclado virtual
│   └── calculators/
│       ├── molar-mass/                     # Calculadora de massa molar
│       │   ├── MolarMassCalculator.tsx     # Implementação principal
│       │   └── MolecularFormulaInput.tsx   # Input especializado
│       └── scientific/                     # Outras calculadoras científicas
├── hooks/
│   ├── common/
│   │   ├── useCalculatorKeyboard.ts        # Hook de teclado virtual
│   │   ├── useCalculatorPosition.ts        # Hook de posicionamento
│   │   └── useCalculatorPage.ts            # Hook de gerenciamento de página
│   └── calculators/
│       ├── molar-mass/
│       │   └── useMolarMassCalculator.ts   # Hook específico de massa molar
│       └── scientific/                     # Hooks de outras calculadoras
├── domain/
│   └── types/
│       ├── calculator.ts                   # Tipos base de calculadora
│       ├── scientific-constants.ts         # Constantes científicas
│       ├── position.ts                     # Tipos de posição
│       ├── keyboard.ts                     # Tipos do teclado virtual
│       ├── molecularFormulaInput.ts        # Tipos para input molecular
│       └── calculator-page.ts              # Tipos de página de calculadora
├── utils/
│   ├── zeroValidation.ts                   # Validação de zeros em cálculos
│   └── chunkArray.ts                       # Utilitário para dividir arrays
```

**Responsabilidades:**

- `components/common/`: Componentes base e utilitários visuais para calculadoras.
- `components/calculators/`: Implementações específicas de cada calculadora.
- `hooks/common/`: Hooks reutilizáveis para lógica de UI e estado.
- `hooks/calculators/`: Hooks específicos para cada tipo de calculadora.
- `domain/types/`: Tipos TypeScript para calculadoras, teclado, posições, etc.
- `utils/`: Funções utilitárias para cálculos e manipulação de dados.

---

### Feature: Periodic Table

```
periodic-table/
├── components/
│   ├── common/
│   │   ├── PeriodicTableHeader.tsx         # Cabeçalho da tabela periódica
│   │   ├── PeriodicTableLegend.tsx         # Legenda de cores/símbolos
│   │   └── PeriodicTableContainer.tsx      # Container principal
│   └── specific/
│       ├── PeriodicTable.tsx               # Componente principal da tabela
│       ├── cards/                          # Cartões de elementos
│       └── details/                        # Detalhes de elementos
├── hooks/
│   ├── usePeriodicTable.ts                 # Hook principal da tabela periódica
│   └── common/                             # Hooks comuns (se houver)
├── domain/
│   └── types/
│       ├── table.ts                        # Tipos da tabela periódica
│       ├── config.ts                       # Configurações da tabela
│       └── element.ts                      # Tipos de elemento químico
├── utils/
│   ├── periodicTableMatrix.ts              # Matriz de elementos
│   ├── periodicTableUtils.ts               # Funções utilitárias
│   └── .gitkeep                            # Placeholder
```

**Responsabilidades:**

- `components/common/`: Componentes visuais compartilhados da tabela periódica.
- `components/specific/`: Componentes específicos, cartões e detalhes de elementos.
- `hooks/`: Hooks para lógica de estado e dados da tabela periódica.
- `domain/types/`: Tipos TypeScript para elementos, configuração e estrutura da tabela.
- `utils/`: Funções utilitárias para manipulação de dados da tabela periódica.

---

# 💡 Como funciona a feature de destaque por categoria na Tabela Periódica (Mol Wise)

---

## 📝 **Resumo da Feature**

- Ao selecionar uma ou mais categorias no filtro, todos os elementos que pertencem a essas categorias na tabela periódica são destacados com uma cor de fundo específica.
- Ao remover a seleção, os cards voltam ao fundo padrão.
- Funciona tanto no modo claro quanto no modo escuro.

---

## ⚙️ **Passo a Passo e Arquivos Relacionados**

### 1. **Seleção de Categorias**

- **Componente:** `PeriodicTableFilterDropdown.tsx` → Usa o `MultiSelectCombobox` (`combobox.tsx`).
- **Descrição:** O usuário seleciona uma ou mais opções de categoria no filtro, que dispara a atualização do array de categorias selecionadas.

### 2. **Estado Global**

- **Componente:** `usePeriodicTableStore.ts` (store Zustand)
- **Descrição:** O array `filters` armazena as categorias atualmente selecionadas e é acessado por toda a aplicação.

### 3. **Renderização da Tabela**

- **Componente:** `PeriodicTableCards.tsx`
- **Descrição:** Ao renderizar a tabela, o componente lê o array `filters` e repassa para cada elemento (`ElementCardWrapper`) a lista de categorias selecionadas via prop `highlightedCategories`.

### 4. **Destaque Visual do Elemento**

- **Componente:** `ElementCardWrapper.tsx`
- **Descrição:** Recebe o array de categorias selecionadas. Para cada elemento, compara sua categoria com as selecionadas. Se houver correspondência, aplica a classe de cor de fundo definida no mapeamento; caso contrário, mantém o fundo padrão. O destaque é feito usando o modificador `!` do Tailwind para garantir que a cor prevaleça sobre outras classes.

### 5. **Mapeamento de Cores**

- **Arquivo:** `elementCategories.ts`
- **Descrição:** O objeto `CATEGORY_COLOR_MAP` faz o mapeamento entre o nome da categoria e a classe de cor do Tailwind, por exemplo:
  ```ts
  export const CATEGORY_COLOR_MAP: Record<string, string> = {
    "Alkali metal": "!bg-yellow-300",
    "Alkaline earth metal": "!bg-orange-300",
    "Transition metal": "!bg-blue-300",
    // ... outras categorias
  };
  ```
- O safelist no `tailwind.config.ts` garante que todas as classes de cor usadas dinamicamente sejam geradas no CSS final.

### 6. **Componente Visual do Card**

- **Componente:** `SingleCardPeriodicTable.tsx`
- **Descrição:** Responsável apenas pelo conteúdo visual do elemento (símbolo, nome, etc.), sem aplicar cor de fundo no modo claro, permitindo que o destaque do wrapper seja visível.

---

## 🧩 **Resumo da Lógica**

Sempre que o usuário seleciona ou desmarca uma categoria, o array de filtros é atualizado e propagado para todos os cards. Cada card verifica se sua categoria está entre as selecionadas e, se sim, aplica a cor de destaque correspondente, garantindo uma experiência visual instantânea e clara para o usuário.

> Para cada nova feature, siga o padrão de organização acima: separe componentes, hooks, tipos e utilitários em subpastas claras e documente as responsabilidades de cada arquivo.

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

## 🧭 Estrutura e Funcionamento do Menu

O menu lateral do Mol Wise é altamente modular, responsivo e suporta múltiplas seções, submenus e integração com internacionalização (i18n). Ele é implementado em `src/shared/components/menu/` e utiliza contexto para controle de estado (colapsado/expandido, seções abertas, etc).

### Estrutura de Arquivos do Menu

```
src/shared/components/menu/
├── constants.ts           # Constantes de identificação das seções do menu
├── types.ts               # Tipos TypeScript para itens, seções e props do menu
├── config/
│   └── menuConfig.ts      # Configuração das seções e itens do menu
├── hooks/
│   └── useMenuItems.ts    # Hook para montar as seções do menu com base na config e traduções
├── context/
│   └── MenuContext.tsx    # Contexto React para estado do menu (colapsado, seções abertas)
├── components/
│   ├── Menu.tsx           # Componente principal do menu lateral
│   ├── MenuAccordion.tsx  # Componente de seção expansível do menu
│   ├── MenuItem.tsx       # Componente de item individual do menu
│   └── Submenu.tsx        # Componente de submenu
└── README.md              # Guia detalhado de contribuição e extensão do menu
```

### Como o Menu Funciona

- **Configuração Centralizada:** Todas as seções e itens do menu são definidos em `menuConfig.ts`, usando constantes e tipos para garantir consistência.
- **Internacionalização:** Labels e títulos são traduzidos dinamicamente via arquivos de mensagens (`src/i18n/messages/pt.json` e `en.json`).
- **Estado Global:** O estado do menu (colapsado, seções abertas) é controlado por Zustand (`src/shared/store/sidebarStore.ts`) e persistido automaticamente no `localStorage`.
- **Componentização:** O menu é composto por componentes reutilizáveis, como `MenuAccordion` (seção expansível), `MenuItem` (item de link ou ação) e `Submenu` (lista de subitens).
- **Responsividade:** O menu pode ser colapsado/expandido, adaptando-se a diferentes tamanhos de tela.
- **Acessibilidade:** Usa atributos ARIA e navegação por teclado.

### Tipos de Itens de Menu

- **Link:** Navegação para páginas internas.
- **Calculator:** Abre uma calculadora em janela/modal (multi-instância).
- **Custom:** (Opcional) Para ações específicas, pode ser estendido.

### Exemplo de Adição de Nova Seção

1. **Defina a constante da seção em `constants.ts`:**

   ```ts
   export const MENU_SECTIONS = {
     CATALOG: "catalog",
     CALCULATORS: "calculators",
     NOVA_SECAO: "nova-secao",
   } as const;
   ```

2. **Adicione traduções em `pt.json` e `en.json`:**

   ```json
   {
     "navigation": {
       "novaSecao": "Nova Seção"
     },
     "novaSecao": {
       "item1": { "title": "Item 1", "subtitle": "Descrição" }
     }
   }
   ```

3. **Atualize `menuConfig.ts`:**

   ```ts
   import { MENU_SECTIONS } from "../constants";
   import { SomeIcon } from "lucide-react";
   export const menuSectionsConfig = [
     // ...outras seções
     {
       id: MENU_SECTIONS.NOVA_SECAO,
       icon: SomeIcon,
       translationKey: "navigation.novaSecao",
       items: [
         {
           icon: SomeIcon,
           translationKey: "novaSecao.item1.title",
           type: "link",
           href: (locale: string) => `/${locale}/nova-secao/item1`,
         } as const,
       ],
     },
   ];
   ```

4. **Crie a página correspondente em `src/app/[locale]/nova-secao/item1/page.tsx`.**

### Boas Práticas

- Use sempre os tipos definidos em `types.ts` para garantir consistência.
- Mantenha as traduções atualizadas para todos os idiomas suportados.
- Prefira componentes já existentes para manter a padronização visual.
- Teste o menu em diferentes tamanhos de tela e com teclado.

### Referência Rápida

- O menu é renderizado pelo componente `Menu.tsx`, geralmente dentro do layout lateral (`SideArea.tsx`).
- O estado de colapso/expansão pode ser controlado pelo usuário e é persistido.
- O menu suporta scroll interno e animações com Framer Motion.

## 🧭 Gerenciamento de Estado Global

O projeto utiliza **Zustand** para todo o gerenciamento de estado global, substituindo completamente o uso de Context API para estados compartilhados entre features. Cada domínio relevante possui seu próprio store, fortemente tipado e, quando necessário, com persistência automática no `localStorage`.

### Exemplos de stores globais:

- `src/shared/store/themeStore.ts` — tema claro/escuro
- `src/shared/store/sidebarStore.ts` — estado do menu lateral
- `src/shared/store/subtitleStore.ts` — subtítulo global
- `src/features/calculators/store/calculatorInstancesStore.ts` — instâncias das calculadoras
- `src/features/periodic-table/store/periodicTableStore.ts` — seleção e configuração da tabela periódica

#### Como consumir um estado global com Zustand:

```tsx
import { useThemeStore } from "@/shared/store/themeStore";
const theme = useThemeStore((state) => state.theme);
const toggleTheme = useThemeStore((state) => state.toggleTheme);
```

#### Como modificar um estado global:

```tsx
const setSubtitle = useSubtitleStore((state) => state.setSubtitle);
setSubtitle("Novo subtítulo");
```

#### Boas práticas:

- Sempre defina uma interface para o estado do store.
- Use o middleware `persist` apenas quando necessário.
- Prefira actions nomeadas (ex: `toggleTheme`, `setCollapsed`) ao invés de setters diretos.
- Documente o propósito do store e suas actions com comentários JSDoc.
