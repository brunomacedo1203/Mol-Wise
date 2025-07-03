# Arquitetura de Pastas

Abaixo está a estrutura de pastas e arquivos principais relacionados à tabela de compostos químicos. Essa organização facilita a reutilização e manutenção dos componentes e hooks.

```
common/
├── CompoundTable.tsx           # Componente principal da tabela de compostos
├── CompoundTableToolbar.tsx    # Barra de ferramentas (busca, seleção de colunas)
├── CompoundTableHeader.tsx     # Cabeçalho da tabela (ordenação, títulos)
├── CompoundTableRows.tsx       # Linhas da tabela (dados, tratamento de vazio)
├── TablePagination.tsx         # Paginação da tabela
├── useCompoundData.ts          # Hook para buscar e normalizar dados
├── useCompoundTable.ts         # Hook de estado da tabela (busca, ordenação, etc)
├── useCompoundColumns.tsx      # Hook para definição das colunas
├── useColumnWidths.ts          # Hook para cálculo dinâmico das larguras
├── compoundFormatters.ts       # Utilitários de formatação/tradução de células
├── extractLabelText.ts         # Utilitário para extrair texto de labels
└── README.md                   # Documentação e guia de uso
```

> Outros diretórios podem existir para entidades diferentes, seguindo o mesmo padrão de organização.

---

# Mapa de Arquivos do Catálogo

Este diretório contém os principais arquivos responsáveis pela renderização e funcionamento da tabela de compostos químicos (catálogo). Veja abaixo um mapa dos arquivos e suas funções:

- **CompoundTable.tsx**: Componente principal da tabela de compostos. Orquestra hooks de dados, estado e renderiza os subcomponentes visuais.
- **CompoundTableToolbar.tsx**: Barra de ferramentas da tabela, incluindo busca e seleção de colunas.
- **CompoundTableHeader.tsx**: Cabeçalho da tabela, responsável por ordenação e exibição dos títulos das colunas.
- **CompoundTableRows.tsx**: Renderiza as linhas da tabela, incluindo tratamento para ausência de resultados.
- **TablePagination.tsx**: Componente de paginação da tabela.
- **useCompoundData.ts**: Hook para buscar e normalizar os dados dos compostos.
- **useCompoundTable.ts**: Hook para gerenciar o estado da tabela (busca, ordenação, paginação, colunas visíveis).
- **useCompoundColumns.tsx**: Hook que define as colunas da tabela, com suporte a tradução e labels dinâmicos.
- **useColumnWidths.ts**: Hook para cálculo dinâmico das larguras das colunas.
- **compoundFormatters.ts**: Funções utilitárias para formatação e tradução dos dados das células.
- **extractLabelText.ts**: Função utilitária para extrair texto de labels ReactNode.

> Estes arquivos trabalham juntos para fornecer uma tabela de catálogo flexível, reutilizável e fácil de manter.

# Compound Table Components

## Visão Geral da Arquitetura

Esta pasta contém a implementação modular da tabela de compostos químicos, seguindo boas práticas de separação de responsabilidades e reutilização de código. A arquitetura foi desenhada para facilitar a manutenção, extensão e criação de novas tabelas com comportamentos similares.

### Componentes e Hooks

- **CompoundTable.tsx**: Componente principal. Orquestra os hooks de dados, estado e renderiza os subcomponentes visuais.
- **CompoundTableToolbar.tsx**: Renderiza o campo de busca e o dropdown de seleção de colunas.
- **CompoundTableHeader.tsx**: Renderiza o cabeçalho da tabela, incluindo ordenação e alinhamento.
- **CompoundTableRows.tsx**: Renderiza as linhas da tabela, incluindo tratamento para "sem resultados".
- **TablePagination.tsx**: (Já existente) Renderiza a paginação da tabela.

#### Hooks e Utilitários

