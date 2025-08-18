# Tabela Periódica

Esta feature contém os componentes, hooks, contextos e tipos necessários para implementar uma tabela periódica interativa dos elementos químicos com **busca internacionalizada**, **destaques por categoria** e **tradução automática via i18n**.

---

## 📂 Estrutura de Diretórios

```
periodic-table/
├── components/           # Componentes React
│   ├── common/          # Componentes comuns reutilizáveis
│   │   ├── PeriodicTableContainer.tsx
│   │   ├── PeriodicTableHeader.tsx
│   │   └── PeriodicTableLegend.tsx
│   └── specific/        # Componentes específicos da tabela
│       ├── cards/       # Componentes de cards dos elementos
│       │   ├── ElementCard.tsx
│       │   └── ElementCardsGrid.tsx
│       ├── details/     # Componentes de detalhes
│       │   └── ElementDetailsPanel.tsx
│       └── PeriodicTable.tsx
├── contexts/            # Contextos React
│   └── PeriodicTableContext.tsx
├── data/                # Dados dos elementos químicos
│   └── elements.ts
├── domain/              # Tipos e interfaces do domínio
│   └── types/
│       ├── config.ts
│       ├── element.ts
│       └── table.ts
├── hooks/               # Hooks customizados
│   └── usePeriodicTable.ts
└── utils/
    └── elementSearch.ts # Função de busca internacionalizada
```

---

## 📜 Tutorial Passo a Passo da Implementação

A seguir está o guia completo da implementação da **busca internacionalizada** e **destaques por categoria**.

### 1️⃣ Criar utilitário de busca internacionalizada

Arquivo: `src/features/periodic-table/utils/elementSearch.ts`

```ts
import { useTranslations } from "next-intl";
import { elements } from "../data/elements";
import { Element } from "../domain/types/element";

export function useElementSearch() {
  const t = useTranslations("periodicTable.elements");

  return (query: string): Element | null => {
    const lowerQuery = query.toLowerCase();

    return (
      elements.find(
        (el) =>
          el.symbol.toLowerCase() === lowerQuery ||
          el.name.toLowerCase() === lowerQuery ||
          t(el.symbol).toLowerCase() === lowerQuery
      ) || null
    );
  };
}
```

---

### 2️⃣ Modificar o componente de busca

Arquivo: `src/features/periodic-table/components/common/PeriodicTableHeader.tsx`

- Alterar o evento de busca para usar `useElementSearch`.
- Passar o resultado encontrado para o contexto da tabela.

```tsx
import { useElementSearch } from "../../utils/elementSearch";

const searchElement = useElementSearch();

const handleSearch = (value: string) => {
  const foundElement = searchElement(value);
  if (foundElement) {
    setHighlight(foundElement, "search");
  }
};
```

---

### 3️⃣ Criar constantes e categorias traduzíveis

Arquivo: `src/features/periodic-table/domain/types/elementCategories.ts`

```ts
export const BORON_FAMILY_LABEL = "Boron Family";
export const CARBON_FAMILY_LABEL = "Carbon Family";
export const NITROGEN_FAMILY_LABEL = "Nitrogen Family";
export const OXYGEN_FAMILY_LABEL = "Chalcogens Family"; // padronizado
```

---

### 4️⃣ Ajustar o wrapper do card para highlights

Arquivo: `src/features/periodic-table/components/specific/cards/ElementCardWrapper.tsx`

- Garantir que `highlightSource` diferencie hover, search e click.
- Aplicar anéis coloridos e animações conforme a interação.

---

### 5️⃣ Corrigir/Adicionar traduções nos JSONs

Arquivo: `public/locales/en/periodicTable.json`

```json
{
  "filterOptions": {
    "Boron Family": "Boron Family",
    "Carbon Family": "Carbon Family",
    "Nitrogen Family": "Nitrogen Family",
    "Chalcogens Family": "Chalcogens (Oxygen Family)"
  }
}
```

Arquivo: `public/locales/pt/periodicTable.json`

```json
{
  "filterOptions": {
    "Boron Family": "Família de Boro",
    "Carbon Family": "Família de Carbono",
    "Nitrogen Family": "Família de Nitrogênio",
    "Chalcogens Family": "Calcogênios (Família do Oxigênio)"
  }
}
```

---

## 🧪 Exemplo Prático

```tsx
import { PeriodicTable } from "./components/specific/PeriodicTable";
import { Element } from "./domain/types/element";

export default function App() {
  const handleElementSelect = (element: Element | null) => {
    console.log("Elemento selecionado:", element);
  };

  return <PeriodicTable onElementSelect={handleElementSelect} />;
}
```

---

## 🔹 Vantagens da Implementação

- **Internacionalização automática** — qualquer atualização de tradução já reflete na busca.
- **Menos código duplicado** — sem precisar manter listas de nomes separadas por idioma.
- **UX aprimorada** — feedback visual diferenciado para hover, clique e busca.
- **Fácil manutenção** — novos elementos ou categorias exigem apenas ajuste em um único lugar.

---

## 📌 Ordem Recomendada de Implementação para Novos Desenvolvedores

1. Criar `elementSearch.ts` e validar a busca por símbolo e nome em ambos os idiomas.
2. Ajustar `PeriodicTableHeader.tsx` para integrar a busca.
3. Criar/ajustar constantes em `elementCategories.ts`.
4. Ajustar `ElementCardWrapper.tsx` para highlights.
5. Revisar e alinhar traduções nos JSONs.
6. Testar a tabela nos dois idiomas e validar busca + destaques.
