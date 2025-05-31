# Guia de Contribuição - Mol Wise

## Como Implementar uma Nova Seção no Menu

Este guia detalha o processo de adição de uma nova seção ao menu principal do Mol Wise. Siga estes passos para garantir uma implementação consistente e bem integrada.

### 1. Estrutura de Arquivos

O menu é composto por vários arquivos que trabalham em conjunto:

```
src/
├── shared/
│   ├── components/
│   │   └── menu/
│   │       ├── constants.ts      # Constantes do menu
│   │       ├── types.ts          # Definições de tipos
│   │       ├── config/
│   │       │   └── menuConfig.ts # Configuração do menu
│   │       └── hooks/
│   │           └── useMenuItems.ts # Lógica do menu
│   └── contexts/
│       └── MenuContext.tsx       # Contexto do menu
└── i18n/
    └── messages/
        ├── pt.json              # Traduções em português
        └── en.json              # Traduções em inglês
```

### 2. Passo a Passo para Implementação

#### 2.1. Definir a Constante da Seção

1. Abra `src/shared/components/menu/constants.ts`
2. Adicione uma nova constante para sua seção:

```typescript
export const MENU_SECTIONS = {
  // ... seções existentes ...
  SUA_SECAO: "sua-secao", // Use kebab-case para o valor
} as const;
```

#### 2.2. Adicionar Traduções

1. Abra `src/i18n/messages/pt.json` e `en.json`
2. Adicione as traduções necessárias:

```json
{
  "navigation": {
    // ... traduções existentes ...
    "suaSecao": "Nome da Seção"
  },
  "suaSecao": {
    "title": "Título da Seção",
    "subtitle": "Subtítulo da Seção",
    "itens": {
      "item1": {
        "title": "Título do Item 1",
        "subtitle": "Subtítulo do Item 1"
      },
      "item2": {
        "title": "Título do Item 2",
        "subtitle": "Subtítulo do Item 2"
      }
    }
  }
}
```

#### 2.3. Atualizar a Configuração do Menu

1. Abra `src/shared/components/menu/config/menuConfig.ts`
2. Importe os ícones necessários do `lucide-react`
3. Adicione a nova seção ao array `menuSectionsConfig`:

```typescript
import { SeuIcone } from "lucide-react";

export const menuSectionsConfig: MenuSectionConfig[] = [
  // ... seções existentes ...
  {
    id: MENU_SECTIONS.SUA_SECAO,
    icon: SeuIcone,
    translationKey: "navigation.suaSecao",
    items: [
      {
        icon: IconeItem1,
        translationKey: "suaSecao.itens.item1.title",
        type: "link", // ou "calculator" se for uma calculadora
        href: (locale: string) => `/${locale}/sua-secao/item1`,
      } as const,
      // ... outros itens
    ],
  },
];
```

#### 2.4. Criar a Estrutura de Páginas

1. Crie a estrutura de pastas para suas páginas:

```
src/app/[locale]/sua-secao/
├── item1/
│   └── page.tsx
└── item2/
    └── page.tsx
```

2. Implemente as páginas usando o componente `Page`:

```typescript
// src/app/[locale]/sua-secao/item1/page.tsx
import Page from "@/shared/components/Page";
import { useTranslations } from "next-intl";

export default function Item1Page() {
  const t = useTranslations("suaSecao.itens.item1");

  return <Page title={t("title")}>{/* Sua implementação aqui */}</Page>;
}
```

### 3. Tipos de Itens de Menu

O menu suporta dois tipos principais de itens:

1. **Link** (`type: "link"`):

   - Para navegação simples entre páginas
   - Requer uma função `href` que retorna a URL

   ```typescript
   {
     type: "link",
     href: (locale: string) => `/${locale}/caminho/pagina`
   }
   ```

2. **Calculator** (`type: "calculator"`):
   - Para calculadoras que podem ser abertas em janelas
   - Requer um `calculatorId` válido
   ```typescript
   {
     type: "calculator",
     calculatorId: "id-da-calculadora"
   }
   ```

### 4. Boas Práticas

1. **Nomenclatura**:

   - Use kebab-case para URLs e constantes
   - Use camelCase para chaves de tradução
   - Use PascalCase para componentes React

2. **Traduções**:

   - Mantenha uma estrutura consistente
   - Inclua traduções em português e inglês
   - Use namespaces apropriados

3. **Tipos**:

   - Sempre use `as const` para itens do menu
   - Mantenha os tipos atualizados em `types.ts`
   - Use interfaces para props de componentes

4. **Componentes**:
   - Reutilize componentes existentes quando possível
   - Mantenha a consistência visual
   - Siga o padrão de design do projeto

### 5. Testando sua Implementação

1. Verifique se o menu aparece corretamente
2. Teste a navegação entre páginas
3. Verifique se as traduções funcionam
4. Teste em diferentes tamanhos de tela
5. Verifique se o menu colapsa/expande corretamente

### 6. Exemplo Completo

Para implementar uma seção "Estudos" com resumos e kanban:

1. **Constantes**:

```typescript
// constants.ts
export const MENU_SECTIONS = {
  STUDY: "study",
} as const;
```

2. **Traduções**:

```json
// pt.json
{
  "navigation": {
    "study": "Estudos"
  },
  "study": {
    "summaries": {
      "title": "Resumos",
      "subtitle": "Crie e organize seus resumos"
    },
    "kanban": {
      "title": "Kanban",
      "subtitle": "Organize seus estudos"
    }
  }
}
```

3. **Configuração**:

```typescript
// menuConfig.ts
import { BookOpen, ClipboardList, Kanban } from "lucide-react";

export const menuSectionsConfig: MenuSectionConfig[] = [
  {
    id: MENU_SECTIONS.STUDY,
    icon: BookOpen,
    translationKey: "navigation.study",
    items: [
      {
        icon: ClipboardList,
        translationKey: "study.summaries.title",
        type: "link",
        href: (locale: string) => `/${locale}/study/summaries`,
      } as const,
      {
        icon: Kanban,
        translationKey: "study.kanban.title",
        type: "link",
        href: (locale: string) => `/${locale}/study/kanban`,
      } as const,
    ],
  },
];
```

### 7. Suporte

Se precisar de ajuda ou tiver dúvidas:

1. Consulte a documentação existente
2. Verifique os exemplos de implementação
3. Abra uma issue no repositório
4. Entre em contato com a equipe de desenvolvimento

---

Este guia está em constante evolução. Se encontrar algo que precise ser atualizado ou tiver sugestões de melhoria, por favor, abra uma issue ou envie um pull request.