- **useCompoundColumns.tsx**: Hook que define as colunas da tabela, com suporte a tradução e labels dinâmicos.
- **useColumnWidths.ts**: Hook que calcula dinamicamente as larguras ideais das colunas.
- **useCompoundTable.ts**: Hook que centraliza o estado da tabela (busca, ordenação, paginação, colunas visíveis).
- **compoundFormatters.ts**: Funções utilitárias para formatação e tradução de dados das células.
- **extractLabelText.ts**: Função utilitária para extrair texto de qualquer ReactNode de label.

---

## Fluxo de Dados e Responsabilidades

1. **Dados**: O hook `useCompoundData` busca e normaliza os dados dos compostos.
2. **Estado da Tabela**: O hook `useCompoundTable` gerencia busca, ordenação, paginação e colunas visíveis.
3. **Colunas**: O hook `useCompoundColumns` define as colunas e labels, podendo ser customizado para outras tabelas.
4. **Renderização**: O componente principal orquestra os subcomponentes visuais, passando apenas as props necessárias.
5. **Formatação**: Utilitários centralizam a lógica de formatação/tradução, facilitando testes e reutilização.

---

## Como Criar Outras Tabelas Reutilizando a Arquitetura

### 1. Crie um novo componente principal (ex: `MyEntityTable.tsx`)

```tsx
import { useMyEntityData } from "../hooks/useMyEntityData";
import { useMyEntityTable } from "../hooks/useMyEntityTable";
import { useMyEntityColumns } from "./useMyEntityColumns";
import { useColumnWidths } from "../hooks/useColumnWidths";
import { CompoundTableToolbar } from "./CompoundTableToolbar";
import { CompoundTableHeader } from "./CompoundTableHeader";
import { CompoundTableRows } from "./CompoundTableRows";
import { TablePagination } from "./TablePagination";

export function MyEntityTable() {
  const { entities, isLoading, error } = useMyEntityData();
  const {
    searchTerm, setSearchTerm, currentPage, setCurrentPage,
    rowsPerPage, setRowsPerPage, totalPages, paginatedData,
    visibleColumns, setVisibleColumns, sortColumn, sortOrder, handleSort
  } = useMyEntityTable({ data: entities });
  const allColumns = useMyEntityColumns();
  const columnWidths = useColumnWidths(entities, allColumns, getCellValue);

  // Defina getCellValue conforme a estrutura dos seus dados

  return (
    <div className="...">
      <CompoundTableToolbar ... />
      <Table>
        <CompoundTableHeader ... />
        <CompoundTableRows ... />
      </Table>
      <TablePagination ... />
    </div>
  );
}
```

### 2. Crie um hook de colunas para sua entidade

```tsx
// useMyEntityColumns.tsx
import { useTranslations } from "next-intl";
import { useMemo } from "react";
export function useMyEntityColumns() {
  const t = useTranslations();
  return useMemo(
    () => [
      { key: "id", label: t("myEntity.tableHeaders.id") },
      { key: "name", label: t("myEntity.tableHeaders.name") },
      // ...outras colunas
    ],
    [t]
  );
}
```

### 3. Adapte o hook de estado e os utilitários conforme necessário

- Use o padrão de `useCompoundTable` para gerenciar busca, ordenação, paginação e colunas visíveis.
- Use/utilize/utilize ou adapte os utilitários de formatação conforme a necessidade dos seus dados.

### 4. Reutilize os subcomponentes visuais

- Os componentes `CompoundTableToolbar`, `CompoundTableHeader` e `CompoundTableRows` são genéricos e podem ser usados em outras tabelas, desde que as props estejam de acordo.
- Se necessário, crie variações específicas para sua entidade, mas mantenha a estrutura modular.

---

## Boas Práticas

- **Mantenha a lógica de dados e estado fora dos componentes visuais.**
- **Prefira hooks e utilitários para lógica reutilizável.**
- **Documente as props e responsabilidades de cada subcomponente.**
- **Evite duplicação: extraia padrões comuns para hooks/utilitários.**

---

## Dúvidas ou Sugestões?

Abra uma issue ou contribua com melhorias!

---

# Como Implementar uma Nova Página de Tabela Reutilizando os Componentes

Este guia mostra como criar uma nova página de tabela (ex: para uma nova entidade) aproveitando a arquitetura modular dos componentes e hooks do catálogo.

## 1. Crie o componente principal da tabela

Crie um novo arquivo, por exemplo `MyEntityTable.tsx`, e utilize os hooks e componentes genéricos:

```tsx
import { useMyEntityData } from "../hooks/useMyEntityData";
import { useMyEntityTable } from "../hooks/useMyEntityTable";
import { useMyEntityColumns } from "./useMyEntityColumns";
import { useColumnWidths } from "../hooks/useColumnWidths";
import { CompoundTableToolbar } from "./CompoundTableToolbar";
import { CompoundTableHeader } from "./CompoundTableHeader";
import { CompoundTableRows } from "./CompoundTableRows";
import { TablePagination } from "./TablePagination";

export function MyEntityTable() {
  const { entities, isLoading, error } = useMyEntityData();
  const {
    searchTerm, setSearchTerm, currentPage, setCurrentPage,
    rowsPerPage, setRowsPerPage, totalPages, paginatedData,
    visibleColumns, setVisibleColumns, sortColumn, sortOrder, handleSort
  } = useMyEntityTable({ data: entities });
  const allColumns = useMyEntityColumns();
  const columnWidths = useColumnWidths(entities, allColumns, getCellValue);

  // Defina getCellValue conforme a estrutura dos seus dados

  return (
    <div className="...">
      <CompoundTableToolbar ... />
      <table>
        <CompoundTableHeader ... />
        <CompoundTableRows ... />
      </table>
      <TablePagination ... />
    </div>
  );
}
```

## 2. Crie o hook de colunas para sua entidade

```tsx
// useMyEntityColumns.tsx
import { useTranslations } from "next-intl";
import { useMemo } from "react";
export function useMyEntityColumns() {
  const t = useTranslations();
  return useMemo(
    () => [
      { key: "id", label: t("myEntity.tableHeaders.id") },
      { key: "name", label: t("myEntity.tableHeaders.name") },
      // ...outras colunas
    ],
    [t]
  );
}
```

## 3. Adapte os hooks de estado e utilitários

- Use o padrão de `useCompoundTable` para gerenciar busca, ordenação, paginação e colunas visíveis.
- Adapte/utilize os utilitários de formatação (`compoundFormatters.ts`) conforme a necessidade dos seus dados.
- Crie hooks de dados e estado específicos para sua entidade, se necessário.

## 4. Reutilize os subcomponentes visuais

- Os componentes `CompoundTableToolbar`, `CompoundTableHeader` e `CompoundTableRows` são genéricos e podem ser usados em outras tabelas, desde que as props estejam de acordo.
- Se necessário, crie variações específicas para sua entidade, mas mantenha a estrutura modular.

## 5. Integre a tabela em uma nova página/rota

Se estiver usando Next.js:

```tsx
// pages/my-entity/index.tsx
import { MyEntityTable } from "../../features/myEntity/components/MyEntityTable";

export default function MyEntityPage() {
  return <MyEntityTable />;
}
```

Se estiver usando React Router:

```tsx
// src/routes/MyEntityPage.tsx
import { MyEntityTable } from "../features/myEntity/components/MyEntityTable";

export function MyEntityPage() {
  return <MyEntityTable />;
}
```

Adicione a nova rota normalmente no seu sistema de rotas.

---

# Boas Práticas

- **Mantenha a lógica de dados e estado fora dos componentes visuais.**
- **Prefira hooks e utilitários para lógica reutilizável.**
- **Documente as props e responsabilidades de cada subcomponente.**
- **Evite duplicação: extraia padrões comuns para hooks/utilitários.**

---

# Dúvidas ou Sugestões?

Abra uma issue ou contribua com melhorias!
